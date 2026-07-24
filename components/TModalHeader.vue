<template>
  <div class="t-modal-header">
    <div class="t-modal-header__title-container">
      <slot name="icon" />
      <slot name="title">
        <h3 v-if="title" class="t-modal-header__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="t-modal-header__actions">
      <slot name="actions" />
      <button
        v-if="showClose"
        type="button"
        class="t-modal-header__close-btn"
        aria-label="Close modal"
        @click="$emit('close')"
      >
        <XIcon class="t-modal-header__close-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon as XIcon } from '@heroicons/vue/24/outline';

withDefaults(
  defineProps<{
    title?: string;
    showClose?: boolean;
  }>(),
  {
    title: '',
    showClose: true
  }
);

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-4 $spacing-6;
  border-bottom: 1px solid $border-light;

  &__title-container {
    display: flex;
    align-items: center;
    gap: $spacing-3;
  }

  &__title {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-semibold;
    color: $text-primary;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-2;
  }

  &__close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: $text-muted;
    padding: $spacing-1;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      color: $text-primary;
      background-color: $bg-gray;
    }
  }

  &__close-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
