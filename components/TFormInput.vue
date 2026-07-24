<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      't-form-input',
      `t-form-input--${size}`,
      { 't-form-input--error': error }
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    error: false,
    size: 'md'
  }
);

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-form-input {
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

  &::placeholder {
    color: $text-muted;
  }

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
