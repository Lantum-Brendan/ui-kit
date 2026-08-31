<template>
  <div class="t-form-field" :class="{ 't-form-field--full': full }">
    <label v-if="label" :for="fieldId" class="t-form-field__label">
      {{ label }}
      <span v-if="required" class="t-form-field__required">*</span>
    </label>
    <div class="t-form-field__control">
      <slot />
    </div>
    <p v-if="error" class="t-form-field__error">{{ error }}</p>
    <p v-else-if="hint" class="t-form-field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    fieldId?: string;
    hint?: string;
    error?: string;
    full?: boolean;
    required?: boolean;
  }>(),
  {
    label: '',
    fieldId: undefined,
    hint: '',
    error: '',
    full: false,
    required: false
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  &--full {
    grid-column: 1 / -1;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-semibold;
    color: $text-primary;
    margin: 0;
  }

  &__required {
    color: $error-color;
    margin-left: 0.125rem;
  }

  &__control {
    width: 100%;
  }

  &__error {
    font-size: $font-size-xs;
    color: $error-color;
    margin: 0;
  }

  &__hint {
    font-size: $font-size-xs;
    color: $text-muted;
    margin: 0;
  }
}
</style>
