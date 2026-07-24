<template>
  <div :class="['t-modal-footer', `t-modal-footer--align-${align}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'left' | 'right' | 'between';
  }>(),
  {
    align: 'right'
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-modal-footer {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-4 $spacing-6;
  border-top: 1px solid $border-light;
  background-color: $bg-gray;
  border-bottom-left-radius: $radius-xl;
  border-bottom-right-radius: $radius-xl;

  &--align-left {
    justify-content: flex-start;
  }

  &--align-right {
    justify-content: flex-end;
  }

  &--align-between {
    justify-content: space-between;
  }
}
</style>
