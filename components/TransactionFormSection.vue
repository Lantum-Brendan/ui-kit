<template>
  <div class="form-section">
    <slot />
    <TipsSection :page-name="pageName" />
  </div>
</template>

<script setup>
defineProps({
  pageName: {
    type: String,
    default: 'Transaction'
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.form-section {
  display: flex;
  margin-top: 20px;
  gap: 60px;
  width: 100%;
  padding: 0;

  @media (max-width: $breakpoint-lg) {
    gap: 40px;
  }

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: 30px;
  }

  @media (max-width: $breakpoint-sm) {
    gap: 20px;
  }
}
</style>
