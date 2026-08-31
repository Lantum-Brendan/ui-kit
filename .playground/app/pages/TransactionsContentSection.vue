<template>
  <div style="padding:2rem; max-width:1000px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionsContentSection</h2>
    <TransactionsContentSection
      :transactions="transactions"
      :totals="{ income: 3000, expenses: 42.5, net: 2957.5 }"
      :current-page="1"
      :total-pages="1"
      :total-items="2"
      :per-page="20"
      :active-filter-count="0"
      search-query=""
      :is-loading="false"
      page-name="Transaction"
      page-name-plural="Transactions"
      :labels="labels"
    >
      <template #empty>
        <EmptyState title="No transactions" subtitle="Add one to get started" page-name="transactions" />
      </template>
    </TransactionsContentSection>
  </div>
</template>

<script setup>
const transactions = [
  { id: 1, name: 'Groceries', amount: -42.5, category: 'Food', date: '2026-07-18', party: 'Shop' },
  { id: 2, name: 'Salary', amount: 3000, category: 'Income', date: '2026-07-01', party: 'Employer' }
];
const labels = {
  income: 'Income',
  expenses: 'Expenses',
  net: 'Net',
  spreadsheetMode: 'Spreadsheet mode',
  openSpreadsheetView: 'Open spreadsheet view',
  noResultsFound: 'No results found',
  noResultsText: 'No transactions match your current filters. Try adjusting or clearing them.',
  clearAllFilters: 'Clear all filters'
};
</script>
