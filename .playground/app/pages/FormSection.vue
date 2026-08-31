<template>
  <div style="padding:2rem; max-width:700px; margin:0 auto">
    <h2 style="margin-bottom:1rem">FormSection</h2>
    <FormSection :is-submitting="false">
      <template #default="{ isExpenseSelected, isIncomeSelected, isTransferSelected }">
        <div style="padding:1rem; border:1px dashed var(--color-border-light); border-radius:8px">
          <p>Expense: {{ isExpenseSelected }}, Income: {{ isIncomeSelected }}, Transfer: {{ isTransferSelected }}</p>
          <TButton text="Demo action" variant="primary" :full-width="false" />
        </div>
      </template>
    </FormSection>
  </div>
</template>
