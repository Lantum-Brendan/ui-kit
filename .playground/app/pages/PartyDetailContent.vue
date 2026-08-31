<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">PartyDetailContent</h2>
    <PartyDetailContent :party="party" :transactions="transactions" currency="USD" :formatter="formatter" :labels="labels" />
  </div>
</template>

<script setup>
const party = { id: 1, name: 'Acme Ltd', type: 'business', description: 'Top client', receivedAmount: 1200, spentAmount: 450, icon: 'Building2' };
const transactions = [
  { id: 1, partyId: 1, amount: -42.5, type: 'expense', category: 'Food', date: new Date().toISOString().slice(0,10), description: 'Groceries' },
  { id: 2, partyId: 1, amount: 1200, type: 'INCOME', category: 'Sales', date: new Date(Date.now()-86400000*2).toISOString().slice(0,10), description: 'Invoice paid' },
  { id: 3, partyId: 1, amount: -80, type: 'expense', category: 'Transport', date: new Date(Date.now()-86400000*5).toISOString().slice(0,10), description: 'Courier' }
];
const formatter = (n,c) => `$${Math.round(Number(n))} ${c||'USD'}`;
const labels = {
  backToList: 'Back to list',
  edit: 'Edit',
  delete: 'Delete',
  received: 'Received',
  spent: 'Spent',
  net: 'Net',
  lastSixMonths: 'Last 6 months',
  activity: 'Activity',
  recentTransactions: 'Recent transactions',
  shown: 'shown',
  viewAll: 'View all',
  noActivity: 'No activity yet.',
  transaction: 'Transaction',
  noTransactions: 'No transactions.',
  individual: 'Individual',
  business: 'Business',
  organization: 'Organization',
  vendor: 'Vendor',
  client: 'Client',
  party: 'Party'
};
</script>
