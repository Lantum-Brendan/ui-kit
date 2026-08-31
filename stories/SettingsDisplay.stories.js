import SettingsDisplay from '../components/SettingsDisplay.vue';

export default {
  title: 'Components/SettingsDisplay',
  component: SettingsDisplay,
  tags: ['autodocs'],
};

export const Default = { args: {
  isDark: false
} };
export const DarkMode = { args: {
  isDark: false
} };
export const LightMode = { args: {
  isDark: true
} };
