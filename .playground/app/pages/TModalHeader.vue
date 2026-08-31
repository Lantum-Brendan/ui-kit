<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TModalHeader</h2>
    <div style="border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
      <TModalHeader title="Confirm action" :show-close="true" @close="onClose" />
      <div style="padding:1rem; color:var(--color-text-muted)">Modal body content goes here.</div>
    </div>
  </div>
</template>

<script setup>
const onClose = () => {};
</script>
