<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">RecentTransactions</h2>
    <RecentTransactions :transactions="transactions" :limit="5" :labels="labels" />
  </div>
</template>

<script setup>
const transactions = [
  { id: 1, type: 'INCOME', amount: '1200', party: 'Acme Ltd', category: 'Sales', date: new Date().toISOString().slice(0,10) },
  { id: 2, type: 'EXPENSE', amount: '42.50', party: 'ShopMart', category: 'Food', date: new Date(Date.now()-86400000).toISOString().slice(0,10) },
  { id: 3, type: 'EXPENSE', amount: '18.99', party: 'Transit Co', category: 'Transport', date: new Date(Date.now()-86400000*2).toISOString().slice(0,10) },
  { id: 4, type: 'INCOME', amount: '300', party: 'Globex', category: 'Freelance', date: new Date(Date.now()-86400000*3).toISOString().slice(0,10) },
  { id: 5, type: 'EXPENSE', amount: '65', party: 'Bookstore', category: 'Education', date: new Date(Date.now()-86400000*4).toISOString().slice(0,10) }
];
const labels = {
  recentTransactions: 'Recent Transactions',
  viewAll: 'View All',
  noTransactionsYet: 'No transactions yet',
  today: 'Today',
  yesterday: 'Yesterday',
  dAgo: '{n}d ago',
  wAgo: '{n}w ago',
  moAgo: '{n}mo ago'
};
</script>
