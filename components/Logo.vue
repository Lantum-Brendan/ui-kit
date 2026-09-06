<template>
  <img :src="src || logoUrl" :alt="alt" :class="['logo', `logo-${size}`]" />
</template>

<script setup>
import defaultLogoUrl from '../assets/logo.svg';

defineProps({
  src: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: 'Trakli Logo'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const logoUrl = defaultLogoUrl;
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

img.logo {
  display: block;
  height: auto;
  margin: 0;
  padding: 0;
  line-height: 1;
}

img.logo-small {
  width: 80px !important;
}

img.logo-medium {
  width: 120px !important;
}

img.logo-large {
  width: 195px !important;
  margin-bottom: $spacing-8 !important;
}
</style>
