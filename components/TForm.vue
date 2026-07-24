<template>
  <form class="t-form" @submit.prevent="$emit('submit')">
    <slot name="header">
      <div v-if="title || showClose" class="t-form__header">
        <h2 v-if="title" class="t-form__title">{{ title }}</h2>
        <button
          v-if="showClose"
          type="button"
          class="t-form__close-btn"
          aria-label="Close form"
          @click="$emit('close')"
        >
          <XIcon class="t-form__close-icon" />
        </button>
      </div>
    </slot>

    <slot name="error">
      <div v-if="apiError" class="t-form__api-error">
        {{ apiError }}
      </div>
    </slot>

    <div class="t-form__body">
      <slot />
    </div>

    <slot name="footer">
      <div class="t-form__footer">
        <button
          v-if="showCancel"
          type="button"
          class="t-form__btn t-form__btn--secondary"
          :disabled="isSubmitting"
          @click="$emit('close')"
        >
          {{ cancelLabel }}
        </button>
        <button
          type="submit"
          class="t-form__btn t-form__btn--primary"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="t-form__spinner"></span>
          <span>{{ submitLabel }}</span>
        </button>
      </div>
    </slot>
  </form>
</template>

<script setup lang="ts">
import { XMarkIcon as XIcon } from '@heroicons/vue/24/outline';

withDefaults(
  defineProps<{
    title?: string;
    isSubmitting?: boolean;
    apiError?: string;
    submitLabel?: string;
    cancelLabel?: string;
    showClose?: boolean;
    showCancel?: boolean;
  }>(),
  {
    title: '',
    isSubmitting: false,
    apiError: '',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    showClose: true,
    showCancel: true
  }
);

defineEmits<{
  (e: 'submit'): void;
  (e: 'close'): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  background-color: $bg-white;
  border-radius: $radius-xl;
  padding: $spacing-6;
  border: 1px solid $border-color;
  box-shadow: $shadow-md;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: $spacing-3;
    border-bottom: 1px solid $border-light;
  }

  &__title {
    margin: 0;
    font-size: $font-size-xl;
    font-weight: $font-bold;
    color: $text-primary;
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

    &:hover {
      color: $text-primary;
      background-color: $bg-gray;
    }
  }

  &__close-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__api-error {
    background-color: var(--color-error-light, #fee2e2);
    color: $error-color;
    padding: $spacing-3 $spacing-4;
    border-radius: $radius-lg;
    font-size: $font-size-sm;
    font-weight: $font-medium;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $spacing-3;
    padding-top: $spacing-4;
    border-top: 1px solid $border-light;
  }

  &__btn {
    font-family: inherit;
    font-size: $font-size-sm;
    font-weight: $font-semibold;
    padding: 0.625rem 1.25rem;
    border-radius: $radius-lg;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-2;
    border: 1px solid transparent;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &--primary {
      background-color: $primary;
      color: $text-inverse;

      &:hover:not(:disabled) {
        background-color: $primary-hover;
      }
    }

    &--secondary {
      background-color: transparent;
      color: $text-primary;
      border-color: $border-color;

      &:hover:not(:disabled) {
        background-color: $bg-gray;
      }
    }
  }

  &__spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
