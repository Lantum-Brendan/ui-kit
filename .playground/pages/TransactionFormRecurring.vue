<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormRecurring</h2>
    <TForm title="Recurring" submit-label="Save" cancel-label="Cancel">
      <TransactionFormRecurring
        :model-value="true"
        period="monthly"
        :interval="1"
        ends-at="2026-12-31"
        :labels="labels"
      />
    </TForm>
    <div style="margin-top:1rem"><TButton text="Action" variant="outline" :full-width="false" /></div>
  </div>
</template>

<script setup>
const labels = {
  makeRecurring: 'Make recurring',
  recurrencePeriod: 'Recurrence period',
  repeatEvery: 'Repeat every',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
  endDate: 'End date',
  optional: 'optional'
};
</script>
