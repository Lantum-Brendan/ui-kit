<template>
  <div class="transfer-form">
    <div class="form">
      <TFormField
        :label="labels.amount"
        :error="amountError ? labels.amountError : ''"
        required
      >
        <div class="amount-input-group">
          <TFormInput
            v-model="formAmount"
            type="number"
            :placeholder="labels.amountPlaceholder"
            min="1"
            step="any"
            :error="amountError"
          />
          <TFormSelect
            v-model="selectedCurrency"
            :options="availableCurrencyOptions"
            class="amount-currency-select"
          />
        </div>
      </TFormField>

      <TFormRow :cols="2">
        <TFormField :error="fromWalletError ? labels.fromWalletError : ''">
          <SearchableDropdown
            v-model="fromWalletSearchQuery"
            :label="labels.fromWallet"
            :placeholder="labels.fromWalletPlaceholder"
            :options="fromWalletOptions"
            :error="fromWalletError ? labels.fromWalletError : ''"
            @select="handleFromWalletSelect"
            @clear="fromWalletId = null"
          />
        </TFormField>

        <TFormField :error="toWalletError ? labels.toWalletError : ''">
          <SearchableDropdown
            v-model="toWalletSearchQuery"
            :label="labels.toWallet"
            :placeholder="labels.toWalletPlaceholder"
            :options="toWalletOptions"
            :error="toWalletError ? labels.toWalletError : ''"
            @select="handleToWalletSelect"
            @clear="toWalletId = null"
          />
        </TFormField>
      </TFormRow>

      <div v-if="showExchangeRate" class="exchange-rate-section">
        <TFormField
          :label="labels.exchangeRate"
          :error="exchangeRateError ? labels.exchangeRateError : ''"
        >
          <div class="exchange-rate-input">
            <span class="rate-label">1 {{ fromWalletCurrency }} =</span>
            <TFormInput
              v-model="exchangeRate"
              type="number"
              step="any"
              min="0.0001"
              :placeholder="labels.exchangeRatePlaceholder"
              :error="exchangeRateError"
              size="sm"
            />
            <span class="rate-label">{{ toWalletCurrency }}</span>
          </div>
          <div v-if="convertedAmount" class="converted-amount">
            {{ labels.recipientWillReceive }} {{ convertedAmount }} {{ toWalletCurrency }}
          </div>
        </TFormField>
      </div>

      <TFormRow :cols="2">
        <TFormField
          :label="labels.transferDate"
          :error="dateError ? labels.dateError : ''"
          required
        >
          <TFormInput v-model="formDate" type="date" :error="dateError" />
        </TFormField>

        <TFormField
          :label="labels.transferTime"
          :error="timeError ? labels.timeError : ''"
          required
        >
          <TFormInput v-model="formTime" type="time" :error="timeError" />
        </TFormField>
      </TFormRow>
    </div>

    <TButton
      :text="labels.makeTransfer"
      class="submit-button"
      :disabled="props.isSubmitting"
      :loading="props.isSubmitting"
      @click="onSubmit"
    >
      <template #left-icon>
        <ArrowsRightLeftIcon />
      </template>
    </TButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TButton from './TButton.vue';
import TFormField from './TFormField.vue';
import TFormRow from './TFormRow.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import SearchableDropdown from './SearchableDropdown.vue';
import { ArrowsRightLeftIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  },
  wallets: {
    type: Array,
    default: () => []
  },
  defaultCurrency: {
    type: String,
    default: 'USD'
  },
  formatWalletName: {
    type: Function,
    default: (w: any) => w.name
  },
  labels: {
    type: Object,
    default: () => ({
      amount: 'Amount',
      amountPlaceholder: 'Ex: 250 000',
      amountError: 'Enter a valid amount greater than 0.',
      fromWallet: 'From Wallet',
      fromWalletPlaceholder: 'Select source wallet...',
      fromWalletError: 'Source wallet is required.',
      toWallet: 'To Wallet',
      toWalletPlaceholder: 'Select destination wallet...',
      toWalletError: 'Destination wallet is required.',
      exchangeRate: 'Exchange Rate',
      exchangeRatePlaceholder: 'Enter rate',
      exchangeRateError: 'Exchange rate is required for different currencies.',
      recipientWillReceive: 'Recipient will receive:',
      transferDate: 'Transfer date',
      dateError: 'Date is required.',
      transferTime: 'Transfer time',
      timeError: 'Time is required.',
      makeTransfer: 'Make Transfer'
    })
  }
});

const emit = defineEmits(['submit']);

function toLocalDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function toLocalTimeString(d) {
  const h = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${mi}`;
}
const now = new Date();
const formDate = ref(toLocalDateString(now));
const formTime = ref(toLocalTimeString(now));
const formAmount = ref('');
const exchangeRate = ref<string>('');

const fromWalletId = ref<number | null>(null);
const toWalletId = ref<number | null>(null);
const fromWalletSearchQuery = ref('');
const toWalletSearchQuery = ref('');

const selectedCurrency = ref(props.defaultCurrency || 'USD');

const dateError = ref(false);
const timeError = ref(false);
const amountError = ref(false);
const fromWalletError = ref(false);
const toWalletError = ref(false);
const exchangeRateError = ref(false);

const availableCurrencies = computed(() => {
  const currencies = new Set(['XAF', 'USD', 'EUR', 'GBP', 'NGN']);
  (props.wallets as any[]).forEach((wallet) => {
    if (wallet.currency) {
      currencies.add(wallet.currency);
    }
  });
  return Array.from(currencies).sort();
});

const availableCurrencyOptions = computed(() =>
  availableCurrencies.value.map((c) => ({ label: c, value: c }))
);

const fromWalletOptions = computed(() => {
  return (props.wallets as any[])
    .filter((w) => w.id !== toWalletId.value)
    .map((w) => ({
      ...w,
      name: props.formatWalletName(w),
      originalName: w.name
    }));
});

const toWalletOptions = computed(() => {
  return (props.wallets as any[])
    .filter((w) => w.id !== fromWalletId.value)
    .map((w) => ({
      ...w,
      name: props.formatWalletName(w),
      originalName: w.name
    }));
});

const fromWalletCurrency = computed(() => {
  const wallet = (props.wallets as any[]).find((w) => w.id === fromWalletId.value);
  return wallet?.currency || selectedCurrency.value;
});

const toWalletCurrency = computed(() => {
  const wallet = (props.wallets as any[]).find((w) => w.id === toWalletId.value);
  return wallet?.currency || selectedCurrency.value;
});

const showExchangeRate = computed(() => {
  return (
    fromWalletId.value && toWalletId.value && fromWalletCurrency.value !== toWalletCurrency.value
  );
});

const convertedAmount = computed(() => {
  if (!showExchangeRate.value) return null;
  const amount = Number(formAmount.value);
  const rate = Number(exchangeRate.value);
  if (!Number.isFinite(amount) || !Number.isFinite(rate) || rate <= 0) return null;
  return (amount * rate).toFixed(2);
});

function handleFromWalletSelect(wallet: { id: number; name: string; currency?: string }) {
  fromWalletId.value = wallet.id;
  fromWalletSearchQuery.value = wallet.name;
  fromWalletError.value = false;

  if (wallet.currency) {
    selectedCurrency.value = wallet.currency;
  }
}

function handleToWalletSelect(wallet: { id: number; name: string; currency?: string }) {
  toWalletId.value = wallet.id;
  toWalletSearchQuery.value = wallet.name;
  toWalletError.value = false;
}

function validateRequiredFields(): boolean {
  let valid = true;

  const amountNum = Number(formAmount.value);
  amountError.value = !Number.isFinite(amountNum) || amountNum <= 0;
  if (amountError.value) valid = false;

  dateError.value = !formDate.value || formDate.value.trim() === '';
  timeError.value = !formTime.value || formTime.value.trim() === '';
  if (dateError.value || timeError.value) valid = false;

  fromWalletError.value = !fromWalletId.value;
  toWalletError.value = !toWalletId.value;
  if (fromWalletError.value || toWalletError.value) valid = false;

  if (showExchangeRate.value) {
    const rate = Number(exchangeRate.value);
    exchangeRateError.value = !Number.isFinite(rate) || rate <= 0;
    if (exchangeRateError.value) valid = false;
  }

  return valid;
}

function onSubmit() {
  if (props.isSubmitting || !validateRequiredFields()) {
    return;
  }

  const amountNum = Number(formAmount.value);
  const dateTime = `${formDate.value}T${formTime.value}:00`;

  const payload: {
    amount: number;
    from_wallet_id: number;
    to_wallet_id: number;
    created_at: string;
    exchange_rate?: number;
  } = {
    amount: amountNum,
    from_wallet_id: fromWalletId.value!,
    to_wallet_id: toWalletId.value!,
    created_at: new Date(dateTime).toISOString()
  };

  if (showExchangeRate.value) {
    payload.exchange_rate = Number(exchangeRate.value);
  }

  emit('submit', payload);
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.transfer-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.amount-input-group {
  display: flex;
  gap: 0.5rem;

  .amount-currency-select {
    width: 90px;
    flex-shrink: 0;
  }
}

.exchange-rate-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1rem;
  background: $bg-slate;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
}

.exchange-rate-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .rate-label {
    color: $text-secondary;
    font-size: 14px;
    white-space: nowrap;
  }
}

.converted-amount {
  font-size: 14px;
  color: $primary;
  font-weight: $font-medium;
  margin-top: 4px;
}

.submit-button {
  align-self: flex-start;
  margin-top: 16px;

  @media (max-width: $breakpoint-sm) {
    width: 100%;
  }
}
</style>
