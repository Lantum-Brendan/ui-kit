<template>
  <div class="kpi-section">
    <div v-if="isCustomActive && activeFilterChips.length > 0" class="kpi-header">
      <div class="active-filters">
        <span v-for="chip in activeFilterChips" :key="chip.key" class="filter-chip">
          <span class="filter-chip__label">{{ chip.label }}</span>
          <button class="filter-chip__remove" @click="$emit('remove-filter', chip.key)">
            <XIcon class="filter-chip__remove-icon" />
          </button>
        </span>
        <button class="filter-chip filter-chip--clear" @click="$emit('clear-filters')">
          {{ labels.clearAll }}
        </button>
      </div>
    </div>

    <div class="kpi-grid">
      <article
        v-for="card in kpiCards"
        :key="card.key"
        class="kpi-card tone-card surface"
        :class="`surface--${card.tone}`"
      >
        <svg
          class="kpi-decor"
          viewBox="0 0 280 160"
          preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
          <circle cx="240" cy="40" r="60" fill="var(--surface-accent)" opacity="0.35" />
          <circle cx="270" cy="120" r="36" fill="var(--surface-deep)" opacity="0.35" />
          <circle cx="200" cy="130" r="10" fill="var(--surface-deep)" opacity="0.5" />
        </svg>
        <div class="kpi-icon">
          <component :is="card.icon" :size="18" />
        </div>
        <div class="kpi-meta">
          <span class="eyebrow">{{ card.label }}</span>
          <p class="kpi-value">{{ formatCurrency(card.value) }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { X as XIcon, Wallet, ArrowDownLeft, ArrowUpRight, PiggyBank } from 'lucide-vue-next';

const props = defineProps({
  statistics: {
    type: Object,
    default: () => ({
      total_balance: 0,
      total_income: 0,
      total_expenses: 0
    })
  },
  currency: {
    type: String,
    default: 'USD'
  },
  isCustomActive: {
    type: Boolean,
    default: false
  },
  activeFilterChips: {
    type: Array,
    default: () => []
  },
  labels: {
    type: Object,
    default: () => ({
      balance: 'Balance',
      income: 'Income',
      expenses: 'Expenses',
      net: 'Net',
      clearAll: 'Clear all'
    })
  },
  formatCurrencyFn: {
    type: Function,
    default: null
  }
});

defineEmits(['remove-filter', 'clear-filters']);

const netValue = computed(() => {
  const income = props.statistics?.total_income || 0;
  const expenses = props.statistics?.total_expenses || 0;
  return income - expenses;
});

const kpiCards = computed(() => [
  {
    key: 'balance',
    label: props.labels.balance,
    value: props.statistics?.total_balance || 0,
    icon: Wallet,
    tone: 'brand'
  },
  {
    key: 'income',
    label: props.labels.income,
    value: props.statistics?.total_income || 0,
    icon: ArrowDownLeft,
    tone: 'income'
  },
  {
    key: 'expenses',
    label: props.labels.expenses,
    value: props.statistics?.total_expenses || 0,
    icon: ArrowUpRight,
    tone: 'expense'
  },
  {
    key: 'net',
    label: props.labels.net,
    value: netValue.value,
    icon: PiggyBank,
    tone: netValue.value >= 0 ? 'brand-soft' : 'expense'
  }
]);

const formatCurrency = (val) => {
  if (props.formatCurrencyFn) {
    return props.formatCurrencyFn(val, props.currency);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: props.currency }).format(val);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.kpi-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  flex-wrap: wrap;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-3;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-2;
  }
}

.kpi-card {
  position: relative;
  padding: $spacing-4;
  display: flex;
  align-items: center;
  gap: $spacing-3;
  overflow: hidden;
  border-radius: 14px;

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-3;
    gap: $spacing-2;
  }
}

.kpi-decor {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.kpi-icon {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  color: var(--surface-deep);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);

  @media (max-width: $breakpoint-sm) {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
}

.kpi-meta {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.kpi-value {
  color: var(--surface-ink);
  font-variant-numeric: tabular-nums;
  margin: 0;
  font-size: $font-size-lg;
  font-weight: $font-bold;
  letter-spacing: -0.015em;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-base;
  }
}

.active-filters {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  flex-wrap: wrap;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: $spacing-1;
  padding: 4px 8px;
  border-radius: $radius-lg;
  background: rgba(4, 120, 68, 0.1);
  border: 1px solid rgba(4, 120, 68, 0.2);
  font-size: $font-size-xs;
  color: $primary;

  &--clear {
    background: transparent;
    border: 1px solid $border-light;
    color: $text-muted;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: $bg-gray;
      color: $text-secondary;
    }
  }
}

.filter-chip__label {
  font-weight: $font-medium;
}

.filter-chip__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: $primary;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}

.filter-chip__remove-icon {
  width: 12px;
  height: 12px;
  stroke-width: 2.5;
}
</style>
