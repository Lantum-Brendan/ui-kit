<template>
  <button
    type="button"
    class="theme-toggle-btn"
    :title="isDark ? labels.switchToLightMode : labels.switchToDarkMode"
    @click="toggleTheme"
  >
    <Sun v-if="isDark" class="theme-icon" />
    <Moon v-else class="theme-icon" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next';

const props = defineProps({
  isDark: { type: Boolean, default: false },
  toggleTheme: { type: Function, required: true },
  labels: {
    type: Object,
    default: () => ({
      switchToLightMode: 'Switch to light mode',
      switchToDarkMode: 'Switch to dark mode'
    })
  }
});
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
