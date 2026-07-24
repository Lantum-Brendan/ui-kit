<template>
  <section class="charts-tab" tabindex="0" @keydown="onKey">
    <header class="charts-head">
      <TTabList
        :model-value="charts[currentIdx]?.key"
        :tabs="tabListItems"
        variant="indicator"
        @update:model-value="selectByKey"
      />
      <div class="nav">
        <button class="nav-btn" :aria-label="labels.previousChart" @click="prev">
          <ChevronLeft :size="16" />
        </button>
        <span class="nav-count">{{ currentIdx + 1 }} / {{ charts.length }}</span>
        <button class="nav-btn" :aria-label="labels.nextChart" @click="next">
          <ChevronRight :size="16" />
        </button>
      </div>
    </header>

    <div class="chart-canvas">
      <Transition name="chart-swap" mode="out-in">
        <div :key="current.key" class="canvas-inner">
          <header class="canvas-head">
            <div>
              <h2 class="canvas-title">{{ current.label }}</h2>
              <p class="canvas-sub">{{ current.sub }}</p>
            </div>
          </header>

          <component
            :is="current.component"
            v-bind="current.props"
            :currency="currency"
            :formatter="formatter"
            :locale="locale"
            :labels="current.labels"
          />
        </div>
      </Transition>
    </div>

    <Transition name="chart-swap" mode="out-in">
      <div :key="`stats-${current.key}`" class="summary-strip">
        <article v-for="s in current.summaries" :key="s.label" class="summary">
          <span class="summary-label">{{ s.label }}</span>
          <span class="summary-value" :class="s.tone ? `tone--${s.tone}` : ''">
            {{ s.value }}
          </span>
          <span v-if="s.detail" class="summary-detail">{{ s.detail }}</span>
        </article>
      </div>
    </Transition>

    <footer class="kbd-hint">
      <Keyboard :size="12" />
      <span>{{ labels.useArrows }}</span>
    </footer>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import {
  ChevronLeft,
  ChevronRight,
  LineChart,
  AreaChart,
  PieChart,
  BarChart3,
  Keyboard
} from 'lucide-vue-next';
import CashflowLineChart from './CashflowLineChart.vue';
import CumulativeNetArea from './CumulativeNetArea.vue';
import DailyBarChart from './DailyBarChart.vue';
import CategoryDonut from './CategoryDonut.vue';

const props = defineProps({
  monthlyBuckets: { type: Array, required: true },
  dailyBuckets: { type: Array, required: true },
  expenseCategories: { type: Array, required: true },
  incomeCategories: { type: Array, required: true },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` },
  locale: { type: String, default: 'en' },
  labels: {
    type: Object,
    default: () => ({
      previousChart: 'Previous chart',
      nextChart: 'Next chart',
      useArrows: 'Use ← → to switch charts',
      totalIncome: 'Total income',
      totalExpense: 'Total expense',
      bestMonth: 'Best month',
      worstMonth: 'Worst month',
      endingBalance: 'Ending balance',
      peak: 'Peak',
      lowest: 'Lowest',
      monthsAboveZero: 'Months above zero',
      topCategory: 'Top category',
      top3Share: 'Top 3 share',
      distinctCategories: 'Distinct categories',
      concentration: 'Concentration',
      avgDailySpend: 'Avg daily spend',
      highestDay: 'Highest day',
      daysWithSpend: 'Days with spend',
      noSpendDays: 'No-spend days',
      cashflow: 'Cashflow',
      cashflowSub: 'Income, expense, and net by month.',
      cumulativeNet: 'Cumulative net',
      cumulativeNetSub: 'Running net across the period.',
      spendingMix: 'Spending mix',
      spendingMixSub: 'Top expense categories share.',
      spent: 'Spent',
      dailySpending: 'Daily spending',
      dailySpendingSub: 'Each bar is a day in the period.',
      inName: 'in {name}'
    })
  }
});

import TTabList from './TTabList.vue';
import { fill } from '../utils/fill';

const currentIdx = ref(0);

const tabListItems = computed(() =>
  charts.value.map((c) => ({
    id: c.key,
    label: c.label,
    icon: c.icon
  }))
);

const selectByKey = (key) => {
  const idx = charts.value.findIndex((c) => c.key === key);
  if (idx !== -1) select(idx);
};

const monthShort = (yyyyMm) => {
  if (!yyyyMm || typeof yyyyMm !== 'string') return '';
  const [y, m] = yyyyMm.split('-').map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return yyyyMm;
  return new Intl.DateTimeFormat(props.locale, { month: 'short', year: '2-digit' }).format(
    new Date(y, m - 1, 1)
  );
};

const monthlyData = computed(() =>
  props.monthlyBuckets.map((m) => ({
    label: monthShort(m.month),
    income: m.income,
    expense: m.expense,
    net: m.net
  }))
);

const cumulativeData = computed(() => {
  let acc = 0;
  return props.monthlyBuckets.map((m) => {
    acc += m.net;
    return { month: m.month, label: monthShort(m.month), cumulative: acc };
  });
});

const donutData = computed(() =>
  props.expenseCategories
    .slice(0, 6)
    .map((c) => ({ name: c.name, value: c.amount, color: c.color }))
);

const expenseTotal = computed(() => props.expenseCategories.reduce((s, c) => s + c.amount, 0));

// ---------- summaries per chart ----------

const cashflowSummaries = computed(() => {
  if (!props.monthlyBuckets.length) return [];
  const totalIncome = props.monthlyBuckets.reduce((s, m) => s + m.income, 0);
  const totalExpense = props.monthlyBuckets.reduce((s, m) => s + m.expense, 0);
  const bestNet = [...props.monthlyBuckets].sort((a, b) => b.net - a.net)[0];
  const worstNet = [...props.monthlyBuckets].sort((a, b) => a.net - b.net)[0];
  return [
    {
      label: props.labels.totalIncome,
      value: props.formatter(totalIncome, props.currency),
      tone: 'income'
    },
    {
      label: props.labels.totalExpense,
      value: props.formatter(totalExpense, props.currency),
      tone: 'expense'
    },
    {
      label: props.labels.bestMonth,
      value: bestNet ? monthShort(bestNet.month) : '—',
      detail: bestNet ? props.formatter(bestNet.net, props.currency) : ''
    },
    {
      label: props.labels.worstMonth,
      value: worstNet ? monthShort(worstNet.month) : '—',
      detail: worstNet ? props.formatter(worstNet.net, props.currency) : ''
    }
  ];
});

const cumulativeSummaries = computed(() => {
  const arr = cumulativeData.value;
  if (!arr.length) return [];
  const last = arr[arr.length - 1];
  const peak = [...arr].sort((a, b) => b.cumulative - a.cumulative)[0];
  const trough = [...arr].sort((a, b) => a.cumulative - b.cumulative)[0];
  const positiveMonths = arr.filter((d) => d.cumulative > 0).length;
  return [
    {
      label: props.labels.endingBalance,
      value: props.formatter(last.cumulative, props.currency),
      tone: last.cumulative >= 0 ? 'income' : 'expense'
    },
    {
      label: props.labels.peak,
      value: peak ? peak.label : '—',
      detail: peak ? props.formatter(peak.cumulative, props.currency) : ''
    },
    {
      label: props.labels.lowest,
      value: trough ? trough.label : '—',
      detail: trough ? props.formatter(trough.cumulative, props.currency) : ''
    },
    { label: props.labels.monthsAboveZero, value: `${positiveMonths} / ${arr.length}` }
  ];
});

const spendingSummaries = computed(() => {
  if (!props.expenseCategories.length) return [];
  const top = props.expenseCategories[0];
  const top3 = props.expenseCategories.slice(0, 3);
  const top3Sum = top3.reduce((s, c) => s + c.amount, 0);
  const total = expenseTotal.value || 1;
  return [
    {
      label: props.labels.topCategory,
      value: top.name,
      detail: props.formatter(top.amount, props.currency)
    },
    { label: props.labels.top3Share, value: `${((top3Sum / total) * 100).toFixed(0)}%` },
    { label: props.labels.distinctCategories, value: props.expenseCategories.length },
    {
      label: props.labels.concentration,
      value: `${((top.amount / total) * 100).toFixed(0)}%`,
      detail: fill(props.labels.inName, { name: top.name })
    }
  ];
});

const dailySummaries = computed(() => {
  if (!props.dailyBuckets.length) return [];
  const withSpend = props.dailyBuckets.filter((d) => d.expense > 0);
  const noSpend = props.dailyBuckets.length - withSpend.length;
  const totalSpend = props.dailyBuckets.reduce((s, d) => s + d.expense, 0);
  const avg = totalSpend / Math.max(1, props.dailyBuckets.length);
  const highest = [...withSpend].sort((a, b) => b.expense - a.expense)[0];
  return [
    {
      label: props.labels.avgDailySpend,
      value: props.formatter(avg, props.currency)
    },
    {
      label: props.labels.highestDay,
      value: highest ? props.formatter(highest.expense, props.currency) : '—',
      detail: highest ? formatLongDate(highest.date) : '',
      tone: 'expense'
    },
    { label: props.labels.daysWithSpend, value: `${withSpend.length} / ${props.dailyBuckets.length}` },
    { label: props.labels.noSpendDays, value: noSpend, tone: 'income' }
  ];
});

const formatLongDate = (iso) =>
  new Intl.DateTimeFormat(props.locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date(iso + 'T00:00:00'));

// ---------- chart registry ----------

const charts = computed(() => [
  {
    key: 'cashflow',
    label: props.labels.cashflow,
    sub: props.labels.cashflowSub,
    icon: LineChart,
    component: CashflowLineChart,
    props: { data: monthlyData.value },
    labels: {
      income: 'Income',
      expense: 'Expense',
      net: 'Net'
    },
    summaries: cashflowSummaries.value
  },
  {
    key: 'cumulative',
    label: props.labels.cumulativeNet,
    sub: props.labels.cumulativeNetSub,
    icon: AreaChart,
    component: CumulativeNetArea,
    props: { data: cumulativeData.value },
    summaries: cumulativeSummaries.value
  },
  {
    key: 'spending',
    label: props.labels.spendingMix,
    sub: props.labels.spendingMixSub,
    icon: PieChart,
    component: CategoryDonut,
    props: { data: donutData.value, total: expenseTotal.value, centerLabel: props.labels.spent },
    summaries: spendingSummaries.value
  },
  {
    key: 'daily',
    label: props.labels.dailySpending,
    sub: props.labels.dailySpendingSub,
    icon: BarChart3,
    component: DailyBarChart,
    props: { data: props.dailyBuckets },
    labels: { transactions: 'transactions' },
    summaries: dailySummaries.value
  }
]);

const current = computed(() => charts.value[currentIdx.value]);

const select = (i) => {
  currentIdx.value = i;
};
const next = () => {
  currentIdx.value = (currentIdx.value + 1) % charts.value.length;
};
const prev = () => {
  currentIdx.value = (currentIdx.value - 1 + charts.value.length) % charts.value.length;
};

const onKey = (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    next();
  }
};

// Global keyboard listener so the user doesn't need to focus the section
const onGlobalKey = (e) => {
  // Ignore if user is typing in an input
  const tag = (e.target?.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  onKey(e);
};

onMounted(() => window.addEventListener('keydown', onGlobalKey));
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey));
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.charts-tab {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  outline: none;
}

.charts-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-3;
  flex-wrap: wrap;
}

.chart-switch {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: 999px;
  flex-wrap: wrap;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: $text-muted;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  white-space: nowrap;
  transition: $transition-fast;

  &:hover {
    color: $text-primary;
  }

  &--active {
    background: $primary-light;
    color: $primary;
  }
}

.nav {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid $border-color;
  background: $bg-white;
  color: $text-secondary;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: $transition-fast;

  &:hover {
    background: $bg-light;
    color: $text-primary;
  }
}

.nav-count {
  font-size: $font-size-xs;
  color: $text-muted;
  font-variant-numeric: tabular-nums;
}

.chart-canvas {
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: 14px;
  padding: $spacing-4;
  box-shadow: $elevation-1;
  min-height: 340px;
}

.canvas-inner {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
}

.canvas-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: $spacing-3;
}

.canvas-title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
  letter-spacing: -0.01em;
}

.canvas-sub {
  font-size: $font-size-xs;
  color: $text-muted;
  margin: 2px 0 0;
}

.summary-strip {
  display: grid;
  grid-template-columns: 1fr;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: 14px;
  box-shadow: $elevation-1;
  overflow: hidden;

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.summary {
  padding: $spacing-3 $spacing-4;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-right: 1px solid $border-color;

  &:last-child {
    border-right: none;
  }

  @media (max-width: $breakpoint-md) {
    border-right: none;
    border-bottom: 1px solid $border-color;
    &:last-child {
      border-bottom: none;
    }
  }
}

.summary-label {
  font-size: 11px;
  font-weight: $font-semibold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $text-muted;
}

.summary-value {
  font-size: 1.1rem;
  font-weight: $font-semibold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
  margin-top: 2px;
  letter-spacing: -0.01em;

  &.tone--income {
    color: var(--color-income);
  }
  &.tone--expense {
    color: var(--color-expense);
  }
}

.summary-detail {
  font-size: 11px;
  color: $text-muted;
  font-variant-numeric: tabular-nums;
}

.kbd-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: center;
  font-size: 11px;
  color: $text-muted;
  padding: $spacing-1 0;
}

.chart-swap-enter-active,
.chart-swap-leave-active {
  transition:
    opacity $duration-base $easing-standard,
    transform $duration-base $easing-emphasized;
}
.chart-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.chart-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
