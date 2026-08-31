<template>
  <tr class="editor-row">
    <td class="col-idx">#</td>
    <td class="col-date">
      <input
        v-model="form.date"
        type="datetime-local"
        class="editor-input"
        :class="{ 'editor-input--error': errors.date }"
        :aria-label="labels.dateCol"
      />
      <span v-if="errors.date" class="editor-error">{{ errors.date }}</span>
    </td>
    <td class="col-type">
      <select v-model="form.type" class="editor-input">
        <option value="income">income</option>
        <option value="expense">expense</option>
      </select>
    </td>
    <td class="col-amount">
      <input
        v-model="form.amount"
        type="number"
        step="0.01"
        class="editor-input editor-input--amount"
        :class="{ 'editor-input--error': errors.amount }"
        :aria-label="labels.amountCol"
        placeholder="0.00"
      />
      <span v-if="errors.amount" class="editor-error">{{ errors.amount }}</span>
    </td>
    <td class="col-currency">
      <select v-model="form.currency" class="editor-input">
        <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
      </select>
    </td>
    <td class="col-desc">
      <input
        v-model="form.description"
        type="text"
        class="editor-input"
        :placeholder="labels.descCol"
      />
    </td>
    <td class="col-cat">
      <input
        v-model="form.category"
        type="text"
        class="editor-input"
        :class="{ 'editor-input--error': errors.category }"
        :placeholder="labels.catCol"
      />
      <span v-if="errors.category" class="editor-error">{{ errors.category }}</span>
    </td>
    <td class="col-wallet" colspan="2">
      <div class="editor-actions">
        <button type="button" class="editor-btn editor-btn--save" @click="handleSave">
          {{ labels.save ?? 'Save' }}
        </button>
        <button type="button" class="editor-btn editor-btn--cancel" @click="$emit('cancel')">
          {{ labels.cancel ?? 'Cancel' }}
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  editingRow: { type: Object, default: null },
  labels: { type: Object, required: true },
  currencies: { type: Array, default: () => ['USD', 'EUR', 'GBP'] }
});

const emit = defineEmits(['save', 'cancel']);

const form = reactive({
  amount: '',
  date: '',
  category: '',
  currency: props.currencies[0] ?? 'USD',
  description: '',
  type: 'expense'
});

const errors = reactive({
  amount: '',
  date: '',
  category: ''
});

watch(
  () => props.editingRow,
  (row) => {
    if (row) {
      form.amount = row.amount != null ? String(row.amount) : '';
      form.date = row.datetime ? toLocalDatetime(row.datetime) : '';
      form.category = (row.categories ?? []).map((c) => c.name).join(', ');
      form.currency = row.wallet?.currency ?? props.currencies[0] ?? 'USD';
      form.description = row.description ?? '';
      form.type = row.type ?? 'expense';
      errors.amount = '';
      errors.date = '';
      errors.category = '';
    }
  },
  { immediate: true }
);

const toLocalDatetime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const validate = () => {
  let valid = true;
  errors.amount = '';
  errors.date = '';
  errors.category = '';

  const amt = Number(form.amount);
  if (!form.amount || !Number.isFinite(amt)) {
    errors.amount = 'Amount is required';
    valid = false;
  } else if (amt <= 0) {
    errors.amount = 'Amount must be > 0';
    valid = false;
  }

  if (form.date) {
    const d = new Date(form.date);
    if (isNaN(d.getTime())) {
      errors.date = 'Invalid date';
      valid = false;
    }
  }

  if (form.category && form.category.length > 100) {
    errors.category = 'Category too long';
    valid = false;
  }

  return valid;
};

const handleSave = () => {
  if (!validate()) return;
  emit('save', {
    ...props.editingRow,
    amount: Number(form.amount),
    datetime: form.date ? new Date(form.date).toISOString() : props.editingRow?.datetime,
    description: form.description,
    categories: form.category
      ? form.category.split(',').map((s) => ({ name: s.trim() })).filter((c) => c.name)
      : [],
    wallet: { ...(props.editingRow?.wallet ?? {}), currency: form.currency },
    type: form.type
  });
};

const onKey = (e) => {
  if (e.key === 'Enter') handleSave();
  if (e.key === 'Escape') emit('cancel');
};

defineExpose({ validate });
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.editor-row {
  background: rgba(var(--color-primary-rgb), 0.04);

  td {
    padding: 4px 6px;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
    vertical-align: top;
  }
}

.editor-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  background: $input-bg;
  color: $text-primary;
  font-size: 12px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.12);
  }

  &--error {
    border-color: $error-color;
    background: rgba(var(--color-error-rgb), 0.06);
  }

  &--amount {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
}

.editor-error {
  display: block;
  margin-top: 2px;
  font-size: 10px;
  color: $error-color;
  line-height: 1.2;
}

.editor-actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.editor-btn {
  padding: 4px 10px;
  border-radius: $radius-md;
  border: 1px solid $border-color;
  font-size: 11px;
  font-weight: $font-semibold;
  cursor: pointer;

  &--save {
    background: $primary;
    color: white;
    border-color: $primary;

    &:hover {
      background: $primary-hover;
    }
  }

  &--cancel {
    background: $bg-white;
    color: $text-muted;

    &:hover {
      color: $primary;
      border-color: $primary-muted;
    }
  }
}
</style>
