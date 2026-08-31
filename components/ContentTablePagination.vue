<template>
  <div class="pagination-row">
    <div class="pagination-controls">
      <button :disabled="currentPage === 1" class="pagination-button pagination-button--nav" :class="{ disabled: currentPage === 1 }" :aria-label="previousPageLabel" @click="$emit('update:currentPage', currentPage - 1)">
        <ChevronLeft :size="16" />
      </button>
      <button v-for="page in visiblePages" :key="page" class="pagination-button" :class="{ active: page === currentPage, ellipsis: page === '...' }" @click="$emit('update:currentPage', typeof page === 'number' ? page : currentPage)">{{ page }}</button>
      <button :disabled="currentPage === totalPages" class="pagination-button pagination-button--nav" :class="{ disabled: currentPage === totalPages }" :aria-label="nextPageLabel" @click="$emit('update:currentPage', currentPage + 1)">
        <ChevronRight :size="16" />
      </button>
    </div>
    <div class="page-info">
      <span>{{ showLabel }}</span>
      <select :value="perPage" class="per-page-select" @change="$emit('update:perPage', Number($event.target.value))">
        <option value="10">10</option><option value="25">25</option><option value="50">50</option>
      </select>
      <span>{{ perPageLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  perPage: { type: Number, required: true },
  previousPageLabel: { type: String, default: 'Previous page' },
  nextPageLabel: { type: String, default: 'Next page' },
  showLabel: { type: String, default: 'Show' },
  perPageLabel: { type: String, default: 'per page' }
});
defineEmits(['update:currentPage', 'update:perPage']);

const visiblePages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(start + 2, total - 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
  }
  return pages;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.pagination-row{display:flex;justify-content:space-between;align-items:center;padding:$spacing-3 $spacing-4;background-color:$bg-white;border-top:1px solid $border-light;gap:$spacing-3;@media(max-width:$breakpoint-md){flex-direction:column-reverse;gap:$spacing-2;padding:$spacing-3}@media(max-width:$breakpoint-sm){flex-direction:row;justify-content:space-between;padding:$spacing-2;gap:$spacing-2;flex-wrap:wrap}}
.pagination-controls{display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;justify-content:center;@media(max-width:$breakpoint-md){order:2;width:100%}@media(max-width:$breakpoint-sm){gap:0.25rem;order:unset;width:auto;flex:1;justify-content:center}}
.pagination-button{padding:0 $spacing-3;color:$text-secondary;background:transparent;border:none;border-radius:8px;cursor:pointer;transition:background-color $duration-fast $easing-standard,color $duration-fast $easing-standard;font-size:$font-size-sm;min-width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;font-weight:$font-semibold;font-variant-numeric:tabular-nums;@media(max-width:$breakpoint-sm){min-width:28px;height:28px;font-size:$font-size-xs}&:hover:not(.disabled):not(.ellipsis):not(.active){background:$bg-light;color:$text-primary}&:focus-visible{outline:2px solid $primary;outline-offset:2px}&.active{background:$primary-light;color:$primary}&--nav{color:$text-muted}&.disabled{opacity:0.35;cursor:not-allowed}&.ellipsis{background:transparent;cursor:default;pointer-events:none;color:$text-muted;padding:0 4px;min-width:auto}}
.page-info{display:flex;align-items:center;gap:0.5rem;color:$text-muted;font-size:0.875rem;white-space:nowrap;@media(max-width:$breakpoint-md){order:1;justify-content:center}@media(max-width:$breakpoint-sm){font-size:0.75rem;gap:0.25rem;order:unset;flex-shrink:0}}
.per-page-select{padding:0.375rem 1.75rem 0.375rem 0.75rem;border:1px solid $border-medium;border-radius:8px;background:$bg-white;color:$text-secondary;font-size:$font-size-sm;font-weight:$font-semibold;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-position:right 0.5rem center;background-repeat:no-repeat;background-size:1.2em 1.2em;min-width:70px;height:32px;transition:border-color $duration-fast $easing-standard,box-shadow $duration-fast $easing-standard;&:hover{border-color:$text-muted}&:focus{outline:none;border-color:$primary;box-shadow:0 0 0 3px rgba(var(--color-primary-rgb),0.18)}@media(max-width:$breakpoint-sm){font-size:0.7rem;padding:0.125rem 1.25rem 0.125rem 0.375rem;height:28px;min-width:45px;border-radius:$radius-md}}
</style>
