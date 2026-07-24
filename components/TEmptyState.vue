<template>
  <div class="t-empty-state">
    <div v-if="icon || $slots.icon" class="t-empty-state__icon-wrap">
      <slot name="icon">
        <component :is="icon" class="t-empty-state__icon" />
      </slot>
    </div>
    <h3 v-if="title" class="t-empty-state__title">{{ title }}</h3>
    <p v-if="description" class="t-empty-state__description">{{ description }}</p>
    <div v-if="$slots.action" class="t-empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon?: Component;
  }>(),
  {
    title: '',
    description: '',
    icon: undefined
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: $spacing-12 $spacing-6;
  gap: $spacing-3;

  &__icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: $bg-gray;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    margin-bottom: $spacing-2;
  }

  &__icon {
    width: 28px;
    height: 28px;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-semibold;
    color: $text-primary;
    margin: 0;
  }

  &__description {
    font-size: $font-size-sm;
    color: $text-muted;
    max-width: 380px;
    margin: 0;
    line-height: 1.6;
  }

  &__action {
    margin-top: $spacing-2;
  }
}
</style>
