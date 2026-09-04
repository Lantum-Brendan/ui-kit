<template>
  <TDropdown class="theme-selector">
    <template #trigger>
      <button class="icon-button" :aria-label="t('Theme')" :title="t('Theme')">
        <component :is="triggerIcon" class="icon" />
      </button>
    </template>

    <div class="theme-dropdown-inner">
      <div class="dropdown-header">
        <h3>{{ t('Theme') }}</h3>
      </div>
      <div class="theme-list">
        <TDropdownItem
          v-for="option in options"
          :key="option.value"
          class="theme-item"
          :class="{ active: theme === option.value }"
          @click="selectTheme(option.value)"
        >
          <component :is="option.icon" class="theme-icon" />
          <span class="theme-name">{{ t(option.label) }}</span>
          <Check v-if="theme === option.value" class="check-icon" />
        </TDropdownItem>
      </div>
    </div>
  </TDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Sun, Moon, Monitor, Check } from 'lucide-vue-next';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';
import { useTheme, type ThemeMode } from '../composables/useTheme';

const { t } = useI18n();
const { theme, isDark, setTheme } = useTheme();

const options: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
];

const triggerIcon = computed(() => {
  if (theme.value === 'system') return Monitor;
  return isDark.value ? Moon : Sun;
});

const selectTheme = (value: ThemeMode) => {
  setTheme(value);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.theme-selector {
  display: inline-block;
}

.icon {
  width: 16px;
  height: 16px;
  color: currentColor;
}

.theme-dropdown-inner {
  width: 220px;

  @media (max-width: $breakpoint-sm) {
    width: calc(100vw - 32px);
  }
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid $border-color;

  h3 {
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-semibold;
    color: $text-primary;
  }
}

.theme-list {
  padding: 0.25rem 0;
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &.active {
    background: rgba(var(--color-primary-rgb), 0.08);
    color: $primary;
    font-weight: $font-semibold;

    .theme-icon {
      color: $primary;
    }
  }

  .theme-icon {
    width: 18px;
    height: 18px;
    color: $text-secondary;
  }

  .theme-name {
    flex: 1;
    font-size: $font-size-sm;
  }

  .check-icon {
    width: 16px;
    height: 16px;
    color: $primary;
  }
}
</style>
