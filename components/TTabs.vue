<template>
  <div class="tabs-container">
    <TTabList
      :model-value="activeTab"
      :tabs="tabs"
      :variant="variant"
      @update:model-value="$emit('update:activeTab', $event)"
    />
    <div class="tabs-content">
      <slot :name="activeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import TTabList from './TTabList.vue';

interface TabItem {
  id: string;
  label: string;
  icon?: Component;
  count?: number;
}

withDefaults(
  defineProps<{
    tabs: TabItem[];
    activeTab: string;
    variant?: 'pill' | 'underline' | 'indicator';
  }>(),
  {
    variant: 'pill'
  }
);

defineEmits<{
  (e: 'update:activeTab', id: string): void;
}>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.tabs-container {
  width: 100%;
}

.tabs-content {
  min-height: 200px;
  margin-top: $spacing-4;
}
</style>
