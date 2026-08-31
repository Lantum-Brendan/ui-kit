<template>
  <div class="entity-list">
    <div v-if="!hideHeader" class="header-row">
      <h1>{{ fill(allItemsLabel, { items: pageNamePlural }) }}</h1>
      <SearchInput
        v-model="internalSearchQuery"
        :placeholder="fill(searchPlaceholder, { items: pageNamePlural.toLowerCase() })"
      />
    </div>

    <div class="table-wrapper">
      <div class="table-scroll">
        <table class="content-table" :class="{ 'expense-table': headerType === 'expense' }">
          <thead>
            <tr>
              <th
                v-for="col in computedColumns"
                :key="col.key"
                :style="col.width ? { width: col.width } : {}"
                :class="[`col-${col.key}`, col.align ? `text-${col.align}` : '']"
              >
                {{ col.label }}
              </th>
              <th class="col-action">{{ actionLabel }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="entity in paginatedEntities"
              :key="entity.id"
              class="entity-row"
              :class="{ 'is-default': String(entity.id) === defaultItemId }"
            >
              <td
                v-for="col in computedColumns"
                :key="col.key"
                :class="[`col-${col.key}`, col.align ? `text-${col.align}` : '']"
              >
                <template v-if="col.key === 'name'">
                  <div class="name-cell">
                    <component :is="getIcon(entity)" v-if="getIcon(entity)" class="entity-icon" />
                    <span class="name-text">{{ entity.name }}</span>
                    <span v-if="String(entity.id) === defaultItemId" class="default-badge">
                      {{ defaultLabel }}
                    </span>
                  </div>
                </template>
                <template v-else-if="col.render">
                  {{ col.render(entity[col.key], entity) }}
                </template>
                <template v-else>
                  {{ getCellValue(entity, col.key) }}
                </template>
              </td>
              <td class="col-action">
                <div class="entity-actions">
                  <button
                    class="action-button edit"
                    :title="fill(editTitle, { item: pageName })"
                    @click="$emit('edit', entity)"
                  >
                    <LucideEdit />
                  </button>
                  <button
                    class="action-button delete"
                    :title="fill(deleteTitle, { item: pageName })"
                    @click="$emit('delete', entity)"
                  >
                    <LucideTrash />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ContentTablePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :per-page="perPage"
        :previous-page-label="previousPageLabel"
        :next-page-label="nextPageLabel"
        :show-label="showLabel"
        :per-page-label="perPageLabel"
        @update:current-page="currentPage = $event"
        @update:per-page="perPage = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  Edit as LucideEdit,
  Trash as LucideTrash,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';
import { lucideMap } from '../utils/icons';
import SearchInput from './SearchInput.vue';
import ContentTablePagination from './ContentTablePagination.vue';
import { fill } from '../utils/fill';

const props = defineProps({
  entities: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  pageName: {
    type: String,
    required: true
  },
  pageNamePlural: {
    type: String,
    required: true
  },
  headerType: {
    type: String,
    default: 'default'
  },
  defaultItemId: {
    type: String,
    default: null
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  searchQuery: {
    type: String,
    default: ''
  },
  allItemsLabel: {
    type: String,
    default: 'All {items}'
  },
  searchPlaceholder: {
    type: String,
    default: 'Search {items}...'
  },
  actionLabel: {
    type: String,
    default: 'Action'
  },
  defaultLabel: {
    type: String,
    default: 'Default'
  },
  editTitle: {
    type: String,
    default: 'Edit {item}'
  },
  deleteTitle: {
    type: String,
    default: 'Delete {item}'
  },
  previousPageLabel: {
    type: String,
    default: 'Previous page'
  },
  nextPageLabel: {
    type: String,
    default: 'Next page'
  },
  showLabel: {
    type: String,
    default: 'Show'
  },
  perPageLabel: {
    type: String,
    default: 'per page'
  }
});

defineEmits(['edit', 'delete', 'item-add-complete']);



const defaultColumns = computed(() => [
  { key: 'name', label: `${props.pageName} Name` },
  { key: 'description', label: `${props.pageName} Description` }
]);

const computedColumns = computed(() => props.columns || defaultColumns.value);

const getIcon = (entity) => {
  const iconValue = entity.icon?.path || entity.icon?.content || entity.icon;
  if (!iconValue) return null;
  return lucideMap[iconValue] || lucideMap.Box;
};

const getCellValue = (entity, key) => {
  if (key.includes('.')) {
    return key.split('.').reduce((obj, k) => obj?.[k], entity) ?? '';
  }
  return entity[key] ?? '';
};

const internalSearchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const effectiveSearchQuery = computed(() =>
  props.hideHeader ? props.searchQuery : internalSearchQuery.value
);

const filteredEntities = computed(() => {
  if (!effectiveSearchQuery.value) return props.entities;
  const query = effectiveSearchQuery.value.toLowerCase();
  return props.entities.filter(
    (entity) =>
      entity.name?.toLowerCase().includes(query) ||
      entity.description?.toLowerCase().includes(query)
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredEntities.value.length / perPage.value))
);

const paginatedEntities = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredEntities.value.slice(start, start + perPage.value);
});

// Reset to first page when search changes
watch(effectiveSearchQuery, () => {
  currentPage.value = 1;
});

// Ensure current page is valid when perPage changes
watch(perPage, () => {
  const maxPage = Math.max(1, Math.ceil(filteredEntities.value.length / perPage.value));
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage;
  }
});

</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.entity-list {
  width: 100%;
  box-sizing: border-box;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: $bg-white;
  gap: 1rem;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  h1 {
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-medium;
    color: $text-primary;

    @media (max-width: $breakpoint-md) {
      font-size: $font-size-sm;
    }

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-sm;
    }
  }
}

.table-wrapper {
  width: 100%;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: 12px;
  box-shadow: $elevation-1;
  overflow: hidden;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;

  thead {
    tr {
      background: $primary-light;
    }

    th {
      color: $primary-dark;
      font-weight: $font-bold;
      text-align: left;
      padding: 8px 16px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
      border-bottom: 1px solid $border-light;

      &:first-child {
        padding-left: 20px;
      }

      &.text-right {
        text-align: right;
      }

      &.text-center {
        text-align: center;
      }
    }
  }

  &.expense-table thead tr {
    background: rgba(var(--color-expense-rgb), 0.12);

    th {
      color: var(--color-expense);
    }
  }

  tbody {
    background: $bg-white;

    .entity-row {
      background: $bg-white;
      transition: background-color $duration-fast $easing-standard;

      &:hover {
        background: rgba(var(--color-primary-rgb), 0.04);
      }

      &.is-default {
        background: rgba(var(--color-success-rgb), 0.08);

        &:hover {
          background: rgba(var(--color-success-rgb), 0.12);
        }
      }

      &:last-child td {
        border-bottom: none;
      }

      td {
        padding: 6px 16px;
        border-bottom: 1px solid $border-light;
        font-size: $font-size-sm;
        vertical-align: middle;
        line-height: 1.4;

        &:first-child {
          padding-left: 20px;
        }

        &.text-right {
          text-align: right;
        }

        &.text-center {
          text-align: center;
        }
      }
    }
  }
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.entity-icon {
  width: 20px;
  height: 20px;
  color: $primary;
  flex-shrink: 0;
}

.name-text {
  font-weight: $font-medium;
  color: $text-primary;
}

.default-badge {
  display: inline-flex;
  align-items: center;
  background: $primary;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.col-action {
  text-align: right;
  white-space: nowrap;
  width: 96px;
}

.content-table th.col-action,
.content-table td.col-action {
  padding-right: 20px;
}

.entity-actions {
  display: inline-flex;
  gap: 4px;
  justify-content: flex-end;
  align-items: center;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 6px;
  border-radius: $radius-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 28px;
  height: 28px;

  svg {
    width: 16px;
    height: 16px;
    color: $primary;
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: rgba(var(--color-primary-rgb), 0.1);

    svg {
      color: $primary-dark;
    }
  }

  &.delete {
    svg {
      color: $error-color;
    }

    &:hover svg {
      color: $error-dark;
    }
  }
}






// List transition animations
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
