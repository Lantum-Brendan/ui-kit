<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">SettingsWallets</h2>
    <SettingsWallets :is-edit-mode="false" :wallets="wallets" :groups="groups" :default-wallet-id="1" :default-group-id="1" :allow-negative-balance="false" />
  </div>
</template>

<script setup>
const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Savings', currency: 'EUR' }
];
const groups = [
  { id: 1, name: 'General' },
  { id: 2, name: 'Work' }
];
</script>
