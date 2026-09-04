<template>
  <div class="view-toggle">
    <TButton
      type="button"
      :variant="modelValue === 'table' ? 'primary' : 'secondary'"
      :full-width="false"
      class="toggle-btn"
      :class="{ active: modelValue === 'table' }"
      :title="tableTitle"
      @click="$emit('update:modelValue', 'table')"
    >
      <LayoutList :size="18" />
    </TButton>
    <TButton
      type="button"
      :variant="modelValue === 'cards' ? 'primary' : 'secondary'"
      :full-width="false"
      class="toggle-btn"
      :class="{ active: modelValue === 'cards' }"
      :title="cardsTitle"
      @click="$emit('update:modelValue', 'cards')"
    >
      <LayoutGrid :size="18" />
    </TButton>
  </div>
</template>

<script setup>
import { LayoutList, LayoutGrid } from 'lucide-vue-next';
import TButton from './TButton.vue';

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
  border-radius: 0;
  padding: 6px 10px;
  min-height: auto;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:not(:last-child) {
    border-right: 1px solid $border-light;
  }
}
</style>
