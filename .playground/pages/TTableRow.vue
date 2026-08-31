<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TTableRow</h2>
    <table style="width:100%; border-collapse:collapse">
      <thead><tr><th>Date</th><th>Type</th><th>Party</th><th>Amount</th><th>Category</th><th>Actions</th></tr></thead>
      <tbody>
        <TTableRow :txn="txn" :labels="labels" :format-date="formatDate" :format-time-ago="formatTimeAgo" />
        <TTableRow :txn="txn2" :labels="labels" :format-date="formatDate" :format-time-ago="formatTimeAgo" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
const txn = { id: 1, type: 'INCOME', amount: '$1,200.00', party: 'Acme Ltd', category: 'Sales', date: new Date().toISOString(), datetime: new Date().toISOString(), isTransfer: false, isRefund: false, isRecurring: false };
const txn2 = { id: 2, type: 'EXPENSE', amount: '$42.50', party: 'ShopMart', category: 'Food', date: new Date().toISOString(), datetime: new Date().toISOString(), isTransfer: true, isRefund: false, isRecurring: true };
const labels = { transfer: 'Transfer', refund: 'Refund', recurring: 'Recurring' };
const formatDate = (t) => new Date(t.date || t.datetime).toLocaleDateString();
const formatTimeAgo = () => 'Today';
</script>
