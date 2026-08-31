<template>
  <TForm
    :title="editingItem ? (isOutcomeSelected ? labels.updateExpense : labels.updateIncome) : (isOutcomeSelected ? labels.recordExpense : labels.recordIncome)"
    :is-submitting="isSubmitting"
    :submit-label="submitLabel"
    :show-close="false"
    :show-cancel="false"
    @submit="onSubmit"
  >
    <TFormField :label="labels.amount" field-id="txn-amount" required :error="amountError ? labels.amountError : ''">
      <div class="transaction-amount">
        <TFormInput
          v-model="formAmount"
          type="number"
          :placeholder="labels.amountPlaceholder"
          :error="amountError"
        />
        <TFormSelect
          v-model="selectedCurrency"
          :options="availableCurrencyOptions"
          class="amount-currency-select"
        />
      </div>
    </TFormField>

    <TFormField :label="labels.description" field-id="txn-desc" :hint="labels.optional">
      <TFormTextarea v-model="formDescription" :placeholder="labels.typeHere" :rows="3" />
    </TFormField>

    <TFormField :label="labels.intent" field-id="txn-intent" :hint="labels.optional">
      <TransactionFormIntent v-model="formIntent" :options="intentOptions" :labels="labels" :label="labels.intent" />
    </TFormField>

    <TFormRow :cols="2">
      <TFormField :label="labels.transactionDate" field-id="txn-date" required :error="dateError ? labels.dateError : ''">
        <TFormInput v-model="formDate" type="date" :error="dateError" />
      </TFormField>
      <TFormField :label="labels.transactionTime" field-id="txn-time" required :error="timeError ? labels.timeError : ''">
        <TFormInput v-model="formTime" type="time" :error="timeError" />
      </TFormField>
    </TFormRow>

    <TransactionFormParties
      :parties="parties"
      :wallets="wallets"
      :filtered-wallets="filteredWallets"
      :search-query="searchQuery"
      :wallet-search-query="walletSearchQuery"
      :selected-party-id="selectedPartyId"
      :selected-wallet-id="selectedWalletId"
      :labels="labels"
      :is-outcome-selected="isOutcomeSelected"
      :wallet-error="walletError"
      :is-wallet-default="isWalletDefault"
      @update:search-query="searchQuery = $event"
      @update:wallet-search-query="walletSearchQuery = $event"
      @update:selected-party-id="selectedPartyId = $event"
      @update:selected-wallet-id="selectedWalletId = $event"
      @select:party="searchQuery = $event.name"
      @select:wallet="handleWalletSelect"
      @clear:wallet="selectedWalletId = null"
    />

    <TransactionFormGroups
      :groups="groups"
      :categories="categories"
      :group-search-query="groupSearchQuery"
      :category-search-query="categorySearchQuery"
      :selected-group-id="selectedGroupId"
      :selected-additional-category-ids="selectedAdditionalCategoryIds"
      :labels="labels"
      :category-error="categoryError"
      :is-group-default="isGroupDefault"
      @update:group-search-query="groupSearchQuery = $event"
      @update:category-search-query="categorySearchQuery = $event"
      @update:selected-group-id="selectedGroupId = $event"
      @update:selected-additional-category-ids="selectedAdditionalCategoryIds = $event"
      @select:group="categoryError = false"
      @select:category="selectedAdditionalCategoryIds = $event"
      @clear:group="selectedGroupId = null"
    />

    <TFormField :label="labels.attachments" field-id="txn-attachments">
      <TransactionFormAttachments
        :existing-attachments="existingAttachments"
        :existing-previews="existingPreviews"
        :removing-file-ids="removingFileIds"
        :new-attachments="newAttachments"
        :labels="labels"
        @remove-existing-attachment="$emit('remove-existing-attachment', $event)"
        @remove-new-attachment="removeNewAttachment($event)"
        @files-selected="onFilesSelected"
      />
    </TFormField>

    <TFormField v-if="!isOutcomeSelected" :label="labels.thisIsRefund" field-id="txn-refund">
      <label class="refund-toggle"><input v-model="formIsRefund" type="checkbox" /> <span>{{ labels.thisIsRefund }}</span></label>
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
    </TFormField>

    <TFormField :label="labels.makeRecurring" field-id="txn-recurring">
      <TransactionFormRecurring
        v-model="formIsRecurring"
        :period="formRecurrencePeriod"
        :interval="formRecurrenceInterval"
        :ends-at="formRecurrenceEndsAt"
        :labels="labels"
        @update:period="formRecurrencePeriod = $event"
        @update:interval="formRecurrenceInterval = $event"
        @update:endsAt="formRecurrenceEndsAt = $event"
      />
    </TFormField>
  </TForm>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TForm from './TForm.vue';
import TFormField from './TFormField.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import TFormTextarea from './TFormTextarea.vue';
import TFormRow from './TFormRow.vue';
import SearchableDropdown from './SearchableDropdown.vue';
import TransactionFormIntent from './TransactionFormIntent.vue';
import TransactionFormRecurring from './TransactionFormRecurring.vue';
import TransactionFormAttachments from './TransactionFormAttachments.vue';
import TransactionFormParties from './TransactionFormParties.vue';
import TransactionFormGroups from './TransactionFormGroups.vue';

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

const availableCurrencyOptions = computed(() =>
  availableCurrencies.value.map((c) => ({ label: c, value: c }))
);

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
function handleWalletSelect(wallet) {
  walletError.value = false;
  if (wallet.currency && wallet.currency !== selectedCurrency.value)
    selectedCurrency.value = wallet.currency;
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



.submit-button {
  margin-top: $spacing-2;

  &--expense {
    --btn-bg: #{$error-color};
    --btn-bg-hover: #{$error-dark};
  }
}
</style>
