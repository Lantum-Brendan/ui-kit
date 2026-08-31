<template>
  <div
    v-if="shouldRender"
    v-show="active"
    :id="panelId"
    role="tabpanel"
    :aria-labelledby="tabId"
    :hidden="!active ? true : undefined"
    :tabindex="active ? 0 : undefined"
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
    id?: string;
    labelledBy?: string;
  }>(),
  {
    lazy: false,
    keepAlive: true,
    id: undefined,
    labelledBy: undefined
  }
);

const panelId = computed(() => props.id ?? `t-tab-panel-${props.value}`);
const tabId = computed(() => props.labelledBy ?? `t-tab-${props.value}`);

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
