<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">SettingsConnections</h2>
    <SettingsConnections endpoint="https://api.trakli.com/mcp" :tokens="tokens" :loading="false" :creating="false" :created-token="null" />
  </div>
</template>

<script setup>
const tokens = [
  { id: 1, name: 'Claude Desktop', last_used_at: new Date().toISOString() },
  { id: 2, name: 'Cursor', last_used_at: null }
];
</script>
