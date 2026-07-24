<template>
  <div :class="['t-form-row', `t-form-row--cols-${cols}`, `t-form-row--gap-${gap}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    cols?: 1 | 2 | 3;
    gap?: 'sm' | 'md' | 'lg';
  }>(),
  {
    cols: 2,
    gap: 'md'
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-form-row {
  display: grid;

  &--gap-sm {
    gap: $spacing-2;
  }

  &--gap-md {
    gap: $spacing-4;
  }

  &--gap-lg {
    gap: $spacing-6;
  }

  &--cols-1 {
    grid-template-columns: 1fr;
  }

  &--cols-2 {
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
    }
  }

  &--cols-3 {
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
