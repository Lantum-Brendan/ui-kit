<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">DashboardQuickActionModal</h2>
    <DashboardQuickActionModal action="log" :wallets="wallets" :parties="parties" />
  </div>
</template>

<script setup>
const wallets = [
  { id: 1, name: 'Main', currency: 'USD' },
  { id: 2, name: 'Savings', currency: 'USD' }
];
const parties = [
  { id: 1, name: 'Acme Ltd' },
  { id: 2, name: 'Globex' }
];
</script>
