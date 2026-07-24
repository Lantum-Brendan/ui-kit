<template>
  <header class="t-section-header">
    <div class="t-section-header__text">
      <p v-if="eyebrow" class="t-section-header__eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="t-section-header__title">{{ title }}</h2>
      <p v-if="subtitle" class="t-section-header__subtitle">{{ subtitle }}</p>
      <slot />
    </div>
    <div v-if="$slots.actions" class="t-section-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  }>(),
  {
    eyebrow: '',
    title: '',
    subtitle: ''
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $spacing-4;
  margin-bottom: $spacing-6;

  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__eyebrow {
    font-size: $font-size-xs;
    font-weight: $font-bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $primary;
    margin: 0;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-bold;
    color: $text-primary;
    margin: 0;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: $text-secondary;
    margin: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    flex-shrink: 0;
  }
}
</style>
