<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TForm</h2>
    <TForm title="Demo form" submit-label="Save" cancel-label="Cancel" @submit="onSubmit" @close="onClose">
      <TFormField label="Email address" hint="We will never share your email.">
        <TFormInput model-value="" placeholder="you@example.com" />
      </TFormField>
      <TFormField label="Description">
        <TFormTextarea model-value="" placeholder="Enter details" />
      </TFormField>
    </TForm>
    <div style="margin-top:1rem"><TButton text="Action" variant="primary" :full-width="false" /></div>
  </div>
</template>

<script setup>
const onSubmit = () => {};
const onClose = () => {};
</script>
