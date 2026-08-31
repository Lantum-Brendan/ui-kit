<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionsSpreadsheet</h2>
    <p style="color:var(--color-text-muted); font-size:0.9rem; margin-bottom:1rem">
      Full-screen spreadsheet is teleported to body — preview below renders the overlay.
    </p>
    <TransactionsSpreadsheet
      :rows="rows"
      :is-loading="false"
      :is-streaming="false"
      error=""
      :labels="labels"
      @close="() => {}"
    />
  </div>
</template>

<script setup>
const rows = [
  { id: 1, datetime: '2026-07-18T10:00:00.000Z', type: 'expense', amount: 42.5, description: 'Groceries', categories: [{ name: 'Food' }], wallet: { name: 'Main', currency: 'USD' }, party: { name: 'Shop' } },
  { id: 2, datetime: '2026-07-01T09:00:00.000Z', type: 'income', amount: 3000, description: 'Salary', categories: [{ name: 'Income' }], wallet: { name: 'Main', currency: 'USD' }, party: { name: 'Employer' } },
  { id: 3, datetime: '2026-07-15T14:30:00.000Z', type: 'expense', amount: 1200, description: 'Rent', categories: [{ name: 'Housing' }], wallet: { name: 'Main', currency: 'USD' }, party: { name: 'Landlord' } }
];
const labels = {
  title: 'Transactions spreadsheet',
  rowCount: '{count} rows',
  loadingMore: 'loading…',
  searchPlaceholder: 'Search rows...',
  exportCsv: 'Export CSV',
  close: 'Close',
  loadingTransactions: 'Loading transactions...',
  dateCol: 'Date',
  typeCol: 'Type',
  amountCol: 'Amount',
  currencyCol: 'Currency',
  descCol: 'Description',
  catCol: 'Categories',
  walletCol: 'Wallet',
  partyCol: 'Party',
  markedAsRefund: 'Marked as refund',
  refund: 'refund',
  totals: 'Totals',
  income: 'Income',
  expenses: 'Expenses',
  net: 'Net',
  addRow: 'Add row',
  deleteSelected: 'Delete selected',
  save: 'Save',
  cancel: 'Cancel'
};
</script>
