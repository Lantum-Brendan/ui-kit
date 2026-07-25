<template>
  <div class="t-card-action-menu">
    <button
      type="button"
      class="t-card-action-menu__trigger action-menu"
      :aria-expanded="isOpen"
      :aria-label="triggerLabel || moreLabel"
      @click.stop="isOpen = !isOpen"
    >
      <MoreVerticalIcon class="t-card-action-menu__icon" />
    </button>

    <div v-if="isOpen" class="t-card-action-menu__popover action-dropdown" @click.stop>
      <button
        v-for="item in computedItems"
        :key="item.action"
        type="button"
        :class="[
          't-card-action-menu__item dropdown-item',
          item.action,
          { 't-card-action-menu__item--danger': item.variant === 'danger' }
        ]"
        @click="handleAction(item.action)"
      >
        <component :is="item.icon" v-if="item.icon" class="t-card-action-menu__item-icon" />
        <PencilIcon v-else-if="item.action === 'edit'" class="t-card-action-menu__item-icon" />
        <TrashIcon v-else-if="item.action === 'delete'" class="t-card-action-menu__item-icon" />
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Component } from 'vue';
import {
  EllipsisVerticalIcon as MoreVerticalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';

interface MenuItem {
  action: string;
  label: string;
  icon?: Component;
  variant?: 'default' | 'danger';
}

const props = withDefaults(
  defineProps<{
    items?: MenuItem[];
    triggerLabel?: string;
    moreLabel?: string;
    editLabel?: string;
    deleteLabel?: string;
  }>(),
  {
    items: undefined,
    triggerLabel: 'More actions',
    moreLabel: 'More actions',
    editLabel: 'Edit',
    deleteLabel: 'Delete'
  }
);

const emit = defineEmits<{
  (e: 'action', key: string): void;
  (e: 'edit'): void;
  (e: 'delete'): void;
}>();

const isOpen = ref(false);

const computedItems = computed((): MenuItem[] => {
  if (props.items && props.items.length > 0) {
    return props.items;
  }
  return [
    { action: 'edit', label: props.editLabel },
    { action: 'delete', label: props.deleteLabel, variant: 'danger' }
  ];
});

const handleAction = (action: string) => {
  isOpen.value = false;
  emit('action', action);
  if (action === 'edit') emit('edit');
  if (action === 'delete') emit('delete');
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
