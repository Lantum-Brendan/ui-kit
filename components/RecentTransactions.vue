<template>
  <div class="recent-transactions">
    <Receipt class="card-glyph" :size="128" :stroke-width="1" aria-hidden="true" />
    <div class="header">
      <h3 class="title">{{ labels.recentTransactions }}</h3>
      <button type="button" class="view-all-btn" @click="$emit('view-all')">
        {{ labels.viewAll }}
      </button>
    </div>

    <div v-if="recentTransactions.length === 0" class="empty-state">
      <p>{{ labels.noTransactionsYet }}</p>
    </div>

    <div v-else class="transaction-list">
      <div
        v-for="txn in recentTransactions"
        :key="txn.id"
        class="transaction-row"
        @click="$emit('click-txn', txn)"
      >
        <div class="txn-icon" :class="txn.type === 'INCOME' ? 'income' : 'expense'">
          <ArrowDownLeft v-if="txn.type === 'INCOME'" />
          <ArrowUpRight v-else />
        </div>
        <div class="txn-details">
          <span class="txn-party">{{ txn.party }}</span>
          <span class="txn-category">{{ txn.category }}</span>
        </div>
        <div class="txn-right">
          <span class="txn-amount" :class="txn.type === 'INCOME' ? 'income' : 'expense'">
            {{ txn.type === 'INCOME' ? '+' : '-' }}{{ txn.amount }}
          </span>
          <span class="txn-time">{{ formatRelativeTime(txn.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowDownLeft, ArrowUpRight, Receipt } from 'lucide-vue-next';
import { fill } from '../utils/fill';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  limit: {
    type: Number,
    default: 5
  },
  labels: {
    type: Object,
    default: () => ({
      recentTransactions: 'Recent Transactions',
      viewAll: 'View All',
      noTransactionsYet: 'No transactions yet',
      today: 'Today',
      yesterday: 'Yesterday',
      dAgo: '{n}d ago',
      wAgo: '{n}w ago',
      moAgo: '{n}mo ago'
    })
  }
});

defineEmits(['view-all', 'click-txn']);

const recentTransactions = computed(() => props.transactions.slice(0, props.limit));



const formatRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return props.labels.today;
  if (diffDays === 1) return props.labels.yesterday;
  if (diffDays < 7) return fill(props.labels.dAgo, { n: diffDays });
  if (diffDays < 30) return fill(props.labels.wAgo, { n: Math.floor(diffDays / 7) });
  return fill(props.labels.moAgo, { n: Math.floor(diffDays / 30) });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.recent-transactions {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 100% at 100% 0%, rgba(var(--color-info-rgb), 0.05), transparent 58%),
    $bg-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  border: 1px solid $border-color;
  padding: $spacing-4;
  height: 320px;
  display: flex;
  flex-direction: column;

  > *:not(.card-glyph) {
    position: relative;
  }
}

.card-glyph {
  position: absolute;
  right: -18px;
  bottom: -18px;
  color: $info;
  opacity: 0.05;
  pointer-events: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-3;
}

.title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
}

.view-all-btn {
  font-size: $font-size-xs;
  color: $primary;
  background: transparent;
  border: none;
  font-weight: $font-medium;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  font-size: $font-size-sm;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  overflow-y: auto;
  flex: 1;
}

.transaction-row {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-2;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background: $bg-light;
  }
}

.txn-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }

  &.income {
    background: rgba(4, 120, 68, 0.1);
    color: $primary;
  }

  &.expense {
    background: rgba(220, 38, 38, 0.1);
    color: $error-color;
  }
}

.txn-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.txn-party {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.txn-category {
  font-size: $font-size-xs;
  color: $text-muted;
}

.txn-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.txn-amount {
  font-size: $font-size-sm;
  font-weight: $font-semibold;

  &.income {
    color: $primary;
  }

  &.expense {
    color: $error-color;
  }
}

.txn-time {
  font-size: $font-size-xs;
  color: $text-muted;
}
</style>
