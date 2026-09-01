<template>
  <div class="view-toggle">
    <button
      type="button"
      class="toggle-btn"
      :class="{ active: modelValue === 'table' }"
      :title="tableTitle"
      @click="$emit('update:modelValue', 'table')"
    >
      <LayoutList :size="18" />
    </button>
    <button
      type="button"
      class="toggle-btn"
      :class="{ active: modelValue === 'cards' }"
      :title="cardsTitle"
      @click="$emit('update:modelValue', 'cards')"
    >
      <LayoutGrid :size="18" />
    </button>
  </div>
</template>

<script setup>
import { LayoutList, LayoutGrid } from 'lucide-vue-next';

defineProps({
  modelValue: {
    type: String,
    default: 'table',
    validator: (value) => ['table', 'cards'].includes(value)
  },
  tableTitle: {
    type: String,
    default: 'Table view'
  },
  cardsTitle: {
    type: String,
    default: 'Card view'
  }
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.view-toggle {
  display: inline-flex;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  overflow: hidden;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background: $bg-white;
  border: none;
  cursor: pointer;
  color: $text-muted;
  transition: all 0.2s ease;

  &:not(:last-child) {
    border-right: 1px solid $border-light;
  }

  &:hover:not(.active) {
    background: $bg-gray;
    color: $text-secondary;
  }

  &.active {
    background: $primary;
    color: white;
  }
}
</style>
