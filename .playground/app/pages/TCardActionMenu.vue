<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TCardActionMenu</h2>
    <div style="display:flex; justify-content:center; padding:2rem; border:1px solid var(--color-border-light); border-radius:12px">
      <TCardActionMenu :items="items" trigger-label="More actions" edit-label="Edit" delete-label="Delete" />
    </div>
  </div>
</template>

<script setup>
const items = [
  { action: 'edit', label: 'Edit' },
  { action: 'delete', label: 'Delete', variant: 'danger' }
];
</script>
