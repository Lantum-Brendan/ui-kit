import { markRaw, ref } from 'vue';
import type { Component } from 'vue';

// Components a plugin Nuxt layer registers for a slot key (the escape hatch).
const componentRegistry = ref<Record<string, Component>>({});

export const useExtensionSlots = () => {
  /**
   * Register a real component for a slot key, used when a descriptor sets
   * `ui.component`. Called from a plugin Nuxt layer.
   */
  const registerComponent = (slotKey: string, component: Component): void => {
    componentRegistry.value = {
      ...componentRegistry.value,
      [slotKey]: markRaw(component)
    };
  };

  const resolveComponent = (slotKey: string | null | undefined): Component | null =>
    slotKey ? (componentRegistry.value[slotKey] ?? null) : null;

  return {
    registerComponent,
    resolveComponent
  };
};
