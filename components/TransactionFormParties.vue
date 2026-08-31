<template>
  <TFormRow :cols="2">
    <TFormField :label="isOutcomeSelected ? labels.partySentTo : labels.partyReceivedFrom" field-id="txn-party">
      <SearchableDropdown
        :model-value="searchQuery"
        :label="isOutcomeSelected ? labels.partySentTo : labels.partyReceivedFrom"
        :placeholder="labels.searchParty"
        :options="parties"
        @update:modelValue="$emit('update:searchQuery', $event)"
        @select="handlePartySelect"
      />
    </TFormField>
    <TFormField :label="isOutcomeSelected ? labels.walletSentFrom : labels.walletReceivedTo" field-id="txn-wallet" :error="walletError ? labels.walletError : ''">
      <SearchableDropdown
        :model-value="walletSearchQuery"
        :label="isOutcomeSelected ? labels.walletSentFrom : labels.walletReceivedTo"
        :placeholder="labels.searchWallet"
        :options="filteredWallets"
        :error="walletError ? labels.walletError : ''"
        @update:modelValue="$emit('update:walletSearchQuery', $event)"
        @select="handleWalletSelect"
        @clear="$emit('clear:wallet')"
      />
      <span v-if="isWalletDefault" class="wallet-default-indicator" :title="labels.defaultWallet">{{ labels.default }}</span>
    </TFormField>
  </TFormRow>
</template>

<script setup>
import TFormRow from './TFormRow.vue';
import TFormField from './TFormField.vue';
import SearchableDropdown from './SearchableDropdown.vue';

const props = defineProps({
  parties: { type: Array, default: () => [] },
  wallets: { type: Array, default: () => [] },
  filteredWallets: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
  walletSearchQuery: { type: String, default: '' },
  selectedPartyId: { type: [Number, String], default: null },
  selectedWalletId: { type: [Number, String], default: null },
  labels: { type: Object, default: () => ({}) },
  isOutcomeSelected: { type: Boolean, default: false },
  walletError: { type: [Boolean, String], default: false },
  isWalletDefault: { type: Boolean, default: false }
});

const emit = defineEmits(['update:searchQuery', 'update:walletSearchQuery', 'update:selectedPartyId', 'update:selectedWalletId', 'select:party', 'select:wallet', 'clear:wallet', 'selectParty', 'selectWallet']);

function handlePartySelect(party) {
  emit('update:selectedPartyId', party.id);
  emit('update:searchQuery', party.name);
  emit('select:party', party);
  emit('selectParty', party);
}

function handleWalletSelect(wallet) {
  emit('update:selectedWalletId', wallet.id);
  emit('select:wallet', wallet);
  emit('selectWallet', wallet);
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.wallet-default-indicator {
  position: absolute;
  top: 0;
  right: 0;
  font-size: $font-size-xs;
  color: $primary;
  font-weight: $font-medium;
  background: $primary-light;
  padding: 2px 6px;
  border-radius: $radius-sm;
}
</style>
