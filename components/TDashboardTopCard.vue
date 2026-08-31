<template>
  <section class="hero surface surface--brand">
    <div class="hero-ambient" aria-hidden="true">
      <BarChart3 class="amb a1" :size="72" :stroke-width="1" />
      <Wallet class="amb a2" :size="64" :stroke-width="1" />
      <Coins class="amb a3" :size="56" :stroke-width="1" />
      <TrendingUp class="amb a4" :size="60" :stroke-width="1" />
      <PieChart class="amb a5" :size="52" :stroke-width="1" />
    </div>

    <div class="hero-body">
      <div class="hero-greeting">
        <h2 class="hero-title">{{ labels.overview }}</h2>
        <p class="hero-sub">{{ periodSubtitle }}</p>
      </div>

      <div v-if="showFilters" class="hero-controls">
        <slot name="wallet-selector" />
        <div class="hero-chips">
          <button
            v-for="period in periods.slice(0, 3)"
            :key="period.value"
            class="chip"
            :class="{ 'chip--active': activePeriod === period.value && !isCustomActive }"
            @click="$emit('period-change', period.value)"
          >
            {{ period.label }}
          </button>
          <button
            class="chip chip--custom"
            :class="{ 'chip--active': isCustomActive }"
            @click="$emit('toggle-custom')"
          >
            <span>{{ labels.custom }}</span>
            <ChevronDown class="chip-icon" :class="{ 'chip-icon--rotated': customOpen }" />
          </button>
        </div>
      </div>
    </div>

    <slot name="filter-modal" />
  </section>
</template>

<script setup>
import { ChevronDown, BarChart3, Wallet, Coins, TrendingUp, PieChart } from 'lucide-vue-next';

const props = defineProps({
  showFilters: {
    type: Boolean,
    default: true
  },
  activePeriod: {
    type: String,
    default: 'current_month'
  },
  isCustomActive: {
    type: Boolean,
    default: false
  },
  customOpen: {
    type: Boolean,
    default: false
  },
  periodSubtitle: {
    type: String,
    default: ''
  },
  periods: {
    type: Array,
    default: () => [
      { value: 'current_month', label: 'This month' },
      { value: 'last_month', label: 'Last month' },
      { value: 'current_year', label: 'This year' }
    ]
  },
  labels: {
    type: Object,
    default: () => ({
      overview: 'Overview',
      custom: 'Custom'
    })
  }
});

defineEmits(['period-change', 'toggle-custom']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.hero {
  position: relative;
  width: 100%;
  border-radius: 18px;
  padding: 1rem 1.25rem;
  overflow: hidden;
  border: 1px solid $border-light;
  box-shadow: $elevation-1;
}

.hero-ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  .amb {
    position: absolute;
    color: var(--surface-deep, var(--color-primary-dark));
    opacity: 0.07;
  }
  .a1 { top: -10px; right: 6%; transform: rotate(-10deg); }
  .a2 { bottom: -14px; right: 22%; transform: rotate(8deg); }
  .a3 { top: 20%; right: 38%; transform: rotate(10deg); }
  .a4 { bottom: -8px; left: 6%; transform: rotate(-8deg); }
  .a5 { top: -8px; left: 30%; transform: rotate(12deg); }
}

.hero-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;

  @media (min-width: $breakpoint-sm) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-3;
  }
}

.hero-greeting {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.hero-title {
  margin: 0;
  color: var(--surface-ink, var(--color-text-primary));
  font-size: $font-size-lg;
  font-weight: $font-bold;
  letter-spacing: -0.015em;
  line-height: 1.2;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-base;
  }
}

.hero-sub {
  margin: 0;
  color: var(--surface-ink, var(--color-text-primary));
  opacity: 0.7;
  font-size: $font-size-sm;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-xs;
  }
}

.hero-controls {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  flex-wrap: wrap;

  @media (min-width: $breakpoint-sm) {
    justify-content: flex-end;
  }
}

.hero-chips {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 5px;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  border-radius: 999px;
  backdrop-filter: blur(10px);
  box-shadow: $elevation-1;
  width: fit-content;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 14px;
  border: none;
  background: transparent;
  color: var(--surface-deep, var(--color-primary-dark));
  border-radius: 999px;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color $duration-fast $easing-standard,
    color $duration-fast $easing-standard;

  &:hover:not(.chip--active) {
    background: var(--hover-overlay);
    color: var(--surface-ink, var(--color-text-primary));
  }

  &--active {
    background: var(--color-primary);
    color: var(--color-text-inverse);
  }
}

.chip-icon {
  width: 14px;
  height: 14px;
  transition: transform $duration-fast $easing-standard;

  &--rotated {
    transform: rotate(180deg);
  }
}
</style>
