<template>
  <div class="detail" :class="{ 'detail--empty': !party }">
    <div v-if="!party" class="empty">
      <svg class="empty-illustration" viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <radialGradient id="empty-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.22" />
            <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="110" r="100" fill="url(#empty-glow)" />
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
        <circle cx="110" cy="110" r="36" fill="var(--color-primary-light)" />
        <g transform="translate(110 110)" fill="var(--color-primary)">
          <circle cx="0" cy="-4" r="7" />
          <path d="M -10 12 C -10 5 10 5 10 12 L 10 16 L -10 16 Z" />
        </g>
        <circle cx="190" cy="60" r="6" fill="var(--color-primary)" opacity="0.7" />
        <circle cx="35" cy="170" r="4" fill="var(--color-primary)" opacity="0.55" />
        <circle cx="170" cy="180" r="5" fill="var(--color-primary)" opacity="0.45" />
      </svg>
      <p class="empty-title">{{ labels.selectParty }}</p>
      <p class="empty-sub">
        {{ labels.pickParty }}
      </p>
    </div>

    <Transition v-else name="party-swap" mode="out-in">
      <PartyDetailContent
        :party="party"
        :transactions="transactions"
        :currency="currency"
        :formatter="formatter"
        :show-back="showBack"
        :locale="locale"
        :labels="labels"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
        @back="$emit('back')"
        @view-all="$emit('view-all', $event)"
      />
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import PartyDetailContent from './PartyDetailContent.vue';
import { lucideMap } from '../utils/icons';
import {
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  Activity
} from 'lucide-vue-next';

const props = defineProps({
  party: { type: Object, default: null },
  transactions: { type: Array, default: () => [] },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` },
  showBack: { type: Boolean, default: false },
  locale: { type: String, default: 'en' },
  labels: {
    type: Object,
    default: () => ({
      selectParty: 'Select a party',
      pickParty:
        'Pick someone on the left to see their activity, balances, and recent transactions.',
      backToList: 'Back to list',
      edit: 'Edit',
      delete: 'Delete',
      received: 'Received',
      spent: 'Spent',
      net: 'Net',
      lastSixMonths: 'Last 6 months',
      activity: 'Activity',
      noActivity: 'No activity in the last 6 months yet.',
      recentTransactions: 'Recent transactions',
      shown: 'shown',
      viewAll: 'View all',
      transaction: 'Transaction',
      noTransactions: 'No transactions yet with this party.',
      individual: 'Individual',
      business: 'Business',
      organization: 'Organization',
      vendor: 'Vendor',
      client: 'Client',
      party: 'Party'
    })
  }
});

defineEmits(['edit', 'delete', 'back', 'view-all']);

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
  animation: empty-float 6s $easing-standard infinite;
}

@keyframes empty-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.detail-body {
  display: flex;
  flex-direction: column;
}

.party-swap-enter-active,
.party-swap-leave-active {
  transition:
    opacity $duration-base $easing-standard,
    transform $duration-base $easing-emphasized;
}
.party-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.party-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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

/* moved to PartyDetailContent.vue */
</style>
