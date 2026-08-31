<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">DescriptorRenderer</h2>
    <DescriptorRenderer :contribution="contribution" />
  </div>
</template>

<script setup>
const contribution = {
  key: 'demo-integration',
  slot: 'dashboard.widgets',
  configured: true,
  integration: {
    key: 'demo',
    name: 'Demo Integration',
    description: 'An example integration card.',
    icon: 'Puzzle',
    configured: true
  },
  ui: {
    slots: ['dashboard.widgets'],
    card: { title: 'Demo Integration', description: 'An example integration card.', cta: 'Open', href: '#' },
    onboarding: null,
    component: null
  }
};
</script>
