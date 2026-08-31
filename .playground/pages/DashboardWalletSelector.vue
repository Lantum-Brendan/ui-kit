<template>
  <div style="padding:2rem; max-width:400px; margin:0 auto">
    <h2 style="margin-bottom:1rem">DashboardWalletSelector</h2>
    <DashboardWalletSelector :selected-wallet-id="null" :wallets="wallets" all-wallets-label="All Wallets" />
  </div>
</template>

<script setup>
const wallets = [
  { id: 1, name: 'Main Wallet' },
  { id: 2, name: 'Savings' }
];
</script>
