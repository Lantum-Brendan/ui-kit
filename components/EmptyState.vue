<template>
  <div class="empty-state">
    <div class="empty-art">
      <component :is="resolvedIcon" class="empty-illustration" />
    </div>
    <h2 class="empty-title">
      {{ title || (pageName ? `You don't have any ${pageName.toLowerCase()} at the moment.` : 'No items yet.') }}
    </h2>
    <p class="empty-subtitle">
      {{ subtitle || (pageName ? `Please add at least one ${pageName.toLowerCase()} to be able to view it.` : 'Add an item to get started.') }}
    </p>
    <TButton
      variant="primary"
      size="medium"
      :full-width="false"
      class="add-entity-btn"
      @click="$emit('create')"
    >
      <template #left-icon>
        <PlusIcon class="button-icon" />
      </template>
      {{ buttonLabel || (pageName ? `Add ${pageName.toLowerCase()}` : 'Add item') }}
    </TButton>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { Package as IconBox } from 'lucide-vue-next';
import TButton from './TButton.vue';

const props = defineProps({
  pageName: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  buttonLabel: {
    type: String,
    default: ''
  },
  // A (Lucide/Heroicons or any) icon component to theme the empty state for its content.
  icon: {
    type: [Object, Function],
    default: null
  }
});

defineEmits(['create']);

const resolvedIcon = computed(() => props.icon || IconBox);
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 50vh;

  @media (max-width: $breakpoint-sm) {
    padding: 2rem 0.5rem;
    min-height: 40vh;
  }
}

.empty-art {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, $primary-light, $bg-light 70%);

  @media (max-width: $breakpoint-sm) {
    width: 112px;
    height: 112px;
    margin-bottom: 1rem;
  }
}

.empty-illustration {
  width: 72px;
  height: 72px;
  color: $primary;

  @media (max-width: $breakpoint-sm) {
    width: 58px;
    height: 58px;
  }
}

.empty-title {
  color: $text-primary;
  font-size: 1.6rem;
  font-weight: $font-bold;
  margin: 0 1rem 0.5rem;
  line-height: 1.25;
  max-width: 28ch;

  @media (max-width: $breakpoint-sm) {
    font-size: 1.3rem;
  }
}

.empty-subtitle {
  color: $text-muted;
  font-size: 1rem;
  margin: 0 0 2rem;
  line-height: 1.5;
  max-width: 42ch;

  @media (max-width: $breakpoint-sm) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
}

.add-entity-btn {
  border-radius: $radius-xl;

  .button-icon {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
    stroke-width: 2;
  }
}
</style>
