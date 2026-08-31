<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormContainer</h2>
    <TransactionFormContainer>
      <TForm title="Inside container" submit-label="Save" cancel-label="Cancel">
        <TFormField label="Example field">
          <TFormInput model-value="Demo value" />
        </TFormField>
      </TForm>
    </TransactionFormContainer>
  </div>
</template>
