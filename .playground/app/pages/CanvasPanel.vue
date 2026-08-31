<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">CanvasPanel</h2>
    <div style="height:500px; border:1px solid var(--color-border-light)">
      <CanvasPanel :canvas="canvas" :session-id="1" :message-id="1" />
    </div>
  </div>
</template>

<script setup>
const canvas = {
  blocks: [
    { type: 'kpi', title: 'Overview', items: [{ label: 'Net', value: 900, currency: 'USD', trend: 'up' }] },
    { type: 'table', title: 'Top expenses', columns: ['name', 'amount'], rows: [{ name: 'Rent', amount: 1200 }] }
  ]
};
</script>
