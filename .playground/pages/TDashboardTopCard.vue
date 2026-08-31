<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TDashboardTopCard</h2>
    <TDashboardTopCard :show-filters="true" active-period="current_month" :is-custom-active="false" :custom-open="false" period-subtitle="July 2026 · All wallets" :periods="periods" />
  </div>
</template>

<script setup>
const periods = [
  { value: 'current_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'current_year', label: 'This year' }
];
</script>
