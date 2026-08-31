<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">WalletDetailContent</h2>
    <WalletDetailContent :wallet="wallet" :is-default="true" :transactions="transactions" :formatter="formatter" :labels="labels" />
  </div>
</template>

<script setup>
const wallet = { id: 1, name: 'Main Wallet', balance: 4200.5, currency: 'USD', type: 'bank', stats: { total_income: 3000, total_expense: 2100 }, icon: 'Wallet' };
const transactions = [
  { id: 1, walletId: 1, amount: 42.5, type: 'expense', category: 'Food', party: 'ShopMart', date: new Date().toISOString().slice(0,10), description: 'Groceries' },
  { id: 2, walletId: 1, amount: 3000, type: 'INCOME', category: 'Income', party: 'Employer', date: new Date(Date.now()-86400000*2).toISOString().slice(0,10), description: 'Salary' },
  { id: 3, walletId: 1, amount: 18.99, type: 'expense', category: 'Transport', party: 'Transit Co', date: new Date(Date.now()-86400000*5).toISOString().slice(0,10), description: 'Bus pass' }
];
const formatter = (n,c) => `$${Math.round(Number(n)).toLocaleString()} ${c||'USD'}`;
const labels = {
  backToList: 'Back to list',
  edit: 'Edit',
  delete: 'Delete',
  balance: 'Balance',
  income: 'Income',
  expense: 'Expense',
  net: 'Net',
  last6Months: 'Last 6 months',
  activity: 'Activity',
  noActivity: 'No activity yet.',
  recentTransactions: 'Recent transactions',
  shown: 'shown',
  viewAll: 'View all',
  transaction: 'Transaction',
  noTransactions: 'No transactions.',
  default: 'Default',
  walletType: { bank: 'Bank', cash: 'Cash', creditCard: 'Credit card', savings: 'Savings' }
};
</script>
