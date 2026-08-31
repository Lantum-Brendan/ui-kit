<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ChatLandingInsights</h2>
    <ChatLandingInsights :income="3000" :expenses="2100" :savings-rate="0.3" :tx-count="48" :avg-expense="42.5" biggest-expense="Rent" :top-category="{ name: 'Food', pct: 40 }" :format-money-fn="formatMoney" />
  </div>
</template>

<script setup>
const formatMoney = (v) => `$${Math.round(v)}`;
</script>
