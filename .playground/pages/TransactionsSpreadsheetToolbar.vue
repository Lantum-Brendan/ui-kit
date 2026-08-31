<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionsSpreadsheetToolbar</h2>
    <div style="border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
      <TransactionsSpreadsheetToolbar
        :labels="labels"
        :row-count="12"
        :is-streaming="false"
        search-value=""
        :has-selection="false"
        :export-disabled="false"
      />
    </div>
    <div style="margin-top:1rem"><TButton text="Action" variant="outline" :full-width="false" /></div>
  </div>
</template>

<script setup>
const labels = {
  title: 'Transactions spreadsheet',
  rowCount: '{count} rows',
  loadingMore: 'loading…',
  searchPlaceholder: 'Search rows...',
  exportCsv: 'Export CSV',
  close: 'Close',
  addRow: 'Add row',
  deleteSelected: 'Delete selected'
};
</script>
