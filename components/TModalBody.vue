<template>
  <div class="t-modal-body">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-modal-body {
  padding: $spacing-6;
  max-height: 70vh;
  overflow-y: auto;
  color: $text-primary;
  font-size: $font-size-base;
  line-height: 1.5;
}
</style>
