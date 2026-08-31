<template>
  <div class="totals-grid">
    <div class="total-section totals-label"><span class="total-label">{{ labels.totals }}</span></div>
    <div class="total-section income"><span class="total-label">{{ labels.income }}</span><span class="total-value">{{ formatCurrency(totals.income) }}</span></div>
    <div class="total-section expense"><span class="total-label">{{ labels.expenses }}</span><span class="total-value">{{ formatCurrency(totals.expenses) }}</span></div>
    <div class="total-section net" :class="{ positive: totals.net >= 0, negative: totals.net < 0 }"><span class="total-label">{{ labels.net }}</span><span class="total-value">{{ formatCurrency(totals.net) }}</span></div>
  </div>
</template>

<script setup>
const props = defineProps({
  totals: { type: Object, required: true },
  labels: { type: Object, required: true },
  formatCurrency: { type: Function, required: true }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.totals-grid {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  align-items: stretch;
  width: 100%;
}
.total-section {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  line-height: 1.2;
  border-right: 1px solid $border-light;
  &:last-child { border-right: none; }
  .total-label {
    font-size: 11px;
    font-weight: $font-bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-secondary;
    margin: 0;
    white-space: nowrap;
  }
  .total-value {
    font-size: $font-size-base;
    font-weight: $font-bold;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
    color: $text-primary;
    white-space: nowrap;
  }
  &.totals-label {
    background: $primary-light;
    .total-label { color: $primary-dark; font-size: 12px; }
  }
  &.income {
    background: rgba(var(--color-income-rgb), 0.06);
    .total-label { color: var(--color-income); }
    .total-value { color: var(--color-income); }
  }
  &.expense {
    background: rgba(var(--color-expense-rgb), 0.06);
    .total-label { color: var(--color-expense); }
    .total-value { color: var(--color-expense); }
  }
  &.net {
    &.positive {
      background: rgba(var(--color-income-rgb), 0.06);
      .total-label { color: var(--color-income); }
      .total-value { color: var(--color-income); }
    }
    &.negative {
      background: rgba(var(--color-expense-rgb), 0.06);
      .total-label { color: var(--color-expense); }
      .total-value { color: var(--color-expense); }
    }
  }
}
</style>
