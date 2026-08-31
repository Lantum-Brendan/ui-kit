<template>
  <div class="fp">
    <header class="fp-head">
      <div class="fp-head-text">
        <h2 class="fp-title">{{ labels.title }}</h2>
        <p class="fp-subtitle">
          {{ labels.subtitle }}
        </p>
      </div>

      <div v-if="!presetDisabled" class="fp-presets">
        <button
          v-for="p in presets"
          :key="p.value"
          type="button"
          class="fp-preset"
          :class="{ 'fp-preset--active': activePreset === p.value }"
          @click="$emit('preset-change', p.value)"
        >
          {{ labels.presetLabels[p.value] || p.label }}
        </button>
      </div>
    </header>

    <p v-if="partial" class="fp-note" role="status">
      {{ fill(labels.partialNote, { currencies: unconvertedCurrencies.join(', ') }) }}
    </p>

    <LoadingSkeleton v-if="isLoading && !position" variant="card" :count="3" />

    <template v-else-if="position && hasAny">
      <FinancialPositionHero
        :position="position"
        :currency="currency"
        :labels="labels"
        :total-in="totalIn"
        :total-out="totalOut"
        @open-worth="$emit('open-worth')"
      />

      <div class="fp-ledger">
        <section class="fp-col surface tone-card">
          <header class="fp-col-head">
            <span class="fp-col-ico fp-col-ico--in"><ArrowDownLeft :size="16" /></span>
            <h3 class="fp-col-title">{{ labels.moneyIn }}</h3>
            <span class="fp-col-total fp-up">{{ money(totalIn) }}</span>
          </header>
          <ul class="fp-rows">
            <li v-for="row in moneyIn" :key="row.key">
              <button
                type="button"
                class="fp-row"
                :class="{ 'fp-row--neutral': !row.counts }"
                @click="$emit('open-drill', row)"
              >
                <span class="fp-row-marker" :style="{ background: row.color }" />
                <span class="fp-row-ico"><component :is="row.icon" :size="16" /></span>
                <span class="fp-row-text">
                  <span class="fp-row-label">{{ row.label }}</span>
                  <span v-if="!row.counts" class="fp-row-tag">{{ labels.cashNotNetWorth }}</span>
                </span>
                <span class="fp-row-figure">
                  <span class="fp-row-amount">{{ money(row.value) }}</span>
                  <span class="fp-row-bar"
                    ><span
                      class="fp-row-fill"
                      :style="{ width: barPct(row, maxIn), background: row.color }"
                  /></span>
                </span>
                <ChevronRight :size="15" class="fp-row-chevron" />
              </button>
            </li>
          </ul>
        </section>

        <section class="fp-col surface tone-card">
          <header class="fp-col-head">
            <span class="fp-col-ico fp-col-ico--out"><ArrowUpRight :size="16" /></span>
            <h3 class="fp-col-title">{{ labels.moneyOut }}</h3>
            <span class="fp-col-total fp-down">{{ money(totalOut) }}</span>
          </header>
          <ul class="fp-rows">
            <li v-for="row in moneyOut" :key="row.key">
              <button
                type="button"
                class="fp-row"
                :class="{ 'fp-row--neutral': !row.counts }"
                @click="$emit('open-drill', row)"
              >
                <span class="fp-row-marker" :style="{ background: row.color }" />
                <span class="fp-row-ico"><component :is="row.icon" :size="16" /></span>
                <span class="fp-row-text">
                  <span class="fp-row-label">{{ row.label }}</span>
                  <span v-if="!row.counts" class="fp-row-tag">{{ labels.cashNotNetWorth }}</span>
                </span>
                <span class="fp-row-figure">
                  <span class="fp-row-amount">{{ money(row.value) }}</span>
                  <span class="fp-row-bar"
                    ><span
                      class="fp-row-fill"
                      :style="{ width: barPct(row, maxOut), background: row.color }"
                  /></span>
                </span>
                <ChevronRight :size="15" class="fp-row-chevron" />
              </button>
            </li>
          </ul>
        </section>
      </div>

      <p class="fp-foot">
        <Info :size="14" />
        {{ labels.footNote }}
      </p>
    </template>

    <div v-else class="fp-empty">
      <PiggyBank :size="44" class="fp-empty-ico" />
      <p>{{ labels.noDataForPeriod }}</p>
    </div>

    <slot name="drill" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  Wallet,
  ShoppingBag,
  PiggyBank,
  Landmark,
  HandCoins,
  TrendingUp,
  TrendingDown,
  Gift,
  Coins,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRight,
  Info
} from 'lucide-vue-next';
import LoadingSkeleton from './LoadingSkeleton.vue';
import FinancialPositionHero from './FinancialPositionHero.vue';
import { fill } from '../utils/fill';

const props = defineProps({
  position: { type: Object, default: null },
  currency: { type: String, default: 'USD' },
  partial: { type: Boolean, default: false },
  unconvertedCurrencies: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  activePreset: { type: String, default: 'current_month' },
  presetDisabled: { type: Boolean, default: false },
  presets: {
    type: Array,
    default: () => [
      { value: 'current_month', label: 'This month' },
      { value: 'last_3_months', label: 'Last 3 months' },
      { value: 'all_time', label: 'All time' }
    ]
  },
  labels: {
    type: Object,
    default: () => ({
      title: 'Financial position',
      subtitle: 'Where your money came from and where it went, grouped by what it really was.',
      partialNote: 'Some amounts could not be converted to your default currency and were left out, so figures may be understated. Affected: {currencies}.',
      netWorthChange: 'Net worth change',
      building: 'Building',
      shrinking: 'Shrinking',
      heroSub: 'Real earnings, returns and gifts, minus real spend. Borrowed money and money parked in investments do not count.',
      moneyIn: 'Money in',
      moneyOut: 'Money out',
      totalNetWorthNow: 'Total net worth now',
      cash: 'Cash',
      holdings: 'Holdings',
      cashNotNetWorth: 'cash, not net worth',
      footNote: 'Greyed rows move cash but not net worth: borrowed money, debt, and money parked in investments.',
      noDataForPeriod: 'No data for this period yet.',
      presetLabels: {
        current_month: 'This month',
        last_3_months: 'Last 3 months',
        all_time: 'All time'
      },
      rowLabels: {
        earned: 'Earned income',
        returns: 'Investment returns',
        gift: 'Gifts received',
        loan_in: 'Loan received',
        debt_in: 'Debt repaid to you',
        spend: 'Discretionary spend',
        invested: 'Invested',
        loan_out: 'Loan repayment',
        debt_out: 'Debt settled'
      }
    })
  }
});

defineEmits(['preset-change', 'open-worth', 'open-drill']);
const COLOR = {
  income: 'var(--color-income, #16a34a)',
  expense: 'var(--color-expense, #dc2626)',
  returns: '#0ea5e9',
  gifts: '#7c3aed',
  loan: '#d97706',
  principal: '#6366f1'
};

const money = (n) => {
  const rounded = Math.round((n || 0) * 100) / 100;
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(rounded) + ` ${props.currency}`;
};

const netSurface = computed(() =>
  (props.position?.net_worth_delta ?? 0) >= 0 ? 'surface--income' : 'surface--expense'
);

const moneyIn = computed(() => {
  const p = props.position;
  if (!p) return [];
  return [
    {
      key: 'earned',
      label: props.labels.rowLabels.earned,
      value: p.earned_income,
      color: COLOR.income,
      tone: 'income',
      icon: Wallet,
      counts: true,
      intents: ['regular'],
      type: 'income'
    },
    {
      key: 'returns',
      label: props.labels.rowLabels.returns,
      value: p.investment_returns,
      color: COLOR.returns,
      tone: 'investment',
      icon: TrendingUp,
      counts: true,
      intents: ['investment_return'],
      type: 'income'
    },
    {
      key: 'gift',
      label: props.labels.rowLabels.gift,
      value: p.gifts_received,
      color: COLOR.gifts,
      tone: 'gift',
      icon: Gift,
      counts: true,
      intents: ['gift'],
      type: 'income'
    },
    {
      key: 'loan_in',
      label: props.labels.rowLabels.loan_in,
      value: p.loan_received,
      color: COLOR.loan,
      tone: 'loan',
      icon: Landmark,
      counts: false,
      intents: ['loan_received'],
      type: 'income'
    },
    {
      key: 'debt_in',
      label: props.labels.rowLabels.debt_in,
      value: p.debt_owed,
      color: COLOR.loan,
      tone: 'loan',
      icon: HandCoins,
      counts: false,
      intents: ['debt_owed'],
      type: 'income'
    }
  ].filter((r) => r.value > 0);
});

const moneyOut = computed(() => {
  const p = props.position;
  if (!p) return [];
  return [
    {
      key: 'spend',
      label: props.labels.rowLabels.spend,
      value: p.discretionary_spend,
      color: COLOR.expense,
      tone: 'expense',
      icon: ShoppingBag,
      counts: true,
      intents: ['regular'],
      type: 'expense'
    },
    {
      key: 'invested',
      label: props.labels.rowLabels.invested,
      value: p.investment_principal,
      color: COLOR.principal,
      tone: 'investment',
      icon: TrendingUp,
      counts: false,
      intents: ['investment_buy'],
      type: 'expense'
    },
    {
      key: 'loan_out',
      label: props.labels.rowLabels.loan_out,
      value: p.loan_repayment,
      color: COLOR.loan,
      tone: 'loan',
      icon: Landmark,
      counts: false,
      intents: ['loan_repayment'],
      type: 'expense'
    },
    {
      key: 'debt_out',
      label: props.labels.rowLabels.debt_out,
      value: p.debt_settled,
      color: COLOR.loan,
      tone: 'loan',
      icon: HandCoins,
      counts: false,
      intents: ['debt_settled'],
      type: 'expense'
    }
  ].filter((r) => r.value > 0);
});

const totalIn = computed(() => moneyIn.value.reduce((sum, r) => sum + r.value, 0));
const totalOut = computed(() => moneyOut.value.reduce((sum, r) => sum + r.value, 0));
const maxIn = computed(() => Math.max(1, ...moneyIn.value.map((r) => r.value)));
const maxOut = computed(() => Math.max(1, ...moneyOut.value.map((r) => r.value)));
const barPct = (row, max) => `${Math.max(6, (row.value / max) * 100)}%`;
const hasAny = computed(() => totalIn.value > 0 || totalOut.value > 0);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.fp {
  display: flex;
  flex-direction: column;
  gap: $spacing-5;
}

.fp-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $spacing-4;
  flex-wrap: wrap;
}

.fp-title {
  margin: 0;
  font-size: $font-size-lg;
  font-weight: $font-semibold;
  color: $text-primary;
}

.fp-subtitle {
  margin: 4px 0 0;
  color: $text-muted;
  font-size: $font-size-sm;
  max-width: 54ch;
}

.fp-presets {
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  background: $bg-light;
  border-radius: 999px;
}

.fp-preset {
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: $text-muted;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  cursor: pointer;
  transition: all $duration-base $easing-standard;

  &--active {
    background: $bg-white;
    color: $text-primary;
    box-shadow: $elevation-1;
  }
}

.fp-note {
  margin: 0;
  padding: $spacing-3 $spacing-4;
  border-radius: $radius-lg;
  background: rgba(245, 158, 11, 0.12);
  color: #92400e;
  font-size: $font-size-sm;
}

.fp-ledger {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-4;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.fp-col {
  padding: $spacing-4 $spacing-5 $spacing-5;
}

.fp-col-head {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding-bottom: $spacing-3;
  margin-bottom: $spacing-2;
  border-bottom: 1px solid $border-light;
}

.fp-col-ico {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;

  &--in {
    background: var(--color-income-soft);
    color: var(--color-income);
  }
  &--out {
    background: var(--color-expense-soft);
    color: var(--color-expense);
  }
}

.fp-col-title {
  margin: 0;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $text-secondary;
}

.fp-col-total {
  margin-left: auto;
  font-size: $font-size-lg;
  font-weight: $font-bold;
  font-variant-numeric: tabular-nums;
}

.fp-rows {
  list-style: none;
  margin: 0;
  padding: 0;
}

.fp-row {
  display: grid;
  grid-template-columns: 4px 28px 1fr auto 16px;
  align-items: center;
  gap: $spacing-3;
  width: 100%;
  padding: $spacing-3 0;
  border: none;
  border-bottom: 1px solid $border-light;
  background: transparent;
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition: background $duration-base $easing-standard;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--color-bg-light, #f8fafc);
  }
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
    border-radius: 8px;
  }
}

.fp-row--neutral {
  opacity: 0.72;
}

.fp-row-marker {
  width: 4px;
  height: 28px;
  border-radius: 999px;
}

.fp-row-ico {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: $bg-light;
  color: $text-secondary;
}

.fp-row-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.fp-row-label {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
}

.fp-row-tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: $text-muted;
}

.fp-row-figure {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 96px;
}

.fp-row-amount {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  font-variant-numeric: tabular-nums;
  color: $text-primary;
}

.fp-row-bar {
  width: 100%;
  height: 4px;
  background: $bg-light;
  border-radius: 999px;
  overflow: hidden;
}

.fp-row-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
}

.fp-row-chevron {
  color: $text-muted;
}

.fp-foot {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: $font-size-xs;
  color: $text-muted;
}

.fp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-2;
  padding: 3rem 1rem;
  color: $text-muted;
  font-size: $font-size-sm;
}

.fp-up {
  color: var(--color-income);
}

.fp-down {
  color: var(--color-expense);
}
</style>
