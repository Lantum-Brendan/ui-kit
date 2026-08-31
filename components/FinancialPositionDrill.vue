<template>
  <Transition name="drawer">
    <div v-if="open" class="drawer-root" @click.self="$emit('close')">
      <aside
        class="drawer-panel surface"
        :class="`surface--${group?.tone || 'neutral'}`"
        role="dialog"
        aria-modal="true"
      >
        <header class="drawer-head">
          <button class="icon-btn" :aria-label="labels.close" @click="$emit('close')">
            <ArrowLeft :size="18" />
          </button>
          <span class="head-chip">
            <component :is="group?.icon" :size="22" />
          </span>
          <div class="head-id">
            <span class="head-eyebrow">{{ group?.eyebrow }}</span>
            <h2 class="head-title">{{ group?.label }}</h2>
          </div>
          <button class="icon-btn icon-btn--close" :aria-label="labels.close" @click="$emit('close')">
            <X :size="18" />
          </button>
        </header>

        <section class="detail-hero">
          <span class="detail-metric" :class="group?.metricClass">{{ group?.metric }}</span>
          <p v-if="group?.hint" class="detail-hint">{{ group.hint }}</p>
        </section>

        <div v-if="isLoading" class="drawer-body">
          <LoadingSkeleton variant="list" :count="6" />
        </div>

        <div v-else-if="rows.length === 0" class="drawer-empty">
          <span class="empty-ico"><Inbox :size="34" /></span>
          <p>{{ labels.noTransactions }}</p>
        </div>

        <div v-else class="drawer-body">
          <section v-for="bucket in buckets" :key="bucket.intent" class="bucket">
            <header v-if="buckets.length > 1" class="bucket-head">
              <span class="bucket-dir" :class="bucket.type === 'income' ? 'is-in' : 'is-out'">
                <component
                  :is="bucket.type === 'income' ? ArrowDownLeft : ArrowUpRight"
                  :size="13"
                />
              </span>
              <span class="bucket-label">{{ bucket.label }}</span>
              <span class="bucket-sub">{{ fill(labels.nTransactions, { n: bucket.rows.length }) }}</span>
              <span class="bucket-total" :class="bucket.type === 'income' ? 'is-in' : 'is-out'">
                {{ bucket.total }}
              </span>
            </header>

            <ul class="row-list">
              <li v-for="row in bucket.rows" :key="row.id" class="row">
                <span class="row-dir" :class="row.type === 'income' ? 'is-in' : 'is-out'">
                  <component
                    :is="row.type === 'income' ? ArrowDownLeft : ArrowUpRight"
                    :size="14"
                  />
                </span>
                <div class="row-main">
                  <span class="row-title">{{ row.title }}</span>
                  <span class="row-meta">{{ row.meta }}</span>
                </div>
                <span class="row-amount" :class="row.type === 'income' ? 'is-in' : 'is-out'">
                  {{ row.type === 'income' ? '+' : '−' }}{{ row.amount }}
                </span>
              </li>
            </ul>
          </section>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { X, ArrowLeft, Inbox, ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next';
import LoadingSkeleton from './LoadingSkeleton.vue';
import { fill } from '../utils/fill';

const INTENT_LABELS = {
  regular: 'Regular',
  loan_received: 'Loan received',
  loan_repayment: 'Loan repayment',
  debt_owed: 'Debt owed',
  debt_settled: 'Debt settled',
  investment_buy: 'Investment purchase',
  investment_return: 'Investment return',
  gift: 'Gift'
};

const props = defineProps({
  open: { type: Boolean, default: false },
  group: { type: Object, default: null },
  rows: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      close: 'Close',
      noTransactions: 'No transactions for this in the selected period.',
      nTransactions: '{n} transactions'
    })
  },
  formatAmountFn: {
    type: Function,
    default: (amount, currency) => `${amount} ${currency}`
  }
});

defineEmits(['close']);



const buckets = computed(() => {
  const order = props.group?.intents ?? [];
  return order
    .map((intent) => {
      const bucketRows = props.rows.filter((r) => r.intent === intent);
      if (bucketRows.length === 0) return null;
      const currency = bucketRows[0]?.currency ?? 'USD';
      const sum = bucketRows.reduce((acc, r) => acc + (r.amountNum ?? 0), 0);
      return {
        intent,
        label: INTENT_LABELS[intent] ?? intent,
        type: bucketRows[0].type,
        rows: bucketRows,
        total: props.formatAmountFn(sum, currency)
      };
    })
    .filter((b) => b !== null);
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.drawer-root {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
  z-index: $z-index-modal;
}

.drawer-panel {
  display: flex;
  flex-direction: column;
  width: min(480px, 100%);
  height: 100%;
  background: $bg-white;
  box-shadow: $elevation-5;
  overflow: hidden;
}

.drawer-head {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-4 $spacing-5;
  background: var(--surface-bg, var(--color-bg-white));
  border-bottom: 1px solid var(--surface-accent, var(--color-primary-lighter));
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: $text-secondary;
  cursor: pointer;
  transition: background $duration-base $easing-standard;

  &:hover {
    background: var(--glass-bg-strong);
  }
}

.icon-btn--close {
  margin-left: auto;

  @media (max-width: $breakpoint-sm) {
    display: none;
  }
}

.head-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 13px;
  background: var(--glass-bg-strong);
  color: var(--surface-deep, var(--color-primary-dark));
}

.head-id {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.head-eyebrow {
  font-size: 10px;
  font-weight: $font-bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--surface-deep, var(--color-primary-dark));
}

.head-title {
  margin: 0;
  font-size: $font-size-lg;
  font-weight: $font-bold;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-hero {
  padding: $spacing-5;
  background: var(--surface-bg, var(--color-bg-white));
  border-bottom: 1px solid var(--surface-accent, var(--color-primary-lighter));
}

.detail-metric {
  font-size: 2rem;
  font-weight: $font-bold;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: $text-primary;
}

.detail-hint {
  margin: 6px 0 0;
  font-size: $font-size-sm;
  color: $text-secondary;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-4 $spacing-5 $spacing-6;
}

.drawer-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-3;
  padding: $spacing-6;
  text-align: center;
  color: $text-muted;
}

.empty-ico {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: $bg-light;
  color: var(--color-border-medium, #cbd5e1);
}

.bucket {
  margin-bottom: $spacing-5;
  &:last-child { margin-bottom: 0; }
}

.bucket-head {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding-bottom: $spacing-2;
  margin-bottom: 4px;
  border-bottom: 1px solid $border-light;
}

.bucket-dir {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;

  &.is-in { background: var(--color-income-soft); color: var(--color-income); }
  &.is-out { background: var(--color-expense-soft); color: var(--color-expense); }
}

.bucket-label {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-primary;
}

.bucket-sub { font-size: 11px; color: $text-muted; }

.bucket-total {
  margin-left: auto;
  font-size: $font-size-sm;
  font-weight: $font-bold;
  font-variant-numeric: tabular-nums;

  &.is-in { color: var(--color-income); }
  &.is-out { color: var(--color-expense); }
}

.row-list { list-style: none; margin: 0; padding: 0; }

.row {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-3 0;
  border-bottom: 1px solid $border-light;
  &:last-child { border-bottom: none; }
}

.row-dir {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 9px;

  &.is-in { background: var(--color-income-soft); color: var(--color-income); }
  &.is-out { background: var(--color-expense-soft); color: var(--color-expense); }
}

.row-main {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  flex: 1;
}

.row-title {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-meta { font-size: 11px; color: $text-muted; }

.row-amount {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  &.is-in { color: var(--color-income); }
  &.is-out { color: var(--color-expense); }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity $duration-base $easing-standard;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform $duration-base $easing-standard;
}
.drawer-enter-from,
.drawer-leave-to { opacity: 0; }
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel { transform: translateX(100%); }

@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active .drawer-panel,
  .drawer-leave-active .drawer-panel { transition: none; }
}
</style>
