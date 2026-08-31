<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TTableTotals</h2>
    <TTableTotals :totals="totals" :labels="labels" :format-currency="formatCurrency" />
  </div>
</template>

<script setup>
const totals = { income: 3000, expenses: 2100, net: 900 };
const labels = { totals: 'Totals', income: 'Income', expenses: 'Expenses', net: 'Net' };
const formatCurrency = (v) => `$${Math.round(Number(v)).toLocaleString()}`;
</script>
