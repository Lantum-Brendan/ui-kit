<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">FinancialPositionHero</h2>
    <FinancialPositionHero :position="position" currency="USD" :labels="labels" :total-in="3800" :total-out="2100" />
  </div>
</template>

<script setup>
const position = {
  net_worth_delta: 900,
  total_net_worth: 52340,
  cash_balance: 12340,
  holdings_value: 40000
};
const labels = {
  netWorthChange: 'Net worth change',
  building: 'Building',
  shrinking: 'Shrinking',
  heroSub: 'Real earnings minus real spend.',
  moneyIn: 'Money in',
  moneyOut: 'Money out',
  totalNetWorthNow: 'Total net worth now',
  cash: 'Cash',
  holdings: 'Holdings'
};
</script>
