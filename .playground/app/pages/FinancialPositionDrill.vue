<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">FinancialPositionDrill</h2>
    <FinancialPositionDrill :open="true" :group="group" :rows="rows" :format-amount-fn="formatAmount" />
  </div>
</template>

<script setup>
const group = {
  label: 'Earned income',
  eyebrow: 'Money in',
  tone: 'income',
  metric: '$3,200',
  hint: 'Regular salary and side gig.',
  intents: ['regular']
};
const rows = [
  { id: 1, title: 'Salary', meta: '2026-07-01', amount: '3,000 USD', amountNum: 3000, type: 'income', intent: 'regular', currency: 'USD' },
  { id: 2, title: 'Side gig', meta: '2026-07-15', amount: '200 USD', amountNum: 200, type: 'income', intent: 'regular', currency: 'USD' }
];
const formatAmount = (amount, currency) => `${amount} ${currency}`;
</script>
