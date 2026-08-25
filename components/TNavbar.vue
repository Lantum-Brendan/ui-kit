<template>
  <div class="navbar">
    <div class="navbar-left">
      <HamburgerMenu v-if="isMobile" :is-open="isSidebarOpen" @toggle="$emit('toggle-sidebar')" />
    </div>
    <div class="navbar-right">
      <div class="navbar-actions">
        <button
          type="button"
          class="icon-button add-transaction-btn"
          :aria-label="labels.addTransaction"
          :title="labels.addTransaction"
          @click="$emit('add-transaction')"
        >
          <Plus class="icon" />
        </button>
        <slot name="language-selector">
          <LanguageSelector />
        </slot>
        <slot name="theme-selector">
          <ThemeSelector />
        </slot>
        <slot name="notifications" />
        <button
          class="icon-button info-btn"
          :aria-label="labels.openLearningModal"
          :title="labels.learnTitle"
          @click="$emit('open-learning')"
        >
          <Info class="icon" />
        </button>
      </div>
      <div class="avatar-container">
        <slot name="avatar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, Info } from 'lucide-vue-next';
import HamburgerMenu from './HamburgerMenu.vue';
import LanguageSelector from './LanguageSelector.vue';
import ThemeSelector from './ThemeSelector.vue';

defineProps({
  isMobile: { type: Boolean, default: false },
  isSidebarOpen: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      addTransaction: 'Add transaction',
      openLearningModal: 'Open learning modal',
      learnTitle: 'Learn how to use Trakli'
    })
  }
});

defineEmits(['toggle-sidebar', 'add-transaction', 'open-learning']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $navbar-height;
  padding: 0 2rem;
  background-color: $bg-gray;
  border-bottom: 1px solid $border-color;
  position: fixed;
  top: 0;
  right: 0;
  z-index: $z-index-sticky;
  transition: left 0.3s ease;

  @media (min-width: $breakpoint-md) {
    left: $sidebar-width;
    padding: 0 2rem;
  }

  @media (max-width: calc($breakpoint-md - 1px)) {
    left: 0;
    padding: 0 1rem;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 0 0.75rem;
  }

  .navbar-left {
    display: flex;
    align-items: center;

    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;

    @media (max-width: 768px) {
      gap: 0.75rem;
    }
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .avatar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
  }

  .add-transaction-btn {
    text-decoration: none !important;

    &:hover {
      text-decoration: none !important;
    }
  }

  .info-btn {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      width: 8px;
      height: 8px;
      background: $primary;
      border-radius: 50%;
      border: 2px solid $bg-gray;
    }
  }
}
</style>
