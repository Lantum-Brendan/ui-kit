<template>
  <button
    :id="tabId"
    role="tab"
    :aria-selected="active"
    :aria-controls="panelId"
    :tabindex="disabled ? -1 : active ? 0 : -1"
    :disabled="disabled"
    :class="[
      't-tab tab tab-btn',
      `t-tab--${variant}`,
      { active: active, 'tab--active': active, disabled: disabled }
    ]"
    @click="$emit('click')"
  >
    <component :is="icon" v-if="icon" class="t-tab__icon" />
    <span class="t-tab__label tab-label"><slot>{{ label }}</slot></span>
    <span v-if="count !== undefined && count !== null" class="t-tab__count tab-count">
      {{ count }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';

const props = withDefaults(
  defineProps<{
    value: string;
    label?: string;
    icon?: Component;
    count?: number;
    active?: boolean;
    disabled?: boolean;
    variant?: 'pill' | 'underline' | 'indicator';
    id?: string;
    controls?: string;
  }>(),
  {
    label: '',
    icon: undefined,
    count: undefined,
    active: false,
    disabled: false,
    variant: 'pill',
    id: undefined,
    controls: undefined
  }
);

defineEmits<{
  (e: 'click'): void;
}>();

const tabId = computed(() => props.id ?? `t-tab-${props.value}`);
const panelId = computed(() => props.controls ?? `t-tab-panel-${props.value}`);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-tab {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  border: none;
  background: transparent;
  cursor: pointer;
  color: $text-muted;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover:not(.disabled) {
    color: $text-primary;
  }

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--pill {
    height: 36px;
    padding: 0 $spacing-4;
    border-radius: 999px;

    &.active {
      background: $primary-light;
      color: $primary;
    }
  }

  &--underline {
    height: 40px;
    padding: 0 $spacing-3;
    border-bottom: 2px solid transparent;

    &.active {
      color: $primary;
      border-bottom-color: $primary;
    }
  }

  &--indicator {
    height: 36px;
    padding: 0 $spacing-4;
    border-radius: $radius-lg;
    position: relative;

    &.active {
      color: $primary;
      font-weight: $font-semibold;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__count {
    margin-left: 2px;
    padding: 2px 6px;
    border-radius: $radius-sm;
    background: rgba(0, 0, 0, 0.06);
    font-size: $font-size-xs;
  }
}
</style>
