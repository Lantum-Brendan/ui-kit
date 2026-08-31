<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">OutreachComposer</h2>
    <OutreachComposer
      :users="users"
      :preview-html="previewHtml"
    />
    <div style="margin-top:1rem"><TButton text="Preview" variant="outline" :full-width="false" /></div>
  </div>
</template>

<script setup>
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];
const previewHtml = '<div style="padding:12px;font-family:sans-serif"><h2>Hello {{first_name}}!</h2><p>Welcome to Trakli.</p></div>';
</script>
