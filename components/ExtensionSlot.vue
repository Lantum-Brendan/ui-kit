<template>
  <DescriptorRenderer
    v-for="contribution in contributions"
    :key="contribution.key"
    :contribution="contribution"
    :resolve-component="resolveComponent"
    @action="$emit('action', $event)"
    @next="$emit('next')"
  />
</template>

<script setup lang="ts">
import DescriptorRenderer, { type SlotContribution } from './DescriptorRenderer.vue';
import type { Component } from 'vue';

const props = defineProps<{
  /** Contributions to render in this slot. Supplied by the host (was useExtensionSlots). */
  contributions: SlotContribution[];
  /** Optional component resolver for `ui.component` escape hatch. */
  resolveComponent?: (key: string | null | undefined) => Component | null;
}>();

defineEmits<{ action: [SlotContribution]; next: [] }>();
</script>
