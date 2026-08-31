<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">UserDetail</h2>
    <UserDetail :detail="detail" :loading="false" error="" />
  </div>
</template>

<script setup>
const detail = {
  user: { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', is_admin: false, created_at: '2024-03-15T10:00:00Z' },
  preferences: { country: 'United States', language: 'English', currency: 'USD' },
  counts: { transactions: 42, wallets: 3, categories: 8, parties: 5, groups: 2, budgets: 4 },
  last_transaction_at: new Date().toISOString()
};
</script>
