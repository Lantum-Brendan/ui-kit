<template>
  <div class="separator">
    <TDivider orientation="horizontal" class="divider-line" />
    <span class="text">OR</span>
    <TDivider orientation="horizontal" class="divider-line" />
  </div>
</template>

<script setup>
import TDivider from '../TDivider.vue';
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: $text-muted;

  .divider-line {
    flex-grow: 1;
    background-color: $border-light;
  }

  .text {
    padding: 0 1rem;
    font-size: $font-size-sm;
    font-weight: $font-medium;
  }
}
</style>
