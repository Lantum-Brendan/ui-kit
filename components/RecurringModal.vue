<template>
  <TModal :model-value="isOpen" size="md" @close="handleCancel">
    <TModalHeader
      :title="isCurrentlyRecurring ? labels.updateRecurrence : labels.makeRecurring"
      @close="handleCancel"
    />
    <TModalBody>
      <div v-if="isCurrentlyRecurring" class="current-status">
        <RefreshCwIcon class="status-icon" />
        <span class="status-text">
          {{ labels.repeatEvery }} {{ transaction?.recurrenceInterval || 1 }}
          {{ periodLabel(transaction?.recurrencePeriod) }}
        </span>
      </div>

      <form id="recurring-form" @submit.prevent="handleSave">
        <TFormField :label="labels.recurrencePeriod">
          <TFormSelect v-model="form.period" :options="periodOptions" />
        </TFormField>

        <TFormField :label="labels.repeatEvery">
          <div class="interval-row">
            <TFormInput v-model.number="form.interval" type="number" min="1" required />
            <span class="interval-unit">{{ unitLabel }}</span>
          </div>
        </TFormField>

        <TFormField :label="labels.endDate">
          <div class="end-date-row">
            <label class="checkbox-label">
              <input v-model="hasEndDate" type="checkbox" />
              <span>{{ labels.noEndDate }}</span>
            </label>
            <TFormInput v-if="!hasEndDate" v-model="form.endsAt" type="date" />
          </div>
        </TFormField>
      </form>
    </TModalBody>
    <TModalFooter align="between">
      <button
        v-if="isCurrentlyRecurring"
        type="button"
        class="btn btn-danger"
        @click="handleRemove"
      >
        {{ labels.removeRecurrence }}
      </button>
      <div v-else></div>
      <div class="actions-right">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          {{ labels.cancel }}
        </button>
        <button type="submit" form="recurring-form" class="btn btn-primary">
          {{ isCurrentlyRecurring ? labels.updateRecurrence : labels.makeRecurring }}
        </button>
      </div>
    </TModalFooter>
  </TModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TModal from './TModal.vue';
import TModalHeader from './TModalHeader.vue';
import TModalBody from './TModalBody.vue';
import TModalFooter from './TModalFooter.vue';
import TFormField from './TFormField.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import { RefreshCw as RefreshCwIcon } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  transaction: {
    type: Object,
    default: null
  },
  labels: {
    type: Object,
    default: () => ({
      updateRecurrence: 'Update recurrence',
      makeRecurring: 'Make recurring',
      repeatEvery: 'Repeat every',
      recurrencePeriod: 'Recurrence period',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      endDate: 'End date',
      noEndDate: 'No end date',
      removeRecurrence: 'Remove recurrence',
      cancel: 'Cancel'
    })
  }
});

const emit = defineEmits(['save', 'remove', 'cancel']);

const form = ref({
  period: 'monthly',
  interval: 1,
  endsAt: ''
});

const hasEndDate = ref(true);

const periodOptions = computed(() => [
  { label: props.labels.daily, value: 'daily' },
  { label: props.labels.weekly, value: 'weekly' },
  { label: props.labels.monthly, value: 'monthly' },
  { label: props.labels.yearly, value: 'yearly' }
]);

const isCurrentlyRecurring = computed(() => {
  return props.transaction && (props.transaction.isRecurring || props.transaction.is_recurring);
});

const unitLabel = computed(() => {
  const p = form.value.period;
  const count = form.value.interval || 1;
  if (p === 'daily') return count === 1 ? 'day' : 'days';
  if (p === 'weekly') return count === 1 ? 'week' : 'weeks';
  if (p === 'monthly') return count === 1 ? 'month' : 'months';
  if (p === 'yearly') return count === 1 ? 'year' : 'years';
  return '';
});

function periodLabel(p) {
  if (p === 'daily') return props.labels.daily;
  if (p === 'weekly') return props.labels.weekly;
  if (p === 'monthly') return props.labels.monthly;
  if (p === 'yearly') return props.labels.yearly;
  return p;
}

watch(
  () => props.transaction,
  (txn) => {
    if (txn && (txn.isRecurring || txn.is_recurring)) {
      form.value.period = txn.recurrencePeriod || txn.recurrence_period || 'monthly';
      form.value.interval = txn.recurrenceInterval || txn.recurrence_interval || 1;
      const ends = txn.recurrenceEndsAt || txn.recurrence_ends_at;
      if (ends) {
        hasEndDate.value = false;
        form.value.endsAt = ends.slice(0, 10);
      } else {
        hasEndDate.value = true;
        form.value.endsAt = '';
      }
    } else {
      form.value = { period: 'monthly', interval: 1, endsAt: '' };
      hasEndDate.value = true;
    }
  },
  { immediate: true }
);

function handleSave() {
  emit('save', {
    period: form.value.period,
    interval: form.value.interval,
    endsAt: hasEndDate.value ? null : form.value.endsAt || null
  });
}

function handleRemove() {
  emit('remove');
}

function handleCancel() {
  emit('cancel');
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.current-status {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-3;
  background: $bg-slate;
  border-radius: $radius-lg;
  margin-bottom: $spacing-4;
  color: $primary;
  font-size: $font-size-sm;
}

.status-icon {
  width: 16px;
  height: 16px;
}

.interval-row {
  display: flex;
  align-items: center;
  gap: $spacing-2;

  .interval-unit {
    font-size: $font-size-sm;
    color: $text-secondary;
  }
}

.end-date-row {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  font-size: $font-size-sm;
  cursor: pointer;
}

.actions-right {
  display: flex;
  gap: $spacing-2;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: $radius-md;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 0.875rem;

  &-secondary {
    background: $bg-white;
    color: $text-secondary;
    border-color: $border-light;
  }

  &-primary {
    background: $primary;
    color: $text-inverse;
  }

  &-danger {
    background: $error-color;
    color: $text-inverse;
  }
}
</style>
