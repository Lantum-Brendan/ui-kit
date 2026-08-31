<template>
  <div style="padding:2rem; max-width:1000px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ChatExperience</h2>
    <div style="height:600px; border:1px solid var(--color-border-light); overflow:hidden">
      <ChatExperience mode="landing" :sessions="sessions" :current-session-id="1" current-title="Budget help" :messages="messages" :suggestions="suggestions" />
    </div>
  </div>
</template>

<script setup>
const sessions = [
  { id: 1, title: 'Budget help', created_at: '2026-07-18', updated_at: '2026-07-18' },
  { id: 2, title: 'Spending review', created_at: '2026-07-15', updated_at: '2026-07-15' }
];
const messages = [
  { id: 1, role: 'assistant', text: 'How can I help?' },
  { id: 2, role: 'user', text: 'Show my spending' }
];
const suggestions = [{ id: 1, label: 'Show spending by category' }];
</script>
