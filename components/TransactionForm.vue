<template>
  <div class="transaction-form">
    <div class="form">
      <!-- Amount -->
      <div class="transaction-date">
        <span>{{ labels.amount }}</span>
        <div class="transaction-amount">
          <input
            v-model="formAmount"
            type="number"
            :placeholder="labels.amountPlaceholder"
            min="1"
            step="any"
            required
          />
          <select v-model="selectedCurrency" class="amount-currency-select" @change="onCurrencyChange">
            <option v-for="currency in availableCurrencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>
        <div v-if="amountError" class="error-text">{{ labels.amountError }}</div>
      </div>

      <!-- Description -->
      <div class="transaction-description">
        <span>{{ labels.description }} <span class="optional-label">({{ labels.optional }})</span></span>
        <textarea v-model="formDescription" :placeholder="labels.typeHere" />
      </div>

      <!-- Intent -->
      <div class="transaction-date">
        <span>{{ labels.intent }} <span class="optional-label">({{ labels.optional }})</span></span>
        <div class="intent-pills" role="radiogroup" :aria-label="labels.intent">
          <button
            v-for="opt in intentOptions"
            :key="opt.value"
            type="button"
            class="intent-pill"
            :class="{ 'intent-pill--active': formIntent === opt.value }"
            role="radio"
            :aria-checked="formIntent === opt.value"
            @click="formIntent = opt.value"
          >
            <component :is="intentIcons[opt.value]" class="intent-pill-icon" />
            <span>{{ labels.intentLabels?.[opt.value] || opt.label }}</span>
          </button>
        </div>
      </div>

      <!-- Date & Time -->
      <div class="form-transaction">
        <div class="transaction-date">
          <span>{{ labels.transactionDate }}</span>
          <input v-model="formDate" type="date" required />
          <div v-if="dateError" class="error-text">{{ labels.dateError }}</div>
        </div>
        <div class="transaction-date">
          <span>{{ labels.transactionTime }}</span>
          <input v-model="formTime" type="time" required />
          <div v-if="timeError" class="error-text">{{ labels.timeError }}</div>
        </div>
      </div>

      <!-- Party & Wallet -->
      <div class="form-transaction">
        <SearchableDropdown
          v-model="searchQuery"
          :label="isOutcomeSelected ? labels.partySentTo : labels.partyReceivedFrom"
          :placeholder="labels.searchParty"
          :options="parties"
          @select="handlePartySelect"
        />

        <div class="wallet-field-wrapper">
          <SearchableDropdown
            v-model="walletSearchQuery"
            :label="isOutcomeSelected ? labels.walletSentFrom : labels.walletReceivedTo"
            :placeholder="labels.searchWallet"
            :options="filteredWallets"
            :error="walletError ? labels.walletError : ''"
            @select="handleWalletSelect"
            @clear="selectedWalletId = null"
          />
          <span
            v-if="isWalletDefault"
            class="wallet-default-indicator"
            :title="labels.defaultWallet"
          >
            {{ labels.default }}
          </span>
        </div>
      </div>

      <!-- Group & Categories -->
      <div class="form-transaction">
        <div class="group-field-wrapper">
          <SearchableDropdown
            v-model="groupSearchQuery"
            :label="labels.group"
            :placeholder="labels.searchGroup"
            :options="groups"
            :error="categoryError ? labels.groupError : ''"
            @select="handleGroupSelect"
            @clear="selectedGroupId = null"
          />
          <span
            v-if="isGroupDefault"
            class="group-default-indicator"
            :title="labels.defaultGroup"
          >
            {{ labels.default }}
          </span>
        </div>

        <SearchableDropdown
          v-model="categorySearchQuery"
          :label="labels.categories"
          :placeholder="labels.searchCategories"
          :options="categories"
          :multiple="true"
          :selected="selectedAdditionalCategoryIds"
          @select="handleCategorySelect"
        />
      </div>

      <!-- Attachments -->
      <div class="transaction-files">
        <span>{{ labels.attachments }}</span>

        <div v-if="existingAttachments.length" class="attachment-grid">
          <div
            v-for="file in existingAttachments"
            :key="`existing-${file.id}`"
            class="attachment-card"
            :class="{ removing: removingFileIds.has(file.id) }"
          >
            <div v-if="isImageAttachment(file)" class="thumb">
              <img v-if="existingPreviews[file.id]" :src="existingPreviews[file.id]" :alt="labels.attachment" />
              <div v-else class="thumb-placeholder">…</div>
            </div>
            <div v-else class="thumb thumb-doc">
              <span>{{ extensionLabel(file.path) }}</span>
            </div>
            <button
              type="button"
              class="remove"
              :disabled="removingFileIds.has(file.id)"
              :title="labels.remove"
              @click="$emit('remove-existing-attachment', file)"
            >
              ×
            </button>
          </div>
        </div>

        <div class="upload-box">
          <input id="file-input" type="file" multiple @change="onFilesSelected" />
          <label for="file-input" class="upload-button">{{ labels.browseFiles }}</label>
          <span class="hint">{{ labels.fileHint }}</span>
        </div>

        <div v-if="newAttachments.length" class="attachment-grid">
          <div
            v-for="(att, i) in newAttachments"
            :key="`new-${att.name}-${i}`"
            class="attachment-card"
          >
            <div v-if="att.isImage && att.previewUrl" class="thumb">
              <img :src="att.previewUrl" :alt="att.name" />
            </div>
            <div v-else class="thumb thumb-doc">
              <span>{{ extensionLabel(att.name) }}</span>
            </div>
            <span class="filename">{{ att.name }}</span>
            <button type="button" class="remove" :title="labels.remove" @click="removeNewAttachment(i)">
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Refund -->
      <div v-if="!isOutcomeSelected" class="refund-section">
        <label class="refund-toggle">
          <input v-model="formIsRefund" type="checkbox" />
          <span>{{ labels.thisIsRefund }}</span>
        </label>
        <p class="refund-hint">{{ labels.refundHint }}</p>
        <div v-if="formIsRefund" class="refund-link">
          <SearchableDropdown
            v-model="refundPickerQuery"
            :label="labels.refundOf"
            :placeholder="recentExpenses.length ? labels.searchExpenses : labels.loadingExpenses"
            :options="refundOptions"
            @select="handleRefundSelect"
            @clear="formRefundOfTransactionId = null"
          />
          <p class="refund-link-hint">{{ labels.refundLinkHint }}</p>
        </div>
      </div>

      <!-- Recurring -->
      <div class="recurring-section">
        <label class="recurring-toggle">
          <input v-model="formIsRecurring" type="checkbox" />
          <span>{{ labels.makeRecurring }}</span>
        </label>
        <div v-if="formIsRecurring" class="recurring-fields">
          <div class="form-transaction">
            <div class="transaction-date">
              <span>{{ labels.recurrencePeriod }}</span>
              <select v-model="formRecurrencePeriod" class="recurring-select">
                <option value="daily">{{ labels.daily }}</option>
                <option value="weekly">{{ labels.weekly }}</option>
                <option value="monthly">{{ labels.monthly }}</option>
                <option value="yearly">{{ labels.yearly }}</option>
              </select>
            </div>
            <div class="transaction-date">
              <span>{{ labels.repeatEvery }}</span>
              <input v-model.number="formRecurrenceInterval" type="number" min="1" />
            </div>
          </div>
          <div class="transaction-date">
            <span>{{ labels.endDate }} <span class="optional-label">({{ labels.optional }})</span></span>
            <input v-model="formRecurrenceEndsAt" type="date" />
          </div>
        </div>
      </div>
    </div>

    <TButton
      :text="submitLabel"
      class="submit-button"
      :class="{ 'submit-button--expense': isOutcomeSelected }"
      :disabled="isSubmitting"
      :loading="isSubmitting"
      @click="onSubmit"
    >
      <template #left-icon>
        <CheckIcon v-if="!editingItem" />
        <PencilIcon v-else />
      </template>
    </TButton>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TButton from './TButton.vue';
import SearchableDropdown from './SearchableDropdown.vue';
import { CheckIcon, PencilIcon } from '@heroicons/vue/24/outline';
import {
  Circle, HandCoins, Banknote, Scale, Handshake, TrendingUp, PiggyBank, Gift
} from 'lucide-vue-next';

const INTENT_OPTIONS = [
  { value: 'regular',           label: 'Regular',              side: 'both' },
  { value: 'loan_received',     label: 'Loan received',        side: 'income' },
  { value: 'loan_repayment',    label: 'Loan repayment',       side: 'expense' },
  { value: 'debt_owed',         label: 'Debt owed to me',      side: 'income' },
  { value: 'debt_settled',      label: 'Debt settled',         side: 'expense' },
  { value: 'investment_buy',    label: 'Investment buy',       side: 'expense' },
  { value: 'investment_return', label: 'Investment return',    side: 'income' },
  { value: 'gift',              label: 'Gift',                 side: 'both' }
];

const intentIcons = {
  regular: Circle, loan_received: HandCoins, loan_repayment: Banknote,
  debt_owed: Scale, debt_settled: Handshake, investment_buy: TrendingUp,
  investment_return: PiggyBank, gift: Gift
};

const props = defineProps({
  isOutcomeSelected: { type: Boolean, default: false },
  editingItem:       { type: Object,  default: null },
  isSubmitting:      { type: Boolean, default: false },
  // Data props (replaces sharedData / api)
  parties:           { type: Array, default: () => [] },
  wallets:           { type: Array, default: () => [] },
  groups:            { type: Array, default: () => [] },
  categories:        { type: Array, default: () => [] },
  defaultWalletId:   { type: [Number, String], default: null },
  defaultGroupId:    { type: [Number, String], default: null },
  defaultCurrency:   { type: String, default: 'USD' },
  recentExpenses:    { type: Array, default: () => [] },
  existingAttachments: { type: Array, default: () => [] },
  existingPreviews:  { type: Object, default: () => ({}) },
  removingFileIds:   { type: Set, default: () => new Set() },
  labels: {
    type: Object,
    default: () => ({
      amount: 'Amount', amountPlaceholder: 'Ex: 250 000', amountError: 'Enter a valid amount greater than 0.',
      description: 'Description', optional: 'optional', typeHere: 'Type here...',
      intent: 'Intent', intentLabels: {},
      transactionDate: 'Transaction date', dateError: 'Date is required.',
      transactionTime: 'Transaction time', timeError: 'Time is required.',
      partySentTo: 'Party (sent to)', partyReceivedFrom: 'Party (received from)', searchParty: 'Search party...',
      walletSentFrom: 'Wallet (sent from)', walletReceivedTo: 'Wallet (received to)', searchWallet: 'Search wallet...',
      walletError: 'Wallet is required.', defaultWallet: 'This is your default wallet', default: 'Default',
      group: 'Group', searchGroup: 'Search group...', groupError: 'Group is required.', defaultGroup: 'This is your default group',
      categories: 'Categories', searchCategories: 'Search categories...',
      attachments: 'Attachments', attachment: 'Attachment', remove: 'Remove',
      browseFiles: 'Browse files', fileHint: 'Images, PDFs or docs. Max 5 files.',
      thisIsRefund: 'This is a refund',
      refundHint: 'Mark this income as refunding a past expense. Budgets subtract it from their spend.',
      refundOf: 'Refund of', searchExpenses: 'Search expenses...', loadingExpenses: 'Loading expenses...',
      refundLinkHint: 'Leave blank to mark the refund without linking to a specific expense.',
      makeRecurring: 'Make recurring', recurrencePeriod: 'Recurrence period', repeatEvery: 'Repeat every',
      daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly',
      endDate: 'End date',
      updateExpense: 'Update expense', updateIncome: 'Update income',
      recordExpense: 'Record expense', recordIncome: 'Record income',
      untitledTransaction: 'Untitled transaction'
    })
  }
});

const emit = defineEmits(['submit', 'remove-existing-attachment', 'load-expenses']);

// ── form state ──────────────────────────────────────────────────────────────
const now = new Date();
const formDate = ref(now.toISOString().slice(0, 10));
const formTime = ref(now.toTimeString().slice(0, 5));
const formAmount = ref('');
const formDescription = ref('');
const formIntent = ref('regular');
const selectedCurrency = ref(props.defaultCurrency);

const selectedPartyId = ref(null);
const selectedWalletId = ref(null);
const selectedGroupId = ref(null);
const selectedAdditionalCategoryIds = ref([]);

const newAttachments = ref([]);
const formIsRecurring = ref(false);
const formRecurrencePeriod = ref('monthly');
const formRecurrenceInterval = ref(1);
const formRecurrenceEndsAt = ref('');
const formIsRefund = ref(false);
const formRefundOfTransactionId = ref(null);
const refundPickerQuery = ref('');

const searchQuery = ref('');
const walletSearchQuery = ref('');
const groupSearchQuery = ref('');
const categorySearchQuery = ref('');

const dateError = ref(false);
const timeError = ref(false);
const amountError = ref(false);
const walletError = ref(false);
const categoryError = ref(false);

// ── computed ─────────────────────────────────────────────────────────────────
const intentOptions = computed(() => {
  const side = props.isOutcomeSelected ? 'expense' : 'income';
  return INTENT_OPTIONS.filter((o) => o.side === 'both' || o.side === side);
});

const availableCurrencies = computed(() => {
  const set = new Set(['XAF', 'USD', 'EUR', 'GBP', 'NGN']);
  props.wallets.forEach((w) => { if (w.currency) set.add(w.currency); });
  return Array.from(set).sort();
});

const filteredWallets = computed(() =>
  props.wallets.filter((w) => !w.currency || w.currency === selectedCurrency.value)
);

const isWalletDefault = computed(() =>
  !!selectedWalletId.value && selectedWalletId.value === props.defaultWalletId
);

const isGroupDefault = computed(() =>
  !!selectedGroupId.value && selectedGroupId.value === props.defaultGroupId
);

const refundOptions = computed(() =>
  props.recentExpenses.map((exp) => {
    const dt = exp.datetime ? new Date(exp.datetime) : null;
    const date = dt && !isNaN(dt.getTime()) ? dt.toLocaleDateString() : '';
    const amount = Number(exp.amount || 0).toFixed(2);
    const currency = exp.wallet?.currency ?? '';
    const desc = exp.description || exp.party?.name || props.labels.untitledTransaction;
    return { id: Number(exp.id), name: `${date} · ${amount} ${currency} · ${desc}`.trim() };
  })
);

const submitLabel = computed(() => {
  if (props.editingItem)
    return props.isOutcomeSelected ? props.labels.updateExpense : props.labels.updateIncome;
  return props.isOutcomeSelected ? props.labels.recordExpense : props.labels.recordIncome;
});

// ── handlers ──────────────────────────────────────────────────────────────────
function handlePartySelect(party) {
  selectedPartyId.value = party.id;
  searchQuery.value = party.name;
}
function handleWalletSelect(wallet) {
  selectedWalletId.value = wallet.id;
  walletError.value = false;
  if (wallet.currency && wallet.currency !== selectedCurrency.value)
    selectedCurrency.value = wallet.currency;
}
function onCurrencyChange() {
  const current = props.wallets.find((w) => w.id === selectedWalletId.value);
  if (current?.currency && current.currency !== selectedCurrency.value) {
    selectedWalletId.value = null;
    walletSearchQuery.value = '';
  }
}
function handleGroupSelect(group) {
  selectedGroupId.value = group.id;
  categoryError.value = false;
}
function handleCategorySelect(ids) {
  selectedAdditionalCategoryIds.value = ids;
}
function handleRefundSelect(option) {
  formRefundOfTransactionId.value = option?.id ?? null;
  refundPickerQuery.value = option?.name ?? '';
}

watch(formIsRefund, (flag) => {
  if (flag) emit('load-expenses');
  else { formRefundOfTransactionId.value = null; refundPickerQuery.value = ''; }
});
watch(() => props.isOutcomeSelected, (isExpense) => {
  if (isExpense) formIsRefund.value = false;
});

// ── attachments ───────────────────────────────────────────────────────────────
const MAX_ATTACHMENTS = 5;

function isImageAttachment(file) {
  if (!file.path && !file.name) return false;
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.path || file.name || '');
}

function extensionLabel(path) {
  if (!path) return '?';
  const parts = String(path).split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
}

function onFilesSelected(e) {
  const files = Array.from(e.target.files || []);
  const remaining = MAX_ATTACHMENTS - newAttachments.value.length - props.existingAttachments.length;
  files.slice(0, remaining).forEach((file) => {
    const isImage = file.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(file) : null;
    newAttachments.value.push({ file, name: file.name, size: file.size, isImage, previewUrl });
  });
  e.target.value = '';
}

function removeNewAttachment(i) {
  const att = newAttachments.value[i];
  if (att?.previewUrl) URL.revokeObjectURL(att.previewUrl);
  newAttachments.value.splice(i, 1);
}

// ── submit ────────────────────────────────────────────────────────────────────
function onSubmit() {
  if (props.isSubmitting) return;

  const amountNum = Number(formAmount.value);
  amountError.value = !Number.isFinite(amountNum) || amountNum <= 0;
  dateError.value = !formDate.value;
  timeError.value = !formTime.value;
  if (amountError.value || dateError.value || timeError.value) return;

  const payload = {
    date: formDate.value,
    time: formTime.value,
    type: props.isOutcomeSelected ? 'EXPENSE' : 'INCOME',
    intent: formIntent.value,
    party: searchQuery.value.trim(),
    partyId: selectedPartyId.value,
    amount: `${amountNum} ${selectedCurrency.value}`,
    categoryIds: selectedAdditionalCategoryIds.value,
    groupId: selectedGroupId.value ?? undefined,
    walletId: selectedWalletId.value,
    description: formDescription.value.trim(),
    filesToUpload: newAttachments.value.map((a) => a.file),
    isRecurring: formIsRecurring.value,
    recurrencePeriod: formIsRecurring.value ? formRecurrencePeriod.value : undefined,
    recurrenceInterval: formIsRecurring.value ? formRecurrenceInterval.value : undefined,
    recurrenceEndsAt: formIsRecurring.value && formRecurrenceEndsAt.value ? formRecurrenceEndsAt.value : undefined,
    isRefund: !props.isOutcomeSelected && formIsRefund.value,
    refundOfTransactionId: !props.isOutcomeSelected && formIsRefund.value ? formRefundOfTransactionId.value : null
  };
  if (props.editingItem?.id) payload.id = props.editingItem.id;
  emit('submit', payload);
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
}

.form-transaction {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-3;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.transaction-date,
.transaction-description {
  display: flex;
  flex-direction: column;
  gap: $spacing-1;

  > span:first-child {
    font-size: $font-size-sm;
    font-weight: $font-medium;
    color: $text-secondary;
  }

  input, select, textarea {
    padding: $spacing-2 $spacing-3;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    background: $input-bg;
    color: $text-primary;
    font-family: inherit;
    font-size: $font-size-sm;

    &:focus {
      outline: none;
      border-color: $primary;
    }
  }

  textarea {
    resize: vertical;
    min-height: 72px;
  }
}

.optional-label {
  color: $text-muted;
  font-size: $font-size-xs;
}

.transaction-amount {
  display: flex;
  gap: $spacing-2;

  input { flex: 1; }
}

.amount-currency-select {
  width: 80px;
  flex-shrink: 0;
}

.error-text {
  font-size: $font-size-xs;
  color: $error-color;
}

.intent-pills {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-2;
}

.intent-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border: 1px solid $border-color;
  border-radius: 999px;
  background: transparent;
  color: $text-secondary;
  font-size: $font-size-xs;
  cursor: pointer;
  transition: all 0.15s;

  .intent-pill-icon {
    width: 12px;
    height: 12px;
  }

  &--active {
    border-color: $primary;
    background: $primary-light;
    color: $primary;
  }
}

.wallet-field-wrapper,
.group-field-wrapper {
  position: relative;
}

.wallet-default-indicator,
.group-default-indicator {
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

.transaction-files {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;

  > span:first-child {
    font-size: $font-size-sm;
    font-weight: $font-medium;
    color: $text-secondary;
  }
}

.attachment-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-2;
}

.attachment-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 80px;

  &.removing {
    opacity: 0.5;
  }
}

.thumb {
  width: 64px;
  height: 64px;
  border-radius: $radius-md;
  overflow: hidden;
  border: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-light;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-doc {
    span {
      font-size: $font-size-xs;
      font-weight: $font-bold;
      color: $text-muted;
    }
  }
}

.thumb-placeholder {
  color: $text-muted;
  font-size: $font-size-lg;
}

.filename {
  font-size: 10px;
  color: $text-muted;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid $border-color;
  background: $bg-white;
  color: $text-secondary;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(var(--color-error-rgb), 0.1);
    color: $error-color;
    border-color: $error-color;
  }
}

.upload-box {
  display: flex;
  align-items: center;
  gap: $spacing-3;

  #file-input {
    display: none;
  }
}

.upload-button {
  padding: 6px 12px;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  cursor: pointer;
  font-size: $font-size-sm;
  color: $text-secondary;
  background: $bg-white;

  &:hover {
    border-color: $primary;
    color: $primary;
  }
}

.hint {
  font-size: $font-size-xs;
  color: $text-muted;
}

.refund-section,
.recurring-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.refund-toggle,
.recurring-toggle {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  cursor: pointer;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-secondary;
}

.refund-hint,
.refund-link-hint {
  font-size: $font-size-xs;
  color: $text-muted;
  margin: 0;
}

.refund-link {
  display: flex;
  flex-direction: column;
  gap: $spacing-1;
}

.recurring-fields {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  padding-left: $spacing-5;
}

.recurring-select {
  padding: $spacing-2 $spacing-3;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  background: $input-bg;
  color: $text-primary;
  font-size: $font-size-sm;
}

.submit-button {
  margin-top: $spacing-2;

  &--expense {
    --btn-bg: #{$error-color};
    --btn-bg-hover: #{$error-dark};
  }
}
</style>
