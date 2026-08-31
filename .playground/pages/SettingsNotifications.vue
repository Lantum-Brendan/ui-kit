<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">SettingsNotifications</h2>
    <SettingsNotifications :is-edit-mode="false" :loading="false" :preferences="preferences" />
  </div>
</template>

<script setup>
const preferences = {
  channels: { email: true, push: false, inapp: true },
  types: { reminders: true, insights: false, inactivity: true }
};
</script>
