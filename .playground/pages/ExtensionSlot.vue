<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ExtensionSlot</h2>
    <ExtensionSlot :contributions="contributions" />
  </div>
</template>

<script setup>
const contributions = [
  {
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
  }
];
</script>
