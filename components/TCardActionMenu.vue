<template>
  <div class="t-card-action-menu">
    <button
      type="button"
      class="t-card-action-menu__trigger"
      :aria-expanded="isOpen"
      :aria-label="triggerLabel"
      @click.stop="isOpen = !isOpen"
    >
      <MoreVerticalIcon class="t-card-action-menu__icon" />
    </button>

    <div v-if="isOpen" class="t-card-action-menu__popover" @click.stop>
      <button
        v-for="item in items"
        :key="item.action"
        type="button"
        :class="[
          't-card-action-menu__item',
          { 't-card-action-menu__item--danger': item.variant === 'danger' }
        ]"
        @click="handleAction(item.action)"
      >
        <component :is="item.icon" v-if="item.icon" class="t-card-action-menu__item-icon" />
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component } from 'vue';
import { EllipsisVerticalIcon as MoreVerticalIcon } from '@heroicons/vue/24/outline';

interface MenuItem {
  action: string;
  label: string;
  icon?: Component;
  variant?: 'default' | 'danger';
}

withDefaults(
  defineProps<{
    items: MenuItem[];
    triggerLabel?: string;
  }>(),
  {
    triggerLabel: 'More actions'
  }
);

const emit = defineEmits<{
  (e: 'action', key: string): void;
}>();

const isOpen = ref(false);

const handleAction = (action: string) => {
  isOpen.value = false;
  emit('action', action);
};

const handleDocumentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.t-card-action-menu')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleDocumentClick);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocumentClick);
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-card-action-menu {
  position: relative;
  display: inline-block;

  &__trigger {
    background: transparent;
    border: none;
    cursor: pointer;
    color: $text-muted;
    padding: $spacing-1;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      color: $text-primary;
      background-color: $bg-gray;
    }
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__popover {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: $spacing-1;
    z-index: 100;
    min-width: 140px;
    background-color: $bg-white;
    border: 1px solid $border-color;
    border-radius: $radius-lg;
    box-shadow: $shadow-lg;
    padding: $spacing-1;
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    width: 100%;
    padding: $spacing-2 $spacing-3;
    border: none;
    background: transparent;
    font-size: $font-size-sm;
    color: $text-primary;
    cursor: pointer;
    border-radius: $radius-md;
    text-align: left;
    transition: background 0.15s ease;

    &:hover {
      background-color: $bg-gray;
    }

    &--danger {
      color: $error-color;

      &:hover {
        background-color: var(--color-error-light, #fee2e2);
      }
    }
  }

  &__item-icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
