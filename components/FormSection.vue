<template>
  <div class="transaction-tabs">
    <div class="tab-buttons">
      <button
        class="tab-button tab-button--expense"
        :class="{ active: isExpenseSelected }"
        :disabled="props.isSubmitting"
        @click="selectExpense"
      >
        <ArrowUpTrayIcon class="tab-icon" />
        {{ labels.expense }}
      </button>
      <button
        class="tab-button tab-button--income"
        :class="{ active: isIncomeSelected }"
        :disabled="props.isSubmitting"
        @click="selectIncome"
      >
        <ArrowDownTrayIcon class="tab-icon" />
        {{ labels.income }}
      </button>
      <button
        class="tab-button tab-button--transfer"
        :class="{ active: isTransferSelected }"
        :disabled="props.isSubmitting"
        @click="selectTransfer"
      >
        <ArrowsRightLeftIcon class="tab-icon" />
        {{ labels.transfer }}
      </button>
    </div>

    <div class="tab-content">
      <slot
        :is-expense-selected="isExpenseSelected"
        :is-income-selected="isIncomeSelected"
        :is-transfer-selected="isTransferSelected"
        :editing-item="props.editingItem"
        :is-submitting="props.isSubmitting"
        :select-expense="selectExpense"
        :select-income="selectIncome"
        :select-transfer="selectTransfer"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, ArrowsRightLeftIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  editingItem: { type: Object, default: null },
  isSubmitting: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      expense: 'Expense',
      income: 'Income',
      transfer: 'Transfer'
    })
  }
});

const emit = defineEmits(['submit', 'transfer', 'tab-change']);

const isIncomeSelected = ref(false);
const isExpenseSelected = ref(true);
const isTransferSelected = ref(false);

const selectIncome = () => {
  isIncomeSelected.value = true;
  isExpenseSelected.value = false;
  isTransferSelected.value = false;
  emit('tab-change', 'income');
};

const selectExpense = () => {
  isExpenseSelected.value = true;
  isIncomeSelected.value = false;
  isTransferSelected.value = false;
  emit('tab-change', 'expense');
};

const selectTransfer = () => {
  isTransferSelected.value = true;
  isExpenseSelected.value = false;
  isIncomeSelected.value = false;
  emit('tab-change', 'transfer');
};

watch(
  () => props.editingItem,
  (item) => {
    if (!item) return;
    if (item.type === 'EXPENSE') {
      isExpenseSelected.value = true;
      isIncomeSelected.value = false;
      isTransferSelected.value = false;
    } else {
      isIncomeSelected.value = true;
      isExpenseSelected.value = false;
      isTransferSelected.value = false;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.transaction-tabs {
  width: 100%;
  max-width: 800px;
}

.tab-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid $border-color;

  @media (max-width: $breakpoint-sm) {
    gap: 0.25rem;
    margin-bottom: 1rem;
  }
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: $text-secondary;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: $radius-lg $radius-lg 0 0;

  @media (max-width: $breakpoint-md) {
    padding: 0.625rem 1.25rem;
    font-size: 0.95rem;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    gap: 0.25rem;
  }

  &:hover {
    background: $bg-slate;
    color: $primary;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.active {
    color: $primary;
    background: $primary-light;
    border-bottom-color: $primary;
  }

  &--expense:hover {
    color: $error-color;
  }

  &--expense.active {
    color: $error-color;
    background: rgba(var(--color-error-rgb), 0.1);
    border-bottom-color: $error-color;
  }

  &--transfer:hover {
    color: $info;
  }

  &--transfer.active {
    color: $info;
    background: rgba(var(--color-info-rgb), 0.1);
    border-bottom-color: $info;
  }
}

.tab-icon {
  width: 16px;
  height: 16px;
}

.tab-content {
  width: 100%;
}
</style>
