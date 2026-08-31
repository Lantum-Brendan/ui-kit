<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">DashboardKPIs</h2>
    <DashboardKPIs :statistics="{ total_balance: 12340, total_income: 3000, total_expenses: 2100 }" currency="USD" />
  </div>
</template>
