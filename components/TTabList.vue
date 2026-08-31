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
import { nextTick } from 'vue';
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
  if (!props.keyboard) return;
  const tablistEl = event.currentTarget as HTMLElement;
  const tabEls = Array.from(tablistEl.querySelectorAll('[role="tab"]')) as HTMLElement[];
  if (!tabEls.length) return;

  // Determine current index from focused element or from modelValue
  let currentIndex = tabEls.findIndex((el) => el === document.activeElement);
  if (currentIndex === -1 && props.tabs.length) {
    currentIndex = props.tabs.findIndex((t) => t.id === props.modelValue);
  }
  if (currentIndex === -1) currentIndex = 0;

  const getNextIndex = (dir: 1 | -1) => {
    if (props.tabs.length) {
      // skip disabled tabs when we have data
      for (let i = 1; i <= props.tabs.length; i++) {
        const idx = (currentIndex + dir * i + props.tabs.length) % props.tabs.length;
        const el = tabEls[idx];
        if (el && !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true') {
          return idx;
        }
      }
      return (currentIndex + dir + props.tabs.length) % props.tabs.length;
    }
    // slot mode: skip disabled DOM nodes
    for (let i = 1; i <= tabEls.length; i++) {
      const idx = (currentIndex + dir * i + tabEls.length) % tabEls.length;
      const el = tabEls[idx] as HTMLButtonElement;
      if (!el.disabled) return idx;
    }
    return (currentIndex + dir + tabEls.length) % tabEls.length;
  };

  let nextIndex: number | null = null;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault();
    nextIndex = getNextIndex(1);
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault();
    nextIndex = getNextIndex(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    nextIndex = 0;
  } else if (event.key === 'End') {
    event.preventDefault();
    nextIndex = tabEls.length - 1;
  }

  if (nextIndex === null) return;

  const nextEl = tabEls[nextIndex];
  if (!nextEl) return;

  // Update model and move focus (roving tabindex will make new tab 0)
  if (props.tabs.length) {
    const nextId = props.tabs[nextIndex]?.id;
    if (nextId) emit('update:modelValue', nextId);
  } else {
    // slot mode: the tab's value is in its id/value attr? try to dispatch click
    nextEl.click();
  }
  nextTick(() => {
    (nextEl as HTMLElement).focus();
  });
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
