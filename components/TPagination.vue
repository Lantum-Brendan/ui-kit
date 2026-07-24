<template>
  <div class="t-pagination">
    <div class="t-pagination__controls">
      <button
        class="t-pagination__btn"
        :disabled="currentPage <= 1"
        @click="$emit('page-change', currentPage - 1)"
      >
        <ChevronLeftIcon class="t-pagination__btn-icon" />
        <span v-if="showLabels">{{ prevLabel }}</span>
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        class="t-pagination__btn"
        :class="{ 't-pagination__btn--active': page === currentPage, 't-pagination__btn--ellipsis': page === '...' }"
        :disabled="page === '...'"
        @click="page !== '...' && $emit('page-change', page)"
      >
        {{ page }}
      </button>

      <button
        class="t-pagination__btn"
        :disabled="currentPage >= totalPages"
        @click="$emit('page-change', currentPage + 1)"
      >
        <span v-if="showLabels">{{ nextLabel }}</span>
        <ChevronRightIcon class="t-pagination__btn-icon" />
      </button>
    </div>

    <p v-if="entryText" class="t-pagination__info">{{ entryText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    totalEntries?: number;
    itemsPerPage?: number;
    maxVisible?: number;
    showLabels?: boolean;
    prevLabel?: string;
    nextLabel?: string;
    entryText?: string;
  }>(),
  {
    totalEntries: 0,
    itemsPerPage: 10,
    maxVisible: 5,
    showLabels: false,
    prevLabel: 'Previous',
    nextLabel: 'Next',
    entryText: ''
  }
);

defineEmits<{
  (e: 'page-change', page: number): void;
}>();

const visiblePages = computed((): (number | string)[] => {
  const pages: (number | string)[] = [];
  const max = props.maxVisible;
  const total = props.totalPages;
  let start = Math.max(1, props.currentPage - Math.floor(max / 2));
  const end = Math.min(total, start + max - 1);

  if (end - start + 1 < max) {
    start = Math.max(1, end - max + 1);
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total) {
    if (end < total - 1) pages.push('...');
    pages.push(total);
  }

  return pages;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: $spacing-3;
  padding: $spacing-3 0;

  &__controls {
    display: flex;
    align-items: center;
    gap: $spacing-1;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-1;
    min-width: 36px;
    height: 36px;
    padding: 0 $spacing-2;
    border: 1px solid $border-color;
    border-radius: $radius-lg;
    background-color: $bg-white;
    color: $text-primary;
    font-size: $font-size-sm;
    font-weight: $font-medium;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      border-color: $primary;
      color: $primary;
      background-color: $primary-lighter;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &--active {
      background-color: $primary;
      border-color: $primary;
      color: $text-inverse;
      font-weight: $font-bold;

      &:hover {
        background-color: $primary-hover;
        border-color: $primary-hover;
        color: $text-inverse;
      }
    }

    &--ellipsis {
      border: none;
      background: transparent;
      cursor: default;
      color: $text-muted;
    }
  }

  &__btn-icon {
    width: 16px;
    height: 16px;
  }

  &__info {
    font-size: $font-size-sm;
    color: $text-muted;
    margin: 0;
  }
}
</style>
