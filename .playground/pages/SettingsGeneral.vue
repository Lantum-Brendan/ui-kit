<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">SettingsGeneral</h2>
    <SettingsGeneral :is-edit-mode="false" initial-language="en" initial-currency="USD" :languages="languages" :currencies="currencies" />
  </div>
</template>

<script setup>
const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' }
];
const currencies = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' }
];
</script>
