<template>
  <Teleport to="body">
    <div class="qa-overlay" @click.self="$emit('close')">
      <div class="qa-modal">
        <header class="qa-head">
          <span class="qa-icon"><component :is="config.icon" :size="18" /></span>
          <div class="qa-heading">
            <h3 class="qa-title">{{ config.title }}</h3>
            <p class="qa-sub">{{ config.sub }}</p>
          </div>
          <button class="qa-close" :aria-label="labels.close" @click="$emit('close')">
            <X :size="18" />
          </button>
        </header>

        <div class="qa-body">
          <!-- Log a transaction -->
          <template v-if="action === 'log'">
            <div class="qa-row">
              <button
                type="button"
                class="qa-toggle"
                :class="{ active: form.type === 'expense' }"
                @click="form.type = 'expense'"
              >
                {{ labels.expense }}
              </button>
              <button
                type="button"
                class="qa-toggle"
                :class="{ active: form.type === 'income' }"
                @click="form.type = 'income'"
              >
                {{ labels.income }}
              </button>
            </div>
            <label class="qa-field">
              <span class="qa-label">{{ labels.amount }}</span>
              <input
                v-model.number="form.amount"
                type="number"
                step="0.01"
                min="0"
                class="qa-input"
              />
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.whatFor }}</span>
              <input
                v-model="form.description"
                type="text"
                class="qa-input"
                :placeholder="labels.coffeePlaceholder"
              />
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.wallet }} ({{ labels.optional }})</span>
              <select v-model="form.walletId" class="qa-input">
                <option :value="null">{{ labels.defaultOption }}</option>
                <option v-for="w in wallets" :key="w.id" :value="w.id">{{ w.name }}</option>
              </select>
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.party }} ({{ labels.optional }})</span>
              <select v-model="form.partyId" class="qa-input">
                <option :value="null">{{ labels.noneOption }}</option>
                <option v-for="p in parties" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.when }} ({{ labels.optional }})</span>
              <input v-model="form.date" type="date" class="qa-input" />
            </label>
          </template>

          <!-- Transfer money -->
          <template v-else-if="action === 'transfer'">
            <label class="qa-field">
              <span class="qa-label">{{ labels.amount }}</span>
              <input
                v-model.number="form.amount"
                type="number"
                step="0.01"
                min="0"
                class="qa-input"
              />
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.fromWallet }}</span>
              <select v-model="form.fromWalletId" class="qa-input">
                <option :value="null" disabled>{{ labels.selectWallet }}</option>
                <option v-for="w in wallets" :key="w.id" :value="w.id">
                  {{ w.name }} ({{ w.currency }})
                </option>
              </select>
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.toWallet }}</span>
              <select v-model="form.toWalletId" class="qa-input">
                <option :value="null" disabled>{{ labels.selectWallet }}</option>
                <option v-for="w in wallets" :key="w.id" :value="w.id">
                  {{ w.name }} ({{ w.currency }})
                </option>
              </select>
            </label>
            <label v-if="needsRate" class="qa-field">
              <span class="qa-label">{{ labels.exchangeRate }}</span>
              <input
                v-model.number="form.exchangeRate"
                type="number"
                step="0.0001"
                min="0"
                class="qa-input"
              />
            </label>
          </template>

          <!-- Build a report -->
          <template v-else-if="action === 'report'">
            <label class="qa-field">
              <span class="qa-label">{{ labels.period }}</span>
              <select v-model="form.period" class="qa-input">
                <option value="this month">{{ labels.thisMonth }}</option>
                <option value="last month">{{ labels.lastMonth }}</option>
                <option value="this year">{{ labels.thisYear }}</option>
              </select>
            </label>
            <label class="qa-field">
              <span class="qa-label">{{ labels.focus }} ({{ labels.optional }})</span>
              <input
                v-model="form.focus"
                type="text"
                class="qa-input"
                :placeholder="labels.focusPlaceholder"
              />
            </label>
          </template>

          <!-- Import a document -->
          <template v-else-if="action === 'import'">
            <div class="qa-field">
              <span class="qa-label">{{ labels.document }}</span>
              <button type="button" class="qa-file" @click="fileInput?.click()">
                <Upload :size="16" />
                <span>{{ fileName || labels.chooseFile }}</span>
              </button>
              <input
                ref="fileInput"
                type="file"
                accept="image/*,.pdf,.csv"
                class="qa-file-input"
                @change="onFile"
              />
            </div>
            <label class="qa-field">
              <span class="qa-label">{{ labels.anythingToAdd }} ({{ labels.optional }})</span>
              <input
                v-model="form.prompt"
                type="text"
                class="qa-input"
                :placeholder="labels.importPromptPlaceholder"
              />
            </label>
          </template>
        </div>

        <div class="qa-actions">
          <button class="qa-btn qa-cancel" @click="$emit('close')">{{ labels.cancel }}</button>
          <button class="qa-btn qa-submit" :disabled="!canSubmit || busy" @click="submit">
            {{ busy ? labels.working : submitLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { X, PlusCircle, ArrowLeftRight, FileBarChart, FileUp, Upload } from 'lucide-vue-next';

const props = defineProps({
  action: {
    type: String,
    required: true,
    validator: (v) => ['log', 'transfer', 'report', 'import'].includes(v)
  },
  wallets: { type: Array, default: () => [] },
  parties: { type: Array, default: () => [] },
  busy: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      close: 'Close',
      expense: 'Expense',
      income: 'Income',
      amount: 'Amount',
      whatFor: 'What for?',
      coffeePlaceholder: 'e.g. coffee',
      wallet: 'Wallet',
      optional: 'optional',
      defaultOption: 'Default',
      party: 'Party',
      noneOption: 'None',
      when: 'When',
      fromWallet: 'From wallet',
      toWallet: 'To wallet',
      selectWallet: 'Select a wallet',
      exchangeRate: 'Exchange rate',
      period: 'Period',
      thisMonth: 'This month',
      lastMonth: 'Last month',
      thisYear: 'This year',
      focus: 'Focus',
      focusPlaceholder: 'e.g. dining, subscriptions',
      document: 'Document',
      chooseFile: 'Choose a file',
      anythingToAdd: 'Anything to add?',
      importPromptPlaceholder: 'e.g. this is a bank statement for June',
      cancel: 'Cancel',
      working: 'Working…',
      save: 'Save',
      askTrakli: 'Ask Trakli',
      titles: {
        logTitle: 'Log a transaction',
        logSub: "Fill in the details and I'll record it",
        transferTitle: 'Transfer money',
        transferSub: 'Move money between your wallets',
        reportTitle: 'Build a report',
        reportSub: 'Pick what to summarise',
        importTitle: 'Import a document',
        importSub: 'Upload a statement, invoice or receipt to extract'
      }
    })
  }
});

const emit = defineEmits(['close', 'submit']);

const fileInput = ref(null);
const fileName = ref('');
const file = ref(null);

const form = reactive({
  type: 'expense',
  amount: null,
  description: '',
  walletId: null,
  partyId: null,
  date: '',
  fromWalletId: null,
  toWalletId: null,
  exchangeRate: null,
  period: 'this month',
  focus: '',
  prompt: ''
});

const CONFIG = computed(() => ({
  log: {
    icon: PlusCircle,
    title: props.labels.titles.logTitle,
    sub: props.labels.titles.logSub
  },
  transfer: {
    icon: ArrowLeftRight,
    title: props.labels.titles.transferTitle,
    sub: props.labels.titles.transferSub
  },
  report: {
    icon: FileBarChart,
    title: props.labels.titles.reportTitle,
    sub: props.labels.titles.reportSub
  },
  import: {
    icon: FileUp,
    title: props.labels.titles.importTitle,
    sub: props.labels.titles.importSub
  }
}));

const config = computed(() => CONFIG.value[props.action]);
const isDirect = computed(() => props.action === 'log' || props.action === 'transfer');
const submitLabel = computed(() => (isDirect.value ? props.labels.save : props.labels.askTrakli));

const walletById = (id) => props.wallets.find((w) => w.id === id);

const needsRate = computed(() => {
  const from = walletById(form.fromWalletId);
  const to = walletById(form.toWalletId);
  return !!from && !!to && from.currency !== to.currency;
});

const onFile = (e) => {
  const f = e.target.files?.[0] ?? null;
  file.value = f;
  fileName.value = f?.name ?? '';
};

const canSubmit = computed(() => {
  if (props.action === 'log') return typeof form.amount === 'number' && form.amount > 0;
  if (props.action === 'transfer') {
    return (
      typeof form.amount === 'number' &&
      form.amount > 0 &&
      !!form.fromWalletId &&
      !!form.toWalletId &&
      form.fromWalletId !== form.toWalletId &&
      (!needsRate.value || (typeof form.exchangeRate === 'number' && form.exchangeRate > 0))
    );
  }
  if (props.action === 'import') return !!file.value;
  return true;
});

const submit = () => {
  if (!canSubmit.value || props.busy) return;
  emit('submit', { action: props.action, form: { ...form }, file: file.value });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.qa-overlay {
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: $spacing-4;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.qa-modal {
  width: 100%;
  max-width: 440px;
  margin: auto;
  background: $bg-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  overflow: hidden;
}

.qa-head {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-4;
  border-bottom: 1px solid $border-light;
}

.qa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: $primary-light;
  color: $primary;
  flex-shrink: 0;
}

.qa-heading {
  flex: 1;
  min-width: 0;
}

.qa-title {
  margin: 0;
  font-size: $font-size-base;
  font-weight: $font-bold;
  color: $text-primary;
}

.qa-sub {
  margin: 0;
  font-size: $font-size-xs;
  color: $text-muted;
}

.qa-close {
  border: none;
  background: transparent;
  color: $text-muted;
  cursor: pointer;
  display: inline-flex;
  padding: 4px;
  border-radius: 8px;

  &:hover {
    background: $bg-gray;
    color: $text-secondary;
  }
}

.qa-body {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  padding: $spacing-4;
}

.qa-row {
  display: flex;
  gap: $spacing-2;
}

.qa-toggle {
  flex: 1;
  padding: $spacing-2;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  background: $bg-white;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  cursor: pointer;
  transition: $transition-base;

  &.active {
    background: $primary-light;
    border-color: $primary;
    color: $primary;
  }
}

.qa-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.qa-label {
  font-size: $font-size-xs;
  color: $text-muted;
}

.qa-input {
  padding: 8px 10px;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  background: $bg-white;
  color: $text-primary;
  font-size: $font-size-sm;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.qa-file {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  padding: 8px 10px;
  border: 1px dashed $primary-muted;
  border-radius: $radius-md;
  background: $bg-light;
  color: $text-secondary;
  font-size: $font-size-sm;
  cursor: pointer;
  width: 100%;

  &:hover {
    border-color: $primary;
    color: $primary;
  }
}

.qa-file-input {
  display: none;
}

.qa-actions {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-2;
  padding: $spacing-3 $spacing-4;
  border-top: 1px solid $border-light;
}

.qa-btn {
  border: none;
  border-radius: $radius-md;
  padding: $spacing-2 $spacing-4;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.qa-cancel {
  background: $bg-gray;
  color: $text-secondary;
}

.qa-submit {
  background: $primary;
  color: $text-inverse;
}
</style>
