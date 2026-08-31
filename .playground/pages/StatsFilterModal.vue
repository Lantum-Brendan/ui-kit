<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">StatsFilterModal</h2>
    <div style="position:relative; min-height:480px; border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
      <StatsFilterModal :wallets="wallets" current-period="current_month" :initial-filters="initialFilters" />
    </div>
  </div>
</template>

<script setup>
const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Savings', currency: 'EUR' },
  { id: 3, name: 'Cash', currency: 'USD' }
];
const initialFilters = { startDate: '2026-07-01', endDate: '2026-07-31', walletIds: [] };
</script>
