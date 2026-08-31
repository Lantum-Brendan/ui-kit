<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionsSpreadsheetEditor</h2>
    <div style="border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
      <table style="width:100%; border-collapse:collapse; font-size:12px">
        <thead>
          <tr style="background:var(--color-bg-slate); text-align:left">
            <th style="padding:6px 10px">#</th>
            <th style="padding:6px 10px">Date</th>
            <th style="padding:6px 10px">Type</th>
            <th style="padding:6px 10px">Amount</th>
            <th style="padding:6px 10px">Currency</th>
            <th style="padding:6px 10px">Description</th>
            <th style="padding:6px 10px">Categories</th>
            <th style="padding:6px 10px" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <TransactionsSpreadsheetEditor :editing-row="row" :labels="labels" :currencies="['USD','EUR','GBP']" />
        </tbody>
      </table>
    </div>
    <div style="margin-top:1rem"><TButton text="Save" variant="primary" :full-width="false" /></div>
  </div>
</template>

<script setup>
const row = {
  id: 1,
  datetime: '2026-07-18T10:00:00.000Z',
  type: 'expense',
  amount: 42.5,
  description: 'Groceries',
  categories: [{ name: 'Food' }],
  wallet: { currency: 'USD', name: 'Main' }
};
const labels = {
  dateCol: 'Date',
  amountCol: 'Amount',
  descCol: 'Description',
  catCol: 'Categories',
  walletCol: 'Wallet',
  save: 'Save',
  cancel: 'Cancel'
};
</script>
