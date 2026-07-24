<template>
  <TForm
    :title="editingItem ? labels.editBudget : labels.createBudget"
    :api-error="apiError"
    :is-submitting="isSubmitting"
    :submit-label="editingItem ? labels.updateBudget : labels.createBudget"
    :cancel-label="labels.cancel"
    @submit="handleSubmit"
    @close="$emit('close')"
  >
    <TFormRow :cols="2">
      <TFormField :label="labels.budgetName" field-id="budget-name" required>
        <TFormInput
          id="budget-name"
          v-model="form.name"
          type="text"
          maxlength="255"
        />
      </TFormField>

      <TFormField
        :label="labels.spendingLimit"
        field-id="budget-limit"
        :hint="currencyOptions.length === 0 ? labels.addWalletFirst : ''"
        required
      >
        <div class="amount-row">
          <TFormInput
            id="budget-limit"
            v-model.number="form.amount"
            type="number"
            :min="0"
            :step="0.01"
          />
          <TFormSelect
            v-model="form.currency"
            :options="currencySelectOptions"
            class="currency-select"
          />
        </div>
      </TFormField>
    </TFormRow>

    <TFormRow :cols="form.period_type === 'custom' ? 3 : 2">
      <TFormField :label="labels.budgetPeriod" field-id="budget-period">
        <TFormSelect
          id="budget-period"
          v-model="form.period_type"
          :options="periodOptions"
        />
      </TFormField>

      <TFormField :label="labels.startDate" field-id="budget-start" required>
        <TFormInput
          id="budget-start"
          v-model="form.start_date"
          type="date"
        />
      </TFormField>

      <TFormField
        v-if="form.period_type === 'custom'"
        :label="labels.endDate"
        field-id="budget-end"
        required
      >
        <TFormInput
          id="budget-end"
          v-model="form.end_date"
          type="date"
        />
      </TFormField>
    </TFormRow>

    <TFormField :label="labels.budgetDescription" field-id="budget-desc" full>
      <TFormTextarea
        id="budget-desc"
        v-model="form.description"
        :rows="2"
        :maxlength="500"
      />
    </TFormField>

    <TFormField
      :label="labels.budgetTargets"
      :hint="labels.budgetTargetsHint"
      full
    >
      <div class="target-tabs">
        <button
          v-for="tab in targetTabs"
          :key="tab.key"
          type="button"
          class="tab"
          :class="{ active: activeTargetTab === tab.key }"
          @click="activeTargetTab = tab.key"
        >
          {{ labels.targetTabs?.[tab.key] || tab.label }}
          <span class="count">{{ selectedCount(tab.key) }}</span>
        </button>
      </div>
      <div class="target-list">
        <label
          v-for="item in targetItems"
          :key="`${activeTargetTab}-${item.id}`"
          class="target-row"
        >
          <input
            type="checkbox"
            :checked="isSelected(activeTargetTab, item.id)"
            @change="toggleTarget(activeTargetTab, item.id)"
          />
          <span>{{ item.name }}</span>
        </label>
        <p v-if="targetItems.length === 0" class="empty-hint">
          {{ labels.noItemsToChoose }}
        </p>
      </div>
    </TFormField>

    <TFormRow :cols="2">
      <TFormField :hint="labels.rolloverHint">
        <label class="inline-toggle">
          <input v-model="form.rollover_enabled" type="checkbox" />
          <span>{{ labels.rolloverUnused }}</span>
        </label>
      </TFormField>

      <TFormField
        :label="`${labels.alertThreshold} ${form.threshold_percent > 0 ? '(' + form.threshold_percent + '%)' : '— ' + labels.off}`"
        :hint="labels.alertThresholdHint"
      >
        <input
          v-model.number="form.threshold_percent"
          type="range"
          min="0"
          max="100"
          step="5"
          class="range-input"
        />
      </TFormField>
    </TFormRow>

    <TFormRow :cols="2">
      <TFormField :hint="labels.forecastAlertsHint">
        <label class="inline-toggle">
          <input v-model="form.forecast_alerts_enabled" type="checkbox" />
          <span>{{ labels.forecastAlerts }}</span>
        </label>
      </TFormField>

      <TFormField>
        <label class="inline-toggle">
          <input v-model="form.is_active" type="checkbox" />
          <span>{{ labels.active }}</span>
        </label>
      </TFormField>
    </TFormRow>
  </TForm>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import TForm from './TForm.vue';
import TFormField from './TFormField.vue';
import TFormRow from './TFormRow.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import TFormTextarea from './TFormTextarea.vue';

const props = withDefaults(
  defineProps<{
    editingItem?: any;
    apiError?: string;
    isSubmitting?: boolean;
    defaults?: {
      threshold?: number;
      rollover?: boolean;
      period?: string;
      forecast?: boolean;
      currency?: string;
    };
    wallets?: Array<{ id?: number; name?: string; currency?: string }>;
    categories?: Array<{ id: number; name: string }>;
    groups?: Array<{ id: number; name: string }>;
    labels?: {
      editBudget: string;
      createBudget: string;
      budgetName: string;
      spendingLimit: string;
      addWalletFirst: string;
      budgetPeriod: string;
      weekly: string;
      monthly: string;
      yearly: string;
      customRange: string;
      startDate: string;
      endDate: string;
      budgetDescription: string;
      budgetTargets: string;
      budgetTargetsHint: string;
      targetTabs: Record<string, string>;
      noItemsToChoose: string;
      rolloverUnused: string;
      rolloverHint: string;
      alertThreshold: string;
      off: string;
      alertThresholdHint: string;
      forecastAlerts: string;
      forecastAlertsHint: string;
      active: string;
      cancel: string;
      updateBudget: string;
    };
  }>(),
  {
    editingItem: null,
    apiError: '',
    isSubmitting: false,
    defaults: () => ({}),
    wallets: () => [],
    categories: () => [],
    groups: () => [],
    labels: () => ({
      editBudget: 'Edit Budget',
      createBudget: 'Create Budget',
      budgetName: 'Budget Name',
      spendingLimit: 'Spending Limit',
      addWalletFirst: 'Add a wallet first',
      budgetPeriod: 'Budget Period',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      customRange: 'Custom Range',
      startDate: 'Start Date',
      endDate: 'End Date',
      budgetDescription: 'Budget Description',
      budgetTargets: 'Budget Targets',
      budgetTargetsHint: 'Limit applies across selected items',
      targetTabs: {},
      noItemsToChoose: 'No items available',
      rolloverUnused: 'Rollover unused balance',
      rolloverHint: 'Carry over unspent budget to the next period',
      alertThreshold: 'Alert Threshold',
      off: 'Off',
      alertThresholdHint: 'Notify when spending reaches this %',
      forecastAlerts: 'Forecast Alerts',
      forecastAlertsHint: 'Warn if pace exceeds limit',
      active: 'Active',
      cancel: 'Cancel',
      updateBudget: 'Update Budget'
    })
  }
);

const emit = defineEmits<{
  (e: 'created' | 'updated', payload: any): void;
  (e: 'close'): void;
}>();

const defaultCurrency = computed(() => props.defaults?.currency ?? 'USD');
const toDateInput = (value: string): string => (value ? value.slice(0, 10) : '');

const currencyOptions = computed<string[]>(() => {
  const wallets = (props.wallets ?? []) as Array<{ currency?: string }>;
  const codes = new Set<string>();
  for (const w of wallets) {
    if (w.currency) codes.add(w.currency.toUpperCase());
  }
  if (codes.size === 0 && defaultCurrency.value) {
    codes.add(defaultCurrency.value.toUpperCase());
  }
  return Array.from(codes).sort();
});

const currencySelectOptions = computed(() =>
  currencyOptions.value.map((c) => ({ label: c, value: c }))
);

const periodOptions = computed(() => [
  { label: props.labels.weekly, value: 'weekly' },
  { label: props.labels.monthly, value: 'monthly' },
  { label: props.labels.yearly, value: 'yearly' },
  { label: props.labels.customRange, value: 'custom' }
]);

const buildInitial = () => ({
  name: '',
  description: '',
  amount: 0,
  currency: defaultCurrency.value,
  period_type: (props.defaults?.period ?? 'monthly') as string,
  start_date: new Date().toISOString().slice(0, 10),
  end_date: null as string | null,
  rollover_enabled: props.defaults?.rollover ?? false,
  threshold_percent: props.defaults?.threshold ?? 80,
  forecast_alerts_enabled: props.defaults?.forecast ?? true,
  is_active: true,
  targets: [] as Array<{ type: string; id: number }>
});

const form = reactive(buildInitial());

watch(
  currencyOptions,
  (options) => {
    if (!props.editingItem && options.length > 0 && !options.includes(form.currency)) {
      form.currency = options[0];
    }
  },
  { immediate: true }
);

watch(
  () => props.editingItem,
  (item) => {
    if (!item) {
      Object.assign(form, buildInitial());
      if (currencyOptions.value.length > 0 && !currencyOptions.value.includes(form.currency)) {
        form.currency = currencyOptions.value[0];
      }
      return;
    }
    form.name = item.name;
    form.description = item.description ?? '';
    form.amount = Number(item.amount);
    form.currency = item.currency;
    form.period_type = item.period_type;
    form.start_date = toDateInput(item.start_date);
    form.end_date = item.end_date ? toDateInput(item.end_date) : null;
    form.rollover_enabled = item.rollover_enabled;
    form.threshold_percent = item.threshold_percent;
    form.forecast_alerts_enabled = item.forecast_alerts_enabled;
    form.is_active = item.is_active;
    form.targets = (item.targets ?? []).map((tgt: any) => ({ type: tgt.type, id: tgt.id }));
  },
  { immediate: true }
);

const targetTabs: Array<{ key: string; label: string }> = [
  { key: 'category', label: 'Categories' },
  { key: 'group', label: 'Groups' },
  { key: 'wallet', label: 'Wallets' }
];

const activeTargetTab = ref<string>('category');

const targetItems = computed(() => {
  switch (activeTargetTab.value) {
    case 'category':
      return (props.categories ?? []).map((c: any) => ({ id: c.id, name: c.name }));
    case 'group':
      return (props.groups ?? []).map((g: any) => ({ id: g.id, name: g.name }));
    case 'wallet':
      return (props.wallets ?? []).map((w: any) => ({ id: w.id, name: w.name }));
    default:
      return [];
  }
});

const isSelected = (type: string, id: number) =>
  form.targets.some((t) => t.type === type && t.id === id);

const toggleTarget = (type: string, id: number) => {
  const idx = form.targets.findIndex((t) => t.type === type && t.id === id);
  if (idx >= 0) {
    form.targets.splice(idx, 1);
  } else {
    form.targets.push({ type, id });
  }
};

const selectedCount = (type: string) => form.targets.filter((t) => t.type === type).length;

const canSubmit = computed(() => {
  if (!form.name.trim()) return false;
  if (!form.amount || form.amount <= 0) return false;
  if (!form.start_date) return false;
  if (form.period_type === 'custom' && !form.end_date) return false;
  return true;
});

const handleSubmit = () => {
  if (props.isSubmitting || !canSubmit.value) return;

  const payload = {
    name: form.name.trim(),
    description: form.description.trim() || undefined,
    amount: form.amount,
    currency: form.currency,
    period_type: form.period_type,
    start_date: form.start_date,
    end_date: form.period_type === 'custom' ? form.end_date : undefined,
    rollover_enabled: form.rollover_enabled,
    threshold_percent: form.threshold_percent,
    forecast_alerts_enabled: form.forecast_alerts_enabled,
    is_active: form.is_active,
    targets: form.targets
  };

  if (props.editingItem) {
    emit('updated', { id: props.editingItem.id, ...payload });
  } else {
    emit('created', payload);
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.amount-row {
  display: flex;
  gap: $spacing-2;

  .currency-select {
    width: 110px;
    flex-shrink: 0;
  }
}

.target-tabs {
  display: flex;
  gap: $spacing-2;
  margin-bottom: $spacing-3;

  .tab {
    padding: $spacing-2 $spacing-3;
    border-radius: $radius-lg;
    background: $bg-gray;
    border: 1px solid $border-color;
    cursor: pointer;
    font-size: $font-size-sm;
    font-weight: $font-medium;
    color: $text-primary;

    &.active {
      background: $primary;
      color: $text-inverse;
      border-color: $primary;

      .count {
        background: rgba(255, 255, 255, 0.25);
        color: $text-inverse;
      }
    }

    .count {
      margin-left: $spacing-1;
      padding: 2px 6px;
      border-radius: $radius-sm;
      background: $border-color;
      font-size: $font-size-xs;
    }
  }
}

.target-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  max-height: 160px;
  overflow-y: auto;
  padding: $spacing-2;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
}

.target-row {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  font-size: $font-size-sm;
  cursor: pointer;
}

.inline-toggle {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  cursor: pointer;
}

.range-input {
  width: 100%;
  accent-color: $primary;
}

.empty-hint {
  font-size: $font-size-sm;
  color: $text-muted;
  margin: 0;
}
</style>
