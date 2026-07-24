<template>
  <TTabList
    :model-value="modelValue"
    :tabs="formattedTabs"
    variant="pill"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
import { computed } from 'vue';
import TTabList from './TTabList.vue';

const props = defineProps({
  modelValue: { type: String, required: true },
  tabs: { type: Array, required: true }
});

defineEmits(['update:modelValue']);

const formattedTabs = computed(() =>
  props.tabs.map((tab) => ({
    id: tab.value || tab.id,
    label: tab.label,
    icon: tab.icon,
    count: tab.count
  }))
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
</style>
