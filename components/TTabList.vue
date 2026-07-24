<template>
  <nav
    role="tablist"
    :class="['t-tab-list', `t-tab-list--${variant}`]"
    @keydown="handleKeydown"
  >
    <slot>
      <TTab
        v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id"
        :label="tab.label"
        :icon="tab.icon"
        :count="tab.count"
        :active="modelValue === tab.id"
        :variant="variant"
        @click="$emit('update:modelValue', tab.id)"
      />
    </slot>
  </nav>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import TTab from './TTab.vue';

interface TabItem {
  id: string;
  label: string;
  icon?: Component;
  count?: number;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    tabs?: TabItem[];
    variant?: 'pill' | 'underline' | 'indicator';
    keyboard?: boolean;
  }>(),
  {
    tabs: () => [],
    variant: 'pill',
    keyboard: true
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void;
}>();

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.keyboard || !props.tabs.length) return;
  const currentIndex = props.tabs.findIndex((t) => t.id === props.modelValue);
  if (currentIndex === -1) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    const nextIndex = (currentIndex + 1) % props.tabs.length;
    emit('update:modelValue', props.tabs[nextIndex].id);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    const prevIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length;
    emit('update:modelValue', props.tabs[prevIndex].id);
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-tab-list {
  display: inline-flex;
  align-items: center;
  gap: $spacing-1;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &--pill {
    padding: 4px;
    background: $bg-white;
    border: 1px solid $border-color;
    border-radius: 999px;
  }

  &--underline {
    border-bottom: 1px solid $border-color;
    width: 100%;
  }

  &--indicator {
    padding: 4px;
    background: $bg-gray;
    border-radius: $radius-xl;
  }
}
</style>
