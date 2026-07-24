<template>
  <TModal :model-value="show" size="sm" @close="$emit('cancel')">
    <TModalHeader :title="labels.confirmImport" @close="$emit('cancel')" />
    <TModalBody>
      <p>{{ fill(labels.youAreAboutToImport, { count: acceptedCount }) }}</p>

      <div v-if="duplicatesInAccepted > 0" class="dialog__warning">
        {{ fill(labels.mayBeDuplicates, { count: duplicatesInAccepted }) }}
      </div>

      <div v-if="rejectedCount > 0" class="dialog__info">
        {{ fill(labels.suggestionsSkipped, { count: rejectedCount }) }}
      </div>

      <div v-if="hasNewEntities" class="dialog__auto-create">
        <p class="dialog__auto-create-label">
          {{ labels.someTransactionsReference }}
        </p>

        <label v-if="newWalletCount > 0" class="dialog__toggle">
          <input v-model="autoCreateWallets" type="checkbox" />
          <span>{{ fill(labels.createNewWallets, { count: newWalletCount }) }}</span>
        </label>

        <label v-if="newPartyCount > 0" class="dialog__toggle">
          <input v-model="autoCreateParties" type="checkbox" />
          <span>{{ fill(labels.createNewParties, { count: newPartyCount }) }}</span>
        </label>

        <label v-if="newCategoryCount > 0" class="dialog__toggle">
          <input v-model="autoCreateCategories" type="checkbox" />
          <span>{{ fill(labels.createNewCategories, { count: newCategoryCount }) }}</span>
        </label>

        <p class="dialog__auto-create-hint">
          {{ labels.uncheckedItemsSkipped }}
        </p>

        <p v-if="walletGapUncovered" class="dialog__auto-create-warning">
          {{ labels.walletGapWarning }}
        </p>
      </div>
    </TModalBody>
    <TModalFooter align="right">
      <button class="btn btn--secondary" @click="$emit('cancel')">
        {{ labels.cancel }}
      </button>
      <button
        class="btn btn--primary"
        :disabled="isConfirming || walletGapUncovered"
        @click="handleConfirm"
      >
        {{ isConfirming ? labels.importing : labels.confirmImport }}
      </button>
    </TModalFooter>
  </TModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TModal from './TModal.vue';
import TModalHeader from './TModalHeader.vue';
import TModalBody from './TModalBody.vue';
import TModalFooter from './TModalFooter.vue';
import { fill } from '../utils/fill';

interface AutoCreateOptions {
  wallets: boolean;
  parties: boolean;
  categories: boolean;
}

const props = withDefaults(
  defineProps<{
    show: boolean;
    acceptedCount: number;
    rejectedCount: number;
    duplicatesInAccepted: number;
    isConfirming: boolean;
    newWalletCount: number;
    newPartyCount: number;
    newCategoryCount: number;
    missingWalletCount: number;
    labels?: {
      confirmImport: string;
      youAreAboutToImport: string;
      mayBeDuplicates: string;
      suggestionsSkipped: string;
      someTransactionsReference: string;
      createNewWallets: string;
      createNewParties: string;
      createNewCategories: string;
      uncheckedItemsSkipped: string;
      walletGapWarning: string;
      cancel: string;
      importing: string;
    };
  }>(),
  {
    labels: () => ({
      confirmImport: 'Confirm import',
      youAreAboutToImport: 'You are about to import {count} transactions.',
      mayBeDuplicates: '{count} of these may be duplicates of existing transactions.',
      suggestionsSkipped: '{count} suggestions will be skipped.',
      someTransactionsReference: "Some transactions reference items that don't exist yet:",
      createNewWallets: 'Create {count} new wallets',
      createNewParties: 'Create {count} new parties',
      createNewCategories: 'Create {count} new categories',
      uncheckedItemsSkipped: 'Unchecked items will be skipped and not linked to the transaction.',
      walletGapWarning:
        'Some accepted rows have no wallet selected. Either choose one or enable "Create new wallets".',
      cancel: 'Cancel',
      importing: 'Importing...'
    })
  }
);

const emit = defineEmits<{
  (e: 'confirm', autoCreate: AutoCreateOptions): void;
  (e: 'cancel'): void;
}>();

const autoCreateWallets = ref(false);
const autoCreateParties = ref(false);
const autoCreateCategories = ref(false);

const hasNewEntities = computed(
  () => props.newWalletCount > 0 || props.newPartyCount > 0 || props.newCategoryCount > 0
);

const walletGapUncovered = computed(() => {
  if (props.missingWalletCount === 0) return false;
  if (props.newWalletCount > 0 && autoCreateWallets.value) return false;
  return true;
});

const handleConfirm = () => {
  emit('confirm', {
    wallets: autoCreateWallets.value,
    parties: autoCreateParties.value,
    categories: autoCreateCategories.value
  });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.dialog {
  &__warning {
    padding: 8px 12px;
    background-color: $warning-bg;
    color: $warning-text;
    border-radius: $radius-lg;
    font-size: $font-size-sm;
    margin-top: 8px;
  }

  &__info {
    padding: 8px 12px;
    background-color: $bg-slate;
    color: $text-muted;
    border-radius: $radius-lg;
    font-size: $font-size-sm;
    margin-top: 8px;
  }

  &__auto-create {
    margin-top: 12px;
    padding: 12px;
    background-color: $bg-slate;
    border-radius: $radius-lg;
    border: 1px solid $border-light;
  }

  &__auto-create-label {
    font-weight: 600;
    margin: 0 0 8px;
    color: $text-primary;
    font-size: $font-size-sm;
  }

  &__auto-create-hint {
    margin: 8px 0 0;
    font-size: $font-size-xs;
    color: $text-muted;
  }

  &__auto-create-warning {
    margin: 8px 0 0;
    font-size: $font-size-xs;
    font-weight: 600;
    color: $error-color;
  }

  &__toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    cursor: pointer;
    font-size: $font-size-sm;
    color: $text-secondary;

    input[type='checkbox'] {
      cursor: pointer;
    }
  }
}

.btn {
  padding: 8px 20px;
  border-radius: $radius-lg;
  font-size: $font-size-sm;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  &--secondary {
    background-color: $bg-gray;
    color: $text-secondary;

    &:hover {
      background-color: $border-color;
    }
  }

  &--primary {
    background-color: $primary;
    color: $text-inverse;

    &:hover:not(:disabled) {
      background-color: $primary-hover;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
