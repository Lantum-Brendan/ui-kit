<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">NotificationsContainer</h2>
    <NotificationsContainer :notifications="notifications" :confirm-modal="null" />
  </div>
</template>

<script setup>
const notifications = [
  { id: 1, type: 'success', title: 'Saved', message: 'Transaction saved successfully.' },
  { id: 2, type: 'error', title: 'Error', message: 'Failed to save.' }
];
</script>
