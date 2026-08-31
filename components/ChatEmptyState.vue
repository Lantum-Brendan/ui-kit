<template>
  <div class="empty-chat">
    <div class="empty-chat-icon">
      <Sparkles :size="28" />
    </div>
    <h3>{{ labels.askAboutFinances }}</h3>
    <p>{{ labels.tryOneOfThese }}</p>
    <div class="suggestions">
      <button
        v-for="prompt in suggestionPrompts"
        :key="prompt"
        class="suggestion"
        @click="$emit('pick', prompt)"
      >
        {{ labels.suggestions[prompt] || prompt }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Sparkles } from 'lucide-vue-next';

defineEmits(['pick']);

const suggestionPrompts = [
  'How much did I spend last month?',
  "What's my biggest spending category?",
  'Show my recent transactions',
  'What wallet has the most money?'
];

const props = defineProps({
  labels: { type: Object, default: null }
});

const defaultLabels = {
  askAboutFinances: 'Ask about your finances',
  tryOneOfThese: 'Or try one of these',
  suggestions: {}
};

const labels = computed(() => props.labels ?? defaultLabels);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.empty-chat {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-2;
  text-align: center;
  max-width: 420px;

  h3 {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-semibold;
    color: $text-primary;
  }

  p {
    margin: 0;
    font-size: $font-size-sm;
    color: $text-muted;
  }
}

.empty-chat-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: $primary-light;
  color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-2;
  justify-content: center;
  margin-top: $spacing-2;
}

.suggestion {
  background: $bg-gray;
  border: 1px solid $border-light;
  color: $text-primary;
  border-radius: 9999px;
  padding: $spacing-1 $spacing-3;
  font-size: 0.8rem;
  cursor: pointer;
  transition: $transition-base;

  &:hover {
    background: $primary-light;
    color: $primary;
    border-color: $primary-muted;
  }
}
</style>
