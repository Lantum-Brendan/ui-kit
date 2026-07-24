<template>
  <div
    v-if="shouldRender"
    v-show="active"
    role="tabpanel"
    class="t-tab-panel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    value: string;
    activeValue: string;
    lazy?: boolean;
    keepAlive?: boolean;
  }>(),
  {
    lazy: false,
    keepAlive: true
  }
);

const active = computed(() => props.value === props.activeValue);
const hasBeenActive = ref(active.value);

watch(
  active,
  (val) => {
    if (val) hasBeenActive.value = true;
  },
  { immediate: true }
);

const shouldRender = computed(() => {
  if (!props.lazy) return true;
  if (props.keepAlive) return hasBeenActive.value;
  return active.value;
});
</script>

<style lang="scss" scoped>
.t-tab-panel {
  width: 100%;
}
</style>
