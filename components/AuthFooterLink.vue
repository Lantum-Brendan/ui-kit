<template>
  <div class="auth-footer-link">
    <TDivider orientation="horizontal" class="footer-divider" />
    <div class="footer-text">
      {{ text }} <a :href="to">{{ linkText }}</a>
    </div>
  </div>
</template>

<script setup>
import TDivider from './TDivider.vue';

defineProps({
  text: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.auth-footer-link {
  margin-top: $spacing-6;

  .footer-divider {
    background-color: $border-light;
  }

  .footer-text {
    text-align: center;
    font-size: $font-size-sm;
    padding-top: $spacing-5;
    color: $text-secondary;
  }

  a {
    color: $primary;
    font-weight: $font-semibold;
    text-decoration: none;
    margin-left: $spacing-1;
    transition: $transition-base;

    &:hover {
      text-decoration: underline;
      color: $primary-hover;
    }
  }
}
</style>
