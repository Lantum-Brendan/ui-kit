<template>
  <div class="t-list-header">
    <div class="t-list-header__left">
      <slot name="title">
        <h1 v-if="title" class="t-list-header__title">{{ title }}</h1>
      </slot>
    </div>
    <div class="t-list-header__controls">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: ''
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-list-header {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  margin-bottom: $spacing-4;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: $spacing-3;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-bold;
    color: $text-primary;
    margin: 0;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    flex-shrink: 0;
  }
}
</style>
