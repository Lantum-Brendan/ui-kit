<template>
  <header class="spreadsheet-header">
    <div class="spreadsheet-title">
      <TableCellsIcon class="icon" />
      <h2>{{ labels.title }}</h2>
      <span class="count">
        {{ fill(labels.rowCount, { count: rowCount }) }}
        <span v-if="isStreaming" class="loading-more">· {{ labels.loadingMore }}</span>
      </span>
    </div>
    <div class="spreadsheet-actions">
      <input
        :value="searchValue"
        type="search"
        class="search"
        :placeholder="labels.searchPlaceholder"
        @input="$emit('update:searchValue', $event.target.value)"
      />
      <button
        type="button"
        class="action-btn"
        :disabled="exportDisabled"
        :aria-label="labels.exportCsv"
        :title="labels.exportCsv"
        @click="$emit('export')"
      >
        <ArrowDownTrayIcon class="icon" />
      </button>
      <button type="button" class="close-btn" :aria-label="labels.close" @click="$emit('close')">
        <XMarkIcon class="icon" />
      </button>
    </div>
  </header>
  <div class="spreadsheet-toolbar">
    <button type="button" class="toolbar-btn toolbar-btn--primary" @click="$emit('add-row')">
      {{ labels.addRow ?? 'Add row' }}
    </button>
    <button
      v-if="hasSelection"
      type="button"
      class="toolbar-btn toolbar-btn--danger"
      @click="$emit('delete-selected')"
    >
      {{ labels.deleteSelected ?? 'Delete selected' }}
    </button>
  </div>
</template>

<script setup>
import { TableCellsIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { fill } from '../utils/fill';

defineProps({
  labels: { type: Object, required: true },
  rowCount: { type: Number, default: 0 },
  isStreaming: { type: Boolean, default: false },
  searchValue: { type: String, default: '' },
  hasSelection: { type: Boolean, default: false },
  exportDisabled: { type: Boolean, default: false }
});

defineEmits(['update:searchValue', 'export', 'close', 'add-row', 'delete-selected']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.spreadsheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid $border-color;
  background: $bg-slate;
  flex-shrink: 0;
}

.spreadsheet-title {
  display: flex;
  align-items: center;
  gap: 8px;

  h2 {
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-semibold;
  }

  .icon {
    width: 20px;
    height: 20px;
    color: $primary;
  }

  .count {
    font-size: $font-size-xs;
    color: $text-muted;
    margin-left: 6px;
  }
}

.spreadsheet-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search {
  width: 240px;
  padding: 6px 10px;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  background: $input-bg;
  color: $text-primary;
  font-size: $font-size-sm;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.15);
  }
}

.close-btn {
  background: transparent;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 6px;
  cursor: pointer;
  color: $text-muted;
  display: inline-flex;

  .icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: $primary;
    border-color: $primary-muted;
  }
}

.action-btn {
  background: transparent;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 6px;
  cursor: pointer;
  color: $text-muted;
  display: inline-flex;

  .icon {
    width: 16px;
    height: 16px;
  }

  &:hover:not(:disabled) {
    color: $primary;
    border-color: $primary-muted;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.loading-more {
  color: $primary;
  font-style: italic;
}

.spreadsheet-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid $border-color;
  background: $bg-white;
}

.toolbar-btn {
  padding: 6px 12px;
  border-radius: $radius-md;
  border: 1px solid $border-color;
  background: $bg-white;
  color: $text-primary;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  cursor: pointer;

  &:hover {
    border-color: $primary-muted;
    color: $primary;
  }

  &--primary {
    background: $primary;
    color: white;
    border-color: $primary;

    &:hover {
      background: $primary-hover;
      color: white;
    }
  }

  &--danger {
    color: $error-color;
    border-color: rgba(var(--color-error-rgb), 0.3);

    &:hover {
      background: rgba(var(--color-error-rgb), 0.08);
      color: $error-color;
    }
  }
}
</style>
