<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ChatProposedActionBlock</h2>
    <ChatProposedActionBlock :block="block" :wallets="wallets" :categories="categories" :parties="parties" />
  </div>
</template>

<script setup>
const block = {
  summary: 'Create expense transaction',
  risk: 'low',
  status: 'pending',
  fields: [
    { key: 'amount', label: 'Amount', type: 'number', value: 42.5 },
    { key: 'description', label: 'Description', type: 'text', value: 'Groceries' },
    { key: 'datetime', label: 'Date', type: 'datetime', value: '2026-07-18T10:00' }
  ]
};
const wallets = [{ id: 1, name: 'Main' }];
const categories = [{ id: 1, name: 'Food' }];
const parties = [{ id: 1, name: 'Shop' }];
</script>
