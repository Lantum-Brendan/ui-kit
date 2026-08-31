<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormIntent</h2>
    <TForm title="Transaction intent" submit-label="Save" cancel-label="Cancel">
      <TransactionFormIntent v-model="intent" :options="options" label="Intent" :labels="labels" />
    </TForm>
    <p style="margin-top:1rem; color:var(--color-text-muted); font-size:0.85rem">Selected: {{ intent }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const intent = ref('regular');
const options = [
  { value: 'regular', label: 'Regular', side: 'both' },
  { value: 'loan_received', label: 'Loan received', side: 'income' },
  { value: 'loan_repayment', label: 'Loan repayment', side: 'expense' },
  { value: 'gift', label: 'Gift', side: 'both' }
];
const labels = { intentLabels: { regular: 'Regular', loan_received: 'Loan received', loan_repayment: 'Loan repayment', gift: 'Gift' } };
</script>
