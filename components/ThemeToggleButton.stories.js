import ThemeToggleButton from './ThemeToggleButton.vue';

export default {
  title: 'Components/ThemeToggleButton',
  component: ThemeToggleButton,
  tags: ['autodocs'],
};

export const Default = { args: {
  isDark: false,
  toggleTheme: () => {}
} };
export const DarkMode = { args: {
  isDark: false
} };
export const LightMode = { args: {
  isDark: true,
  toggleTheme: () => {}
} };
