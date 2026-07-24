<template>
  <button
    type="button"
    :class="[
      't-filter-toggle',
      { 't-filter-toggle--active': activeCount > 0 }
    ]"
    @click="$emit('click')"
  >
    <FunnelIcon class="t-filter-toggle__icon" />
    <span v-if="label" class="t-filter-toggle__label">{{ label }}</span>
    <span v-if="activeCount > 0" class="t-filter-toggle__badge">{{ activeCount }}</span>
  </button>
</template>

<script setup lang="ts">
import { FunnelIcon } from '@heroicons/vue/24/outline';

withDefaults(
  defineProps<{
    activeCount?: number;
    label?: string;
  }>(),
  {
    activeCount: 0,
    label: ''
  }
);

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-filter-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-1;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  background-color: $bg-white;
  cursor: pointer;
  color: $text-primary;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: $primary;
    color: $primary;
  }

  &--active {
    border-color: $primary;
    color: $primary;
    background-color: $primary-lighter;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-medium;
  }

  &__badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 9px;
    background-color: $primary;
    color: $text-inverse;
    font-size: $font-size-xs;
    font-weight: $font-bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
