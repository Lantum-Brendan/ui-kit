<template>
  <textarea
    :value="modelValue"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :class="[
      't-form-textarea',
      { 't-form-textarea--error': error }
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    rows?: number;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    maxlength?: number;
  }>(),
  {
    rows: 3,
    placeholder: '',
    disabled: false,
    readonly: false,
    error: false
  }
);

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-form-textarea {
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
  resize: vertical;

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

  &--error {
    border-color: $error-color;

    &:focus {
      border-color: $error-color;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
    }
  }
}
</style>
