<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionForm</h2>
    <TransactionForm
      :is-outcome-selected="true"
      :parties="parties"
      :wallets="wallets"
      :groups="groups"
      :categories="categories"
      :default-wallet-id="10"
      :default-group-id="1"
      default-currency="USD"
      :recent-expenses="[]"
    />
  </div>
</template>

<script setup>
const parties = [
  { id: 1, name: 'Acme Ltd' },
  { id: 2, name: 'Globex Corp' }
];
const wallets = [
  { id: 10, name: 'Main Wallet', currency: 'USD' },
  { id: 11, name: 'Savings', currency: 'USD' }
];
const groups = [
  { id: 1, name: 'General' },
  { id: 2, name: 'Work' }
];
const categories = [
  { id: 10, name: 'Food' },
  { id: 11, name: 'Transport' }
];
</script>
