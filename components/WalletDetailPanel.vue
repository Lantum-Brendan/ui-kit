<template>
  <div class="detail" :class="{ 'detail--empty': !wallet }">
    <div v-if="!wallet" class="empty">
      <svg class="empty-illustration" viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <radialGradient id="wempty-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.22" />
            <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="110" r="100" fill="url(#wempty-glow)" />
        <circle
          cx="110"
          cy="110"
          r="80"
          fill="none"
          stroke="var(--color-primary)"
          stroke-opacity="0.18"
          stroke-width="1"
          stroke-dasharray="3 4"
        />
        <circle
          cx="110"
          cy="110"
          r="56"
          fill="none"
          stroke="var(--color-primary)"
          stroke-opacity="0.28"
          stroke-width="1"
        />
        <rect x="74" y="92" width="72" height="44" rx="8" fill="var(--color-primary-light)" />
        <rect
          x="74"
          y="92"
          width="72"
          height="14"
          rx="8"
          fill="var(--color-primary)"
          opacity="0.6"
        />
        <circle cx="132" cy="116" r="5" fill="var(--color-primary)" />
        <circle cx="190" cy="60" r="6" fill="var(--color-primary)" opacity="0.7" />
        <circle cx="35" cy="170" r="4" fill="var(--color-primary)" opacity="0.55" />
        <circle cx="170" cy="180" r="5" fill="var(--color-primary)" opacity="0.45" />
      </svg>
      <p class="empty-title">{{ labels.selectWallet }}</p>
      <p class="empty-sub">
        {{ labels.pickWallet }}
      </p>
    </div>

    <Transition v-else name="wallet-swap" mode="out-in">
      <WalletDetailContent
        :wallet="wallet"
        :is-default="isDefault"
        :transactions="transactions"
        :formatter="formatter"
        :show-back="showBack"
        :locale="locale"
        :labels="labels"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
        @back="$emit('back')"
      />
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import WalletDetailContent from './WalletDetailContent.vue';
import { lucideMap } from '../utils/icons';
import {
  Edit3,
  Trash2,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  Activity
} from 'lucide-vue-next';
const parseAmount = (amount) => {
  if (amount === null || amount === undefined || amount === '') return { value: 0 };
  const raw = typeof amount === 'string' ? amount.replace(/[^0-9.\-]/g, '') : amount;
  const num = Number(raw);
  return { value: Number.isFinite(num) ? num : 0 };
};

const props = defineProps({
  wallet: { type: Object, default: null },
  isDefault: { type: Boolean, default: false },
  transactions: { type: Array, default: () => [] },
  formatter: { type: Function, default: (n, cur) => `${Math.round(n)} ${cur || ''}` },
  showBack: { type: Boolean, default: false },
  locale: { type: String, default: 'en' },
  labels: {
    type: Object,
    default: () => ({
      selectWallet: 'Select a wallet',
      pickWallet: 'Pick a wallet on the left to see its balance, activity, and recent transactions.',
      backToList: 'Back to list',
      default: 'Default',
      edit: 'Edit',
      delete: 'Delete',
      balance: 'Balance',
      income: 'Income',
      expense: 'Expense',
      net: 'Net',
      last6Months: 'Last 6 months',
      activity: 'Activity',
      noActivity: 'No activity in the last 6 months yet.',
      recentTransactions: 'Recent transactions',
      shown: 'shown',
      viewAll: 'View all',
      transaction: 'Transaction',
      noTransactions: 'No transactions yet on this wallet.',
      walletType: {
        bankAccount: 'Bank account',
        cash: 'Cash',
        creditCard: 'Credit card',
        debitCard: 'Debit card',
        digitalWallet: 'Digital wallet',
        savings: 'Savings'
      }
    })
  }
});

defineEmits(['edit', 'delete', 'back']);

</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.detail {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 100%;

  &--empty {
    align-items: center;
    justify-content: center;
    padding: $spacing-8 $spacing-6;
    min-height: 320px;
  }
}

.empty {
  text-align: center;
  max-width: 340px;
  color: $text-muted;
}

.empty-illustration {
  width: 160px;
  height: 160px;
  margin-bottom: $spacing-3;
  animation: wempty-float 6s $easing-standard infinite;
}

@keyframes wempty-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.empty-title {
  font-size: $font-size-base;
  font-weight: $font-bold;
  color: $text-primary;
  margin: 0 0 $spacing-1;
  letter-spacing: -0.01em;
}

.empty-sub {
  font-size: $font-size-sm;
  margin: 0;
  line-height: 1.5;
}

.detail-body {
  display: flex;
  flex-direction: column;
}

.wallet-swap-enter-active,
.wallet-swap-leave-active {
  transition:
    opacity $duration-base $easing-standard,
    transform $duration-base $easing-emphasized;
}
.wallet-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.wallet-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* hero/totals/chart/recent moved to WalletDetailContent.vue */
</style>
