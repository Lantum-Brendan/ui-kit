<template>
  <TForm
    :title="isEditing ? labels.editReminder : labels.createReminder"
    :api-error="props.apiError"
    :is-submitting="props.isSubmitting"
    :submit-label="isEditing ? labels.updateReminder : labels.createReminder"
    :cancel-label="labels.cancel"
    @submit="handleSubmit"
    @close="$emit('close')"
  >
    <TFormField :label="labels.title" field-id="reminder-title" required>
      <TFormInput
        id="reminder-title"
        v-model="form.title"
        :placeholder="labels.titlePlaceholder"
        :error="!!props.apiError"
      />
    </TFormField>

    <TFormField :label="labels.description" field-id="reminder-desc">
      <TFormTextarea
        id="reminder-desc"
        v-model="form.description"
        :placeholder="labels.descriptionPlaceholder"
        :rows="3"
      />
    </TFormField>

    <TFormRow :cols="2">
      <TFormField :label="labels.type" field-id="reminder-type" required>
        <TFormSelect
          id="reminder-type"
          v-model="form.type"
          :options="typeOptions"
        />
      </TFormField>

      <TFormField :label="labels.priority" field-id="reminder-priority">
        <TFormSelect
          id="reminder-priority"
          v-model.number="form.priority"
          :options="priorityOptions"
        />
      </TFormField>
    </TFormRow>

    <TFormRow :cols="2">
      <TFormField :label="labels.dateTime" field-id="reminder-trigger" required>
        <TFormInput
          id="reminder-trigger"
          v-model="form.trigger_at"
          type="datetime-local"
        />
      </TFormField>

      <TFormField :label="labels.timezone" field-id="reminder-tz">
        <TFormSelect
          id="reminder-tz"
          v-model="form.timezone"
          :options="timezoneOptions"
        />
      </TFormField>
    </TFormRow>

    <TFormField :label="labels.repeat" field-id="reminder-repeat">
      <TFormSelect
        id="reminder-repeat"
        v-model="repeatOption"
        :options="repeatSelectOptions"
      />
    </TFormField>
  </TForm>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import TForm from './TForm.vue';
import TFormField from './TFormField.vue';
import TFormRow from './TFormRow.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import TFormTextarea from './TFormTextarea.vue';

const props = defineProps({
  editingItem: {
    type: Object,
    default: null
  },
  apiError: {
    type: String,
    default: ''
  },
  isSubmitting: {
    type: Boolean,
    default: false
  },
  labels: {
    type: Object,
    default: () => ({
      editReminder: 'Edit Reminder',
      createReminder: 'Create Reminder',
      title: 'Title',
      titlePlaceholder: 'e.g., Review weekly expenses',
      description: 'Description',
      descriptionPlaceholder: 'Optional details about this reminder',
      type: 'Type',
      dailyTracking: 'Daily Tracking',
      weeklyReview: 'Weekly Review',
      monthlySummary: 'Monthly Summary',
      billDue: 'Bill Due',
      budgetAlert: 'Budget Alert',
      custom: 'Custom',
      priority: 'Priority',
      normal: 'Normal',
      high: 'High',
      urgent: 'Urgent',
      dateTime: 'Date & Time',
      timezone: 'Timezone',
      repeat: 'Repeat',
      doesNotRepeat: 'Does not repeat',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      cancel: 'Cancel',
      updateReminder: 'Update Reminder'
    })
  }
});

const emit = defineEmits(['created', 'updated', 'close']);

const isEditing = computed(() => !!props.editingItem);
const repeatOption = ref('none');

const form = reactive({
  title: '',
  description: '',
  type: 'custom',
  trigger_at: '',
  timezone: 'UTC',
  priority: 0,
  repeat_rule: null
});

const repeatRules = {
  none: null,
  daily: 'FREQ=DAILY',
  weekly: 'FREQ=WEEKLY',
  monthly: 'FREQ=MONTHLY'
};

const typeOptions = computed(() => [
  { label: props.labels.dailyTracking, value: 'daily_tracking' },
  { label: props.labels.weeklyReview, value: 'weekly_review' },
  { label: props.labels.monthlySummary, value: 'monthly_summary' },
  { label: props.labels.billDue, value: 'bill_due' },
  { label: props.labels.budgetAlert, value: 'budget_alert' },
  { label: props.labels.custom, value: 'custom' }
]);

const priorityOptions = computed(() => [
  { label: props.labels.normal, value: 0 },
  { label: props.labels.high, value: 1 },
  { label: props.labels.urgent, value: 2 }
]);

const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'Eastern Time', value: 'America/New_York' },
  { label: 'Central Time', value: 'America/Chicago' },
  { label: 'Mountain Time', value: 'America/Denver' },
  { label: 'Pacific Time', value: 'America/Los_Angeles' },
  { label: 'London', value: 'Europe/London' },
  { label: 'Paris', value: 'Europe/Paris' },
  { label: 'Tokyo', value: 'Asia/Tokyo' }
];

const repeatSelectOptions = computed(() => [
  { label: props.labels.doesNotRepeat, value: 'none' },
  { label: props.labels.daily, value: 'daily' },
  { label: props.labels.weekly, value: 'weekly' },
  { label: props.labels.monthly, value: 'monthly' }
]);

watch(repeatOption, (val) => {
  form.repeat_rule = repeatRules[val] || null;
});

watch(
  () => props.editingItem,
  (item) => {
    if (item) {
      form.title = item.title || '';
      form.description = item.description || '';
      form.type = item.type || 'custom';
      form.timezone = item.timezone || 'UTC';
      form.priority = item.priority || 0;
      form.repeat_rule = item.repeat_rule || null;

      if (item.trigger_at) {
        const date = new Date(item.trigger_at);
        form.trigger_at = toLocalDateTimeString(date);
      }

      if (item.repeat_rule) {
        if (item.repeat_rule.includes('DAILY')) repeatOption.value = 'daily';
        else if (item.repeat_rule.includes('WEEKLY')) repeatOption.value = 'weekly';
        else if (item.repeat_rule.includes('MONTHLY')) repeatOption.value = 'monthly';
        else repeatOption.value = 'none';
      } else {
        repeatOption.value = 'none';
      }
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.title = '';
  form.description = '';
  form.type = 'custom';
  form.trigger_at = getDefaultDateTime();
  form.timezone = 'UTC';
  form.priority = 0;
  form.repeat_rule = null;
  repeatOption.value = 'none';
}

function toLocalDateTimeString(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function getDefaultDateTime() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  now.setMinutes(0);
  return toLocalDateTimeString(now);
}

function handleSubmit() {
  if (props.isSubmitting) return;

  const data = {
    title: form.title,
    description: form.description || undefined,
    type: form.type,
    trigger_at: new Date(form.trigger_at).toISOString(),
    timezone: form.timezone,
    priority: form.priority,
    repeat_rule: form.repeat_rule || undefined
  };

  if (isEditing.value) {
    emit('updated', { id: props.editingItem.id, ...data });
    return;
  }

  emit('created', data);
}

onMounted(() => {
  if (!props.editingItem) {
    form.trigger_at = getDefaultDateTime();
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
</style>
