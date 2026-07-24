<template>
  <select
    :value="modelValue"
    :disabled="disabled"
    :class="[
      't-form-select',
      `t-form-select--${size}`,
      { 't-form-select--error': error }
    ]"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <slot>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </option>
    </slot>
  </select>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | number;
    options?: Array<{ label: string; value: string | number; disabled?: boolean }>;
    disabled?: boolean;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    options: () => [],
    disabled: false,
    error: false,
    size: 'md'
  }
);

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-form-select {
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: $font-size-base;
  color: $text-primary;
  background-color: $input-bg;
  border: 1px solid $border-color;
  border-radius: $radius-xl;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 3px $input-focus;
  }

  &:disabled {
    background-color: $bg-gray;
    color: $text-muted;
    cursor: not-allowed;
  }

  &--sm {
    padding: 0.5rem 0.75rem;
    font-size: $font-size-sm;
    border-radius: $radius-lg;
  }

  &--lg {
    padding: 1rem 1.25rem;
    font-size: $font-size-lg;
    border-radius: $radius-xl;
  }

  &--error {
    border-color: $error-color;

    &:focus {
      border-color: $error-color;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
    }
  }
}
</style>
