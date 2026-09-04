<template>
  <DescriptorRenderer
    v-for="contribution in contributions"
    :key="contribution.key"
    :contribution="contribution"
    @action="$emit('action', $event)"
  />
  <slot v-if="!contributions.length" />
</template>

<script setup lang="ts">
import DescriptorRenderer from './DescriptorRenderer.vue';
import type { SlotContribution, ExtensionSlot } from '../../types/integration';

withDefaults(defineProps<{ name?: ExtensionSlot; contributions?: SlotContribution[] }>(), {
  name: undefined,
  contributions: () => []
});
defineEmits<{ action: [SlotContribution] }>();
</script>
