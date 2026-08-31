<template>
  <div style="padding:2rem; max-width:1000px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormSection</h2>
    <TransactionFormSection page-name="Transaction">
      <TForm title="Transaction details" submit-label="Save" cancel-label="Cancel">
        <TFormField label="Amount"><TFormInput model-value="250" /></TFormField>
        <TFormField label="Description"><TFormTextarea model-value="Groceries" /></TFormField>
      </TForm>
    </TransactionFormSection>
  </div>
</template>
