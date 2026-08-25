<template>
  <div>
    <div v-if="loading" class="loading-state">
      <p>{{ labels.loadingPreferences }}</p>
    </div>

    <div v-else>
      <h3 class="subsection-title">{{ labels.notificationChannels }}</h3>
      <div class="toggle-grid">
        <div class="toggle-item">
          <div class="toggle-info">
            <Mail class="toggle-icon" />
            <div>
              <p class="toggle-label">{{ labels.emailNotifications }}</p>
              <p class="toggle-desc">{{ labels.emailDesc }}</p>
            </div>
          </div>
          <label class="toggle-switch">
            <input
              v-model="localPreferences.channels.email"
              type="checkbox"
              :disabled="!isEditMode"
              @change="handleChange"
            />
            <span class="slider"></span>
          </label>
        </div>

        <div class="toggle-item">
          <div class="toggle-info">
            <Smartphone class="toggle-icon" />
            <div>
              <p class="toggle-label">{{ labels.pushNotifications }}</p>
              <p class="toggle-desc">{{ labels.pushDesc }}</p>
            </div>
          </div>
          <label class="toggle-switch">
            <input
              v-model="localPreferences.channels.push"
              type="checkbox"
              :disabled="!isEditMode"
              @change="handleChange"
            />
            <span class="slider"></span>
          </label>
        </div>

        <div class="toggle-item">
          <div class="toggle-info">
            <Bell class="toggle-icon" />
            <div>
              <p class="toggle-label">{{ labels.inAppNotifications }}</p>
              <p class="toggle-desc">{{ labels.inAppDesc }}</p>
            </div>
          </div>
          <label class="toggle-switch">
            <input
              v-model="localPreferences.channels.inapp"
              type="checkbox"
              :disabled="!isEditMode"
              @change="handleChange"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <h3 class="subsection-title">{{ labels.notificationTypes }}</h3>
      <div class="toggle-grid">
        <div class="toggle-item">
          <div class="toggle-info">
            <Clock class="toggle-icon" />
            <div>
              <p class="toggle-label">{{ labels.reminders }}</p>
              <p class="toggle-desc">{{ labels.remindersDesc }}</p>
            </div>
          </div>
          <label class="toggle-switch">
            <input
              v-model="localPreferences.types.reminders"
              type="checkbox"
              :disabled="!isEditMode"
              @change="handleChange"
            />
            <span class="slider"></span>
          </label>
        </div>

        <div class="toggle-item">
          <div class="toggle-info">
            <TrendingUp class="toggle-icon" />
            <div>
              <p class="toggle-label">{{ labels.financialInsights }}</p>
              <p class="toggle-desc">{{ labels.insightsDesc }}</p>
            </div>
          </div>
          <label class="toggle-switch">
            <input
              v-model="localPreferences.types.insights"
              type="checkbox"
              :disabled="!isEditMode"
              @change="handleChange"
            />
            <span class="slider"></span>
          </label>
        </div>

        <div class="toggle-item">
          <div class="toggle-info">
            <UserCheck class="toggle-icon" />
            <div>
              <p class="toggle-label">{{ labels.engagementReminders }}</p>
              <p class="toggle-desc">{{ labels.engagementDesc }}</p>
            </div>
          </div>
          <label class="toggle-switch">
            <input
              v-model="localPreferences.types.inactivity"
              type="checkbox"
              :disabled="!isEditMode"
              @change="handleChange"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div v-if="isEditMode" class="actions">
        <button type="button" class="submit-btn" @click="handleSave">
          <Save class="inline-icon" />
          <span>{{ labels.savePreferences }}</span>
        </button>
        <p v-if="message" class="success-text">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { Save, Mail, Smartphone, Bell, Clock, TrendingUp, UserCheck } from 'lucide-vue-next';

const props = defineProps({
  isEditMode: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  preferences: {
    type: Object,
    default: () => ({
      channels: { email: true, push: true, inapp: true },
      types: { reminders: true, insights: true, inactivity: true }
    })
  },
  message: { type: String, default: '' },
  labels: {
    type: Object,
    default: () => ({
      loadingPreferences: 'Loading preferences...',
      notificationChannels: 'Notification Channels',
      emailNotifications: 'Email Notifications',
      emailDesc: 'Receive notifications via email',
      pushNotifications: 'Push Notifications',
      pushDesc: 'Receive notifications on your device',
      inAppNotifications: 'In-App Notifications',
      inAppDesc: 'See notifications in the app',
      notificationTypes: 'Notification Types',
      reminders: 'Reminders',
      remindersDesc: 'Get notified about your reminders',
      financialInsights: 'Financial Insights',
      insightsDesc: 'Weekly/monthly spending summaries',
      engagementReminders: 'Engagement Reminders',
      engagementDesc: "Gentle nudges when you haven't tracked",
      savePreferences: 'Save Preferences'
    })
  }
});

const emit = defineEmits(['save', 'change']);

const localPreferences = reactive({
  channels: { ...props.preferences.channels },
  types: { ...props.preferences.types }
});

watch(
  () => props.preferences,
  (val) => {
    if (val) {
      Object.assign(localPreferences.channels, val.channels);
      Object.assign(localPreferences.types, val.types);
    }
  },
  { deep: true }
);

const handleChange = () => {
  emit('change', {
    channels: { ...localPreferences.channels },
    types: { ...localPreferences.types }
  });
};

const handleSave = () => {
  emit('save', {
    channels: { ...localPreferences.channels },
    types: { ...localPreferences.types }
  });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.loading-state {
  text-align: center;
  padding: 2rem;
  color: $text-secondary;
}

.subsection-title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin-bottom: 1rem;
  margin-top: 1.5rem;

  &:first-child {
    margin-top: 0;
  }
}

.toggle-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: $bg-gray;
  border-radius: $radius-lg;
}

.toggle-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toggle-icon {
  width: 20px;
  height: 20px;
  color: $primary;
}

.toggle-label {
  font-weight: $font-medium;
  color: $text-primary;
  margin: 0;
}

.toggle-desc {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: $primary;
    }

    &:checked + .slider:before {
      transform: translateX(24px);
    }

    &:disabled + .slider {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $border-color;
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }
}

.inline-icon {
  width: 18px;
  height: 18px;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: $primary;
  color: white;
  border-radius: $radius-lg;
  font-weight: $font-semibold;
  transition: $transition-base;

  &:hover {
    opacity: 0.9;
  }
}

.success-text {
  margin-top: 0.75rem;
  color: $primary;
  font-weight: $font-semibold;
}
</style>
