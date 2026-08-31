<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">HoldingForm</h2>
    <HoldingForm :open="true" :currencies="currencies" :search-results="searchResults" default-currency="USD" />
  </div>
</template>

<script setup>
const currencies = [{ code: 'USD' }, { code: 'EUR' }, { code: 'GBP' }];
const searchResults = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
];
</script>
