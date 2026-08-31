<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">CategoryDrillModal</h2>
    <CategoryDrillModal :open="true" :bucket="bucket" :transactions="transactions" currency="USD" :formatter="formatter" />
  </div>
</template>

<script setup>
const bucket = { name: 'Food', count: 24, amount: 640, delta: 0.12, trend: [20, 40, 30, 50, 60, 40], color: '#3b82f6' };
const transactions = [
  { id: 1, name: 'Groceries', amount: -42.5, date: '2026-07-18' },
  { id: 2, name: 'Restaurant', amount: -28, date: '2026-07-17' }
];
const formatter = (n) => `$${Math.round(n)}`;
</script>
