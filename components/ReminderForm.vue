<template>
  <div class="reminder-form">
    <div class="form-header">
      <h2>{{ isEditing ? labels.editReminder : labels.createReminder }}</h2>
      <button type="button" class="close-btn" @click="$emit('close')">
        <X />
      </button>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">{{ labels.title }} *</label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          :placeholder="labels.titlePlaceholder"
          required
        />
        <div v-if="props.apiError" class="error-text">{{ props.apiError }}</div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ labels.description }}</label>
        <textarea
          v-model="form.description"
          class="form-input form-textarea"
          :placeholder="labels.descriptionPlaceholder"
          rows="3"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ labels.type }} *</label>
          <select v-model="form.type" class="form-input" required>
            <option value="daily_tracking">{{ labels.dailyTracking }}</option>
            <option value="weekly_review">{{ labels.weeklyReview }}</option>
            <option value="monthly_summary">{{ labels.monthlySummary }}</option>
            <option value="bill_due">{{ labels.billDue }}</option>
            <option value="budget_alert">{{ labels.budgetAlert }}</option>
            <option value="custom">{{ labels.custom }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">{{ labels.priority }}</label>
          <select v-model="form.priority" class="form-input">
            <option :value="0">{{ labels.normal }}</option>
            <option :value="1">{{ labels.high }}</option>
            <option :value="2">{{ labels.urgent }}</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ labels.dateTime }} *</label>
          <input v-model="form.trigger_at" type="datetime-local" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label">{{ labels.timezone }}</label>
          <select v-model="form.timezone" class="form-input">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ labels.repeat }}</label>
        <select v-model="repeatOption" class="form-input">
          <option value="none">{{ labels.doesNotRepeat }}</option>
          <option value="daily">{{ labels.daily }}</option>
          <option value="weekly">{{ labels.weekly }}</option>
          <option value="monthly">{{ labels.monthly }}</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          {{ labels.cancel }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="props.isSubmitting">
          <Loader2 v-if="props.isSubmitting" class="spinner" />
          {{ isEditing ? labels.updateReminder : labels.createReminder }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { X, Loader2 } from 'lucide-vue-next';

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
        form.trigger_at = date.toISOString().slice(0, 16);
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

function getDefaultDateTime() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  now.setMinutes(0);
  return now.toISOString().slice(0, 16);
}

function handleSubmit() {
  if (props.isSubmitting) {
    return;
  }

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

.reminder-form {
  background: $bg-white;
  border-radius: $radius-xl;
  border: 1px solid $border-color;
  box-shadow: $shadow-md;
  padding: 1.5rem;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  h2 {
    font-size: $font-size-lg;
    font-weight: $font-semibold;
    margin: 0;
  }
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $bg-gray;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $border-color;
  }

  svg {
    width: 18px;
    height: 18px;
  }
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.form-label {
  display: block;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  font-size: $font-size-base;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid $border-color;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: $radius-lg;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: $bg-gray;
  color: $text-primary;
  border: 1px solid $border-color;

  &:hover {
    background: $border-color;
  }
}

.btn-primary {
  background: $primary;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.spinner {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
