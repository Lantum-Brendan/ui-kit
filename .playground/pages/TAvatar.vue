<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TAvatar</h2>
    <TAvatar image-url="https://i.pravatar.cc/100?img=12" user-name="Jane Doe" :show-name="true" :show-dropdown="false" :user="user" />
  </div>
</template>

<script setup>
const user = { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', is_admin: true };
</script>
