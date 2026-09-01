<template>
  <button
    type="button"
    class="theme-toggle-btn"
    :title="isDark ? titleLight : titleDark"
    @click="toggleTheme"
  >
    <Sun v-if="isDark" class="theme-icon" />
    <Moon v-else class="theme-icon" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next';
import { useTheme } from '../composables/useTheme';

defineProps({
  titleLight: {
    type: String,
    default: 'Switch to light mode'
  },
  titleDark: {
    type: String,
    default: 'Switch to dark mode'
  }
});

const { isDark, toggleTheme } = useTheme();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid $border-light;
  background: $bg-white;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $bg-light;
    color: $primary;
    border-color: $primary;
  }
}

.theme-icon {
  width: 20px;
  height: 20px;
}
</style>
