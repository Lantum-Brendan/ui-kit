<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TFormSelect</h2>
    <TFormSelect model-value="option1" :options="options" size="md" />
    <div style="margin-top:1rem"><TFormSelect model-value="option2" :options="options" size="sm" /></div>
  </div>
</template>

<script setup>
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3 (disabled)', value: 'option3', disabled: true }
];
</script>
