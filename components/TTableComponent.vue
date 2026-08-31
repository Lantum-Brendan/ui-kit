<template>
  <div class="table-container">
    <TListHeader :title="resolvedTitle">
      <SearchInput
        :model-value="searchQuery"
        :placeholder="resolvedLabels.search"
        :debounce="0"
        @update:model-value="$emit('update:searchQuery', $event)"
      />
      <TFilterToggle :active-count="activeFilterCount" @click="$emit('toggle-filters')" />
    </TListHeader>

    <div class="table-wrapper">
      <div class="table">
        <table class="custom-table" :class="{ 'expense-table': headerType === 'expense' }">
          <thead>
            <tr>
              <th v-for="col in resolvedColumns" :key="col.key">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <TTableRow
              v-for="(txn, index) in displayedTransactions"
              :key="index"
              :txn="txn"
              :labels="resolvedLabels"
              :format-date="formatDate"
              :format-time-ago="formatTimeAgo"
              @edit="$emit('edit', $event)"
              @delete="$emit('delete', $event)"
              @recurrent="$emit('recurrent', $event)"
            />
          </tbody>
          <tfoot>
            <tr class="totals-row">
              <td colspan="6" class="totals-cell">
                <TTableTotals :totals="totals" :labels="resolvedLabels" :format-currency="formatDisplayCurrency" />
              </td>
            </tr>
            <tr class="pagination-row">
              <td colspan="6">
                <TPagination
                  :current-page="currentPage"
                  :total-pages="pagesTotal"
                  :total-entries="computedTotalEntries"
                  :items-per-page="itemsPerPage"
                  :entry-text="fill(resolvedLabels.showingEntries, { start: startEntry, end: endEntry, total: computedTotalEntries })"
                  @page-change="$emit('page-change', $event)"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// row icons moved to TTableRow.vue
import SearchInput from './SearchInput.vue';
import TListHeader from './TListHeader.vue';
import TFilterToggle from './TFilterToggle.vue';
import TPagination from './TPagination.vue';
import TTableTotals from './TTableTotals.vue';
import TTableRow from './TTableRow.vue';
import { fill } from '../utils/fill';

const props = defineProps({
  transactions: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
  currentPage: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 10 },
  totalPages: { type: Number, default: 1 },
  totalEntries: { type: Number, default: 0 },
  headerType: { type: String, default: 'default' },
  allTransactions: { type: Array, default: () => [] },
  activeFilterCount: { type: Number, default: 0 },
  filteredTotals: { type: Object, default: null },
  defaultCurrency: { type: String, default: 'USD' },
  parseAmount: { type: Function, required: true },
  getCurrencySymbol: { type: Function, required: true },
  convertCurrency: {
    type: Function,
    default: undefined
  },
  locale: {
    type: String,
    default: undefined
  },
  // Preferred API: title + columns. `labels` is deprecated legacy (English defaults kept for compat).
  title: {
    type: String,
    default: undefined
  },
  columns: {
    type: Array,
    default: undefined
  },
  labels: {
    type: Object,
    default: undefined
  }
});

defineEmits(['edit', 'delete', 'recurrent', 'page-change', 'update:searchQuery', 'toggle-filters']);

const defaultLabels = {
  allTransactions: 'All Transactions',
  search: 'Search...',
  dateTime: 'Date Time',
  type: 'Type',
  party: 'Party',
  amount: 'Amount',
  category: 'Category',
  action: 'Action',
  transfer: 'Transfer',
  refund: 'Refund',
  recurring: 'Recurring',
  totals: 'Totals',
  income: 'Income',
  expenses: 'Expenses',
  net: 'Net',
  previous: 'Previous',
  next: 'Next',
  showingEntries: 'Showing {start}-{end} of {total} entries',
  justNow: 'just now',
  minutesAgo: '{n} min ago',
  hoursAgo: '{n} hr ago',
  daysAgo: '{n} day ago'
};

const resolvedLabels = computed(() => ({ ...defaultLabels, ...(props.labels || {}) }));
const resolvedTitle = computed(() => props.title ?? resolvedLabels.value.allTransactions);
const resolvedColumns = computed(() => {
  if (props.columns && props.columns.length) return props.columns;
  // fallback to labels-derived columns (deprecated path)
  const l = resolvedLabels.value;
  return [
    { key: 'dateTime', label: l.dateTime },
    { key: 'type', label: l.type },
    { key: 'party', label: l.party },
    { key: 'amount', label: l.amount },
    { key: 'category', label: l.category },
    { key: 'action', label: l.action }
  ];
});

const displayedTransactions = computed(() => props.transactions);

const totals = computed(() => {
  // Prefer server-computed totals (covers all pages of filtered set)
  if (props.filteredTotals) {
    return props.filteredTotals;
  }

  const txns = props.allTransactions.length > 0 ? props.allTransactions : props.transactions;
  const targetCurrency = props.defaultCurrency;
  let income = 0;
  let expenses = 0;

  const hasConverter = typeof props.convertCurrency === 'function';

  txns.forEach((txn) => {
    const { value, currency } = props.parseAmount(txn.amount);
    const fromCurrency = currency || targetCurrency;
    let convertedAmount;
    if (hasConverter) {
      convertedAmount = props.convertCurrency(value, fromCurrency, targetCurrency);
    } else {
      if (fromCurrency !== targetCurrency) {
        // No converter: do not silently treat EUR as USD. Skip and warn.
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(
            `[TTableComponent] Skipping ${value} ${fromCurrency} in totals: no convertCurrency provided to convert to ${targetCurrency}. Provide convertCurrency prop for mixed-currency totals.`
          );
        }
        return;
      }
      convertedAmount = value;
    }
    if (txn.type === 'INCOME') {
      income += convertedAmount;
    } else {
      expenses += convertedAmount;
    }
  });

  return {
    income,
    expenses,
    net: income - expenses
  };
});

const formatDisplayCurrency = (value) => {
  const currency = props.defaultCurrency;
  const symbol = props.getCurrencySymbol(currency);
  const locale = props.locale ?? undefined;
  const formatted = new Intl.NumberFormat(locale ?? 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
  return `${formatted} ${symbol}`;
};

const computedTotalEntries = computed(() => {
  if (props.totalEntries && props.totalEntries > 0) return props.totalEntries;
  return displayedTransactions.value.length;
});

const pagesTotal = computed(() => {
  if (props.totalPages && props.totalPages > 1) return props.totalPages;
  return Math.max(1, Math.ceil(computedTotalEntries.value / props.itemsPerPage));
});

const startEntry = computed(() => {
  if (computedTotalEntries.value === 0) return 0;
  return (props.currentPage - 1) * props.itemsPerPage + 1;
});

const endEntry = computed(() => {
  const end = props.currentPage * props.itemsPerPage;
  return Math.min(end, computedTotalEntries.value);
});

// visiblePages is now handled by TPagination

const formatDate = (txn) => {
  const iso = txn?.date || '';
  const dateObj = new Date(`${iso}T${txn?.time || '00:00'}:00`);
  if (isNaN(dateObj.getTime())) return iso;
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return dateObj.toLocaleDateString(undefined, options).replace(/,/g, ',');
};

const formatTimeAgo = (txn) => {
  const dateObj = new Date(`${txn?.date || ''}T${txn?.time || '00:00'}:00`);
  if (isNaN(dateObj.getTime())) return '';
  const diffMs = Date.now() - dateObj.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return resolvedLabels.value.justNow;
  if (minutes < 60) return fill(resolvedLabels.value.minutesAgo, { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return fill(resolvedLabels.value.hoursAgo, { n: hours });
  const days = Math.floor(hours / 24);
  return fill(resolvedLabels.value.daysAgo, { n: days });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.table {
  &-container {
    width: 100%;
    max-width: 100%;
    gap: 8px;
    overflow: hidden;
  }

  &-heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &-text {
      font-weight: $font-medium;
      font-size: $font-size-base;
      margin-bottom: 0;
    }
  }
}

.input-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  background: $bg-white;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    border-color: $primary;
    background: rgba(var(--color-primary-rgb), 0.05);
  }

  .filter-toggle-icon {
    width: 16px;
    height: 16px;
    color: $text-muted;
  }

  .filter-count-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    border-radius: 8px;
    background-color: $primary;
    color: white;
    font-size: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.table-wrapper {
  width: 100%;
  max-height: calc(100vh - 220px);
  border-radius: 14px;
  overflow: auto;
  background-color: $bg-white;
  border: 1px solid $border-light;
  box-shadow: $elevation-1;
  -webkit-overflow-scrolling: touch;

  @media (max-width: $breakpoint-md) {
    max-height: calc(100vh - 260px);
  }
}

.custom-table {
  width: 100%;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: $font-family-sans;
  table-layout: auto;

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tfoot .totals-row,
  tfoot .pagination-row {
    position: sticky;
    z-index: 2;
  }

  tfoot .pagination-row {
    bottom: 0;
  }

  tfoot .totals-row {
    bottom: 52px;
  }

  th,
  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  th {
    background-color: $primary-light;
    color: $primary-dark;
    text-align: left;
    padding: 8px 16px;
    font-size: 11px;
    font-weight: $font-bold;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 1px solid $border-light;

    &:first-child {
      padding-left: 20px;
    }
    &:last-child {
      padding-right: 20px;
    }
  }

  &.expense-table th {
    background-color: rgba(var(--color-expense-rgb), 0.12);
    color: var(--color-expense);
  }

  td {
    padding: 6px 16px;
    background-color: $bg-white;
    border-bottom: 1px solid $border-light;
    vertical-align: middle;
    font-size: $font-size-sm;
    line-height: 1.4;
    color: $text-primary;

    &:first-child {
      padding-left: 20px;
    }
    &:last-child {
      padding-right: 20px;
    }
  }

  tbody tr {
    transition: background-color $duration-fast $easing-standard;
  }

  tbody tr:hover td {
    background-color: rgba(var(--color-primary-rgb), 0.04);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }












}

// Totals row styles
.totals-row {
  .totals-cell {
    padding: 0 !important;
    background-color: $bg-white !important;
    border-top: 1px solid $border-light;
  }
}

// Pagination styles
.pagination-row {
  td {
    background-color: $bg-light !important;
    border-bottom: none !important;
    padding: 10px 12px !important;
  }
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-info {
  display: flex;
  align-items: center;
}

.entries-text {
  font-size: 14px;
  color: $text-muted;
  font-weight: 500;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid $border-light;
  background-color: $bg-white;
  color: $text-secondary;
  border-radius: $radius-md;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 40px;
  text-align: center;

  &:hover:not(:disabled) {
    background-color: $bg-light;
    border-color: $border-medium;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: $bg-light;
  }

  &.active {
    background-color: $primary;
    color: white;
    border-color: $primary;

    &:hover {
      background-color: $primary-dark;
    }
  }

  .expense-table & {
    &.active {
      background-color: $error-color;
      border-color: $error-color;

      &:hover {
        background-color: $error-dark;
      }
    }
  }
}
</style>
