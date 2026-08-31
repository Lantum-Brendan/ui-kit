<template>
  <div style="padding:2rem; max-width:500px; margin:0 auto">
    <h2 style="margin-bottom:1rem">NotificationBell</h2>
    <NotificationBell :notifications="notifications" :unread-count="1" />
  </div>
</template>

<script setup>
const notifications = [
  { id: 1, title: 'New transaction', body: 'Groceries -42.5 USD', read: false, created_at: '2026-07-18T10:00:00Z' },
  { id: 2, title: 'Budget alert', body: 'Food 80% used', read: true, created_at: '2026-07-17T10:00:00Z' }
];
</script>
