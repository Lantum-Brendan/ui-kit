import SettingsNotifications from './SettingsNotifications.vue';

export default {
  title: 'Components/SettingsNotifications',
  component: SettingsNotifications,
  tags: ['autodocs'],
};

const prefsAllEnabled = {
  channels: { email: true, push: true, inapp: true },
  types: { reminders: true, insights: true, inactivity: true },
};

export const DisplayMode = {
  args: {
    isEditMode: false,
    loading: false,
    preferences: prefsAllEnabled,
  },
};

export const EditMode = {
  args: {
    isEditMode: true,
    loading: false,
    preferences: prefsAllEnabled,
  },
};

export const Loading = {
  args: {
    isEditMode: false,
    loading: true,
    preferences: prefsAllEnabled,
  },
};

export const SomeDisabled = {
  args: {
    isEditMode: true,
    loading: false,
    preferences: {
      channels: { email: true, push: false, inapp: true },
      types: { reminders: false, insights: true, inactivity: false },
    },
    message: 'Saved',
  },
};
