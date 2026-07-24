<template>
  <section class="categories-tab">
    <TSectionHeader
      :eyebrow="labels.categories"
      :title="labels.whereThings"
      :subtitle="labels.incomeOnOneSide"
    >
      <template #actions>
        <div class="search-wrap">
          <Search :size="14" class="search-ico" />
          <input
            v-model="query"
            type="text"
            class="search-input"
            :placeholder="labels.filterByName"
          />
        </div>
      </template>
    </TSectionHeader>

    <div class="grid">
      <div class="col col--income">
        <CategoryRanking
          :title="labels.incomeCategories"
          :subtitle="fill(labels.nIncome, { n: filteredIncome.length })"
          :buckets="filteredIncome"
          :show-delta="compareEnabled"
          :currency="currency"
          :formatter="formatter"
          @drill="(b) => $emit('drill', { ...b, kind: 'income' })"
        />
      </div>
      <div class="col col--expense">
        <CategoryRanking
          :title="labels.expenseCategories"
          :subtitle="fill(labels.nExpense, { n: filteredExpense.length })"
          :buckets="filteredExpense"
          :show-delta="compareEnabled"
          :currency="currency"
          :formatter="formatter"
          @drill="(b) => $emit('drill', { ...b, kind: 'expense' })"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search } from 'lucide-vue-next';
import CategoryRanking from './CategoryRanking.vue';
import TSectionHeader from './TSectionHeader.vue';
import { fill } from '../utils/fill';

const props = defineProps({
  incomeCategories: { type: Array, required: true },
  expenseCategories: { type: Array, required: true },
  compareEnabled: { type: Boolean, default: true },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` },
  labels: {
    type: Object,
    default: () => ({
      categories: 'Categories',
      whereThings: 'Where things come from and go to',
      incomeOnOneSide: 'Income on one side, expense on the other. Click any row to drill in.',
      filterByName: 'Filter by name',
      incomeCategories: 'Income categories',
      expenseCategories: 'Expense categories',
      nIncome: '{n} categories with income in this period',
      nExpense: '{n} categories with spending in this period'
    })
  }
});

defineEmits(['drill']);

const query = ref('');

const matches = (name) =>
  !query.value.trim() || name.toLowerCase().includes(query.value.trim().toLowerCase());

const filteredIncome = computed(() => props.incomeCategories.filter((b) => matches(b.name)));
const filteredExpense = computed(() => props.expenseCategories.filter((b) => matches(b.name)));
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.categories-tab {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: $spacing-3;
  flex-wrap: wrap;
}

.eyebrow {
  display: none;
}

.title {
  font-size: 1.25rem;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
  letter-spacing: -0.01em;
}

.sub {
  font-size: $font-size-sm;
  color: $text-muted;
  margin: 4px 0 0;
}

.search-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.search-ico {
  position: absolute;
  left: 12px;
  color: $text-muted;
  pointer-events: none;
}

.search-input {
  width: 220px;
  height: 36px;
  padding: 0 14px 0 32px;
  border-radius: 999px;
  border: 1px solid $border-color;
  background: $bg-white;
  color: $text-primary;
  font-size: $font-size-sm;
  outline: none;
  transition: $transition-fast;

  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.12);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-4;

  @media (min-width: $breakpoint-xl) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
