<template>
  <div style="padding:2rem; max-width:1000px; margin:0 auto">
    <h2 style="margin-bottom:1rem">FinancialPositionView</h2>
    <FinancialPositionView :position="position" currency="USD" />
  </div>
</template>

<script setup>
const position = {
  net_worth_delta: 900,
  total_net_worth: 52340,
  cash_balance: 12340,
  holdings_value: 40000,
  earned_income: 3200,
  investment_returns: 400,
  gifts_received: 200,
  loan_received: 0,
  debt_owed: 0,
  discretionary_spend: 2100,
  investment_principal: 500,
  loan_repayment: 0,
  debt_settled: 0
};
</script>
