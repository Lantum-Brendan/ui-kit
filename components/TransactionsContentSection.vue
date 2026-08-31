<template>
  <div class="content-area">
    <TTopCard :page-name="pageName" :page-name-plural="pageNamePlural" @add="$emit('add')">
      <template #summary>
        <div v-if="hasTotals" class="totals-summary">
          <span class="total-item">
            <span class="total-label">{{ labels.income }}</span>
            <span class="total-value income">{{ formatCurrency(totals.income) }}</span>
          </span>
          <span class="total-item">
            <span class="total-label">{{ labels.expenses }}</span>
            <span class="total-value expense">{{ formatCurrency(totals.expenses) }}</span>
          </span>
          <span class="total-item">
            <span class="total-label">{{ labels.net }}</span>
            <span class="total-value" :class="totals.net >= 0 ? 'income' : 'expense'">{{
              formatCurrency(totals.net)
            }}</span>
          </span>
        </div>
      </template>
      <template #actions>
        <button
          type="button"
          class="spreadsheet-trigger"
          :aria-label="labels.spreadsheetMode"
          :title="labels.openSpreadsheetView"
          @click="$emit('open-spreadsheet')"
        >
          <TableCellsIcon class="icon" />
        </button>
      </template>
    </TTopCard>

    <slot name="spreadsheet" />

    <slot name="filters" />

    <div v-if="isLoading" class="loading-state">
      <LoadingSkeleton variant="table" :count="6" :columns="5" />
    </div>

    <div v-else-if="transactions.length === 0" class="empty-state-wrapper">
      <div v-if="activeFilterCount > 0" class="no-filter-results">
        <div class="no-filter-results__icon-wrapper">
          <FunnelIcon class="no-filter-results__icon" />
        </div>
        <h3 class="no-filter-results__title">{{ labels.noResultsFound }}</h3>
        <p class="no-filter-results__text">
          {{ labels.noResultsText }}
        </p>
        <TButton
          :text="labels.clearAllFilters"
          variant="primary"
          size="small"
          :full-width="false"
          @click="$emit('reset-filters')"
        />
      </div>
      <slot v-else name="empty" />
    </div>

    <template v-else>
      <!-- Mobile cards -->
      <TTransactionsCardList
        class="only-mobile"
        :transactions="transactions"
        :search-query="searchQuery"
        :current-page="currentPage"
        :items-per-page="perPage"
        :total-pages="totalPages"
        :total-entries="totalItems"
        :active-filter-count="activeFilterCount"
        @update:search-query="(q) => $emit('update:search-query', q)"
        @page-change="(p) => $emit('page-change', p)"
        @edit="(txn) => $emit('edit', txn)"
        @delete="(txn) => $emit('delete', txn)"
        @recurrent="(txn) => $emit('recurrent', txn)"
        @toggle-filters="$emit('toggle-filters')"
      />

      <!-- Desktop table -->
      <TTableComponent
        class="only-desktop"
        :transactions="transactions"
        :all-transactions="transactions"
        :search-query="searchQuery"
        :current-page="currentPage"
        :items-per-page="perPage"
        :total-pages="totalPages"
        :total-entries="totalItems"
        :active-filter-count="activeFilterCount"
        :filtered-totals="totals"
        @update:search-query="(q) => $emit('update:search-query', q)"
        @page-change="(p) => $emit('page-change', p)"
        @edit="(txn) => $emit('edit', txn)"
        @delete="(txn) => $emit('delete', txn)"
        @recurrent="(txn) => $emit('recurrent', txn)"
        @toggle-filters="$emit('toggle-filters')"
      />
    </template>

    <slot name="modals" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { FunnelIcon, TableCellsIcon } from '@heroicons/vue/24/outline';
import TTopCard from './TTopCard.vue';
import TTableComponent from './TTableComponent.vue';
import TTransactionsCardList from './TTransactionsCardList.vue';
import TButton from './TButton.vue';
import LoadingSkeleton from './LoadingSkeleton.vue';

const props = defineProps({
  transactions: { type: Array, default: () => [] },
  totals: {
    type: Object,
    default: () => ({ income: 0, expenses: 0, net: 0 })
  },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  totalItems: { type: Number, default: 0 },
  perPage: { type: Number, default: 20 },
  activeFilterCount: { type: Number, default: 0 },
  searchQuery: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  pageName: { type: String, default: 'Transaction' },
  pageNamePlural: { type: String, default: 'Transactions' },
  labels: {
    type: Object,
    default: () => ({
      income: 'Income',
      expenses: 'Expenses',
      net: 'Net',
      spreadsheetMode: 'Spreadsheet mode',
      openSpreadsheetView: 'Open spreadsheet view',
      noResultsFound: 'No results found',
      noResultsText: 'No transactions match your current filters. Try adjusting or clearing them.',
      clearAllFilters: 'Clear all filters'
    })
  }
});

defineEmits([
  'add',
  'open-spreadsheet',
  'reset-filters',
  'update:search-query',
  'page-change',
  'edit',
  'delete',
  'recurrent',
  'toggle-filters'
]);

const hasTotals = computed(() => props.totalItems > 0);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.content-area {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
}

.no-filter-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;
  text-align: center;

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: $primary-light;
    margin-bottom: 0.25rem;
  }

  &__icon {
    width: 28px;
    height: 28px;
    color: $primary;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-semibold;
    color: $text-primary;
    margin: 0;
  }

  &__text {
    color: $text-muted;
    font-size: $font-size-sm;
    margin: 0;
    max-width: 320px;
    line-height: 1.5;
  }
}

.spreadsheet-trigger {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  border-radius: 10px;
  color: var(--surface-deep, var(--color-primary-dark));
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition:
    background-color $duration-fast $easing-standard,
    color $duration-fast $easing-standard;

  .icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: var(--glass-bg-strong);
  }
}

.totals-summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.total-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  backdrop-filter: blur(6px);

  .total-label {
    color: var(--surface-ink, var(--color-text-primary));
    opacity: 0.7;
    font-weight: $font-semibold;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
  }

  .total-value {
    font-weight: $font-bold;
    color: var(--surface-ink, var(--color-text-primary));

    &.income {
      color: var(--color-income);
    }

    &.expense {
      color: var(--color-expense);
    }
  }
}

.only-mobile {
  @media (min-width: $breakpoint-md) {
    display: none !important;
  }
}

.only-desktop {
  @media (max-width: calc($breakpoint-md - 1px)) {
    display: none !important;
  }
}
</style>
