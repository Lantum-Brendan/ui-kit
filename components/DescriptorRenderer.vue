<template>
  <!-- Escape hatch: the host passed a real component for this contribution's ui.component. -->
  <component
    :is="resolved"
    v-if="resolved"
    :contribution="contribution"
    @next="$emit('next')"
  />

  <!-- Sidebar nav entry -->
  <NuxtLink
    v-else-if="variant === 'sidebar.nav'"
    :to="href || '#'"
    class="ext-nav-item"
  >
    <component :is="icon" class="ext-nav-icon" />
    <span class="ext-nav-label">{{ card?.title || integration.name }}</span>
  </NuxtLink>

  <!-- Onboarding step -->
  <div v-else-if="variant === 'onboarding.steps'" class="ext-onboarding">
    <div class="ext-onboarding-icon">
      <component :is="icon" />
    </div>
    <h2 class="ext-onboarding-title">
      {{ onboarding?.title || card?.title || integration.name }}
    </h2>
    <p v-if="onboarding?.description || card?.description" class="ext-onboarding-desc">
      {{ onboarding?.description || card?.description }}
    </p>
    <div class="ext-onboarding-actions">
      <TButton
        v-if="href"
        :to="href"
        :text="card?.cta || 'Open'"
        variant="outline"
        :full-width="false"
      />
      <TButton :text="'Continue'" :full-width="false" @click="$emit('next')" />
    </div>
  </div>

  <!-- Default: an integration card (settings.integrations, dashboard.widgets) -->
  <TCard v-else class="ext-card">
    <div class="ext-card-head">
      <span class="ext-card-icon"><component :is="icon" /></span>
      <h3 class="ext-card-title">{{ card?.title || integration.name }}</h3>
      <span v-if="!contribution.configured" class="ext-card-badge">{{ needsSetupLabel }}</span>
    </div>
    <p v-if="card?.description || integration.description" class="ext-card-desc">
      {{ card?.description || integration.description }}
    </p>
    <TButton
      v-if="card?.cta"
      :to="href || undefined"
      :text="card.cta"
      variant="outline"
      size="small"
      :full-width="false"
      @click="$emit('action', contribution)"
    />
  </TCard>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { lucideMap } from '../utils/icons';
import TCard from './TCard.vue';
import TButton from './TButton.vue';
import { useLucideIcon } from '../composables/useLucideIcon';

/**
 * Minimal structural types mirroring the host integration contribution shape.
 * Declared locally so the kit stays runtime-decoupled; a host SlotContribution
 * is structurally compatible when passed in.
 */
export interface IntegrationUiDescriptor {
  slots: string[];
  card?: { title?: string; cta?: string; description?: string; href?: string } | null;
  onboarding?: {
    step?: string;
    title?: string;
    description?: string;
    href?: string;
  } | null;
  component?: string | null;
  show_when_unconfigured?: boolean;
}
export interface Integration {
  key: string;
  name: string;
  description: string | null;
  icon: string | null;
  configured: boolean;
  [key: string]: unknown;
}
export interface SlotContribution {
  key: string;
  slot: string;
  integration: Integration;
  ui: IntegrationUiDescriptor;
  configured: boolean;
  [key: string]: unknown;
}

const props = defineProps<{
  contribution: SlotContribution;
  /**
   * Resolves a registered component for `ui.component` (the escape hatch).
   * Host supplies this (e.g. `useExtensionSlots().resolveComponent`); when
   * absent, the built-in card/nav/onboarding fallbacks render instead.
   */
  resolveComponent?: (key: string | null | undefined) => Component | null;
  /** Label for the unconfigured badge. */
  needsSetupLabel?: string;
}>();

defineEmits<{ next: []; action: [SlotContribution] }>();

const integration = computed(() => props.contribution.integration);
const ui = computed(() => props.contribution.ui);
const card = computed(() => ui.value.card);
const onboarding = computed(() => ui.value.onboarding);
const variant = computed(() => props.contribution.slot);
const href = computed(() => onboarding.value?.href || card.value?.href || null);
const resolved = computed(() =>
  props.resolveComponent ? props.resolveComponent(ui.value.component) : null
);

// Resolve the descriptor's icon name to a lucide component with a fallback.
const lucide = lucideMap as unknown as Record<string, Component>;
const icon = useLucideIcon(
  computed(() => integration.value.icon ?? undefined),
  lucide.Puzzle
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.ext-card-head {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  margin-bottom: $spacing-2;
}

.ext-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: $radius-lg;
  background: $primary-light;
  color: $primary;
  flex-shrink: 0;

  :deep(svg) {
    width: 20px;
    height: 20px;
  }
}

.ext-card-title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
}

.ext-card-badge {
  margin-left: auto;
  font-size: $font-size-xs;
  font-weight: $font-medium;
  color: $text-muted;
  background: $bg-gray;
  border-radius: 999px;
  padding: 2px 8px;
  flex-shrink: 0;
}

.ext-card-desc {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin: 0 0 $spacing-4;
}

.ext-onboarding {
  text-align: center;
}

.ext-onboarding-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto $spacing-4;
  border-radius: 50%;
  background: $primary-light;
  color: $primary;

  :deep(svg) {
    width: 28px;
    height: 28px;
  }
}

.ext-onboarding-title {
  font-size: $font-size-lg;
  font-weight: $font-semibold;
  color: $text-primary;
}

.ext-onboarding-desc {
  font-size: $font-size-base;
  color: $text-secondary;
  margin: $spacing-2 0 $spacing-6;
}

.ext-onboarding-actions {
  display: flex;
  gap: $spacing-3;
  justify-content: center;
}

.ext-nav-item {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-3;
  border-radius: $radius-md;
  color: $text-secondary;
  text-decoration: none;

  &:hover {
    background: $primary-light;
    color: $primary;
  }
}

.ext-nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
