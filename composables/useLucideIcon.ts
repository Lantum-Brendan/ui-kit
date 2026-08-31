import { computed, isRef, type Ref, type Component } from 'vue';
import { lucideMap } from '../utils/icons';

/**
 * Resolves a Lucide icon component by string name with a fallback option.
 *
 * @param name The icon string name, or a Ref containing the name.
 * @param fallback Optional fallback component if the name is not found in LucideIcons.
 * @returns A computed ref resolving to the target Icon Component or fallback.
 */
export function useLucideIcon(
  name: Ref<string | undefined> | string | undefined,
  fallback?: Component
) {
  return computed<Component | undefined>(() => {
    const iconName = isRef(name) ? name.value : name;
    if (!iconName) return fallback;
    return (lucideMap as Record<string, Component>)[iconName] ?? fallback;
  });
}
