<template>
  <div v-if="show" class="dialog-overlay" @click.self="$emit('cancel')">
    <div class="dialog">
      <h3 class="dialog__title">{{ labels.confirmImport }}</h3>

      <div class="dialog__body">
        <p>{{ fill(labels.youAreAboutToImport, { count: acceptedCount }) }}</p>

        <div v-if="duplicatesInAccepted > 0" class="dialog__warning">
          {{
            fill(labels.mayBeDuplicates, {
              count: duplicatesInAccepted
            })
          }}
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
      </div>

      <div class="dialog__actions">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AutoCreateOptions {
  wallets: boolean;
  parties: boolean;
  categories: boolean;
}

const fill = (t, v) =>
  Object.entries(v).reduce((s, [k, val]) => s.replace(`{${k}}`, val), t);

const props = defineProps<{
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
}>();

const emit = defineEmits<{
  confirm: [autoCreate: AutoCreateOptions];
  cancel: [];
}>();

const _labels = props.labels || {
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
};

const autoCreateWallets = ref(false);
const autoCreateParties = ref(false);
const autoCreateCategories = ref(false);

const hasNewEntities = computed(
  () => props.newWalletCount > 0 || props.newPartyCount > 0 || props.newCategoryCount > 0
);

// A row with no wallet_id is fine iff its suggestion wallet will be auto-created.
// If the count of rows missing a wallet_id exceeds the count that auto-create
// would cover, the user has to intervene before we can submit.
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

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index-modal;
}

.dialog {
  background-color: $bg-white;
  border-radius: $radius-xl;
  padding: 24px;
  max-width: 440px;
  width: 100%;
  box-shadow: $shadow-xl;

  &__title {
    margin: 0 0 16px;
    font-size: $font-size-lg;
    color: $text-primary;
  }

  &__body {
    margin-bottom: 20px;

    p {
      margin: 0 0 8px;
      color: $text-secondary;
      font-size: $font-size-sm;
    }
  }

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

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
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
