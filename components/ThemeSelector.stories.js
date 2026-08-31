import ThemeSelector from './ThemeSelector.vue';

export default {
  title: 'Components/ThemeSelector',
  component: ThemeSelector,
  tags: ['autodocs'],
};

export const Default = { args: {
  theme: 'light',
  isDark: false,
  isOpen: true
} };
export const DarkMode = { args: {
  theme: '',
  isDark: false,
  isOpen: false
} };
export const LightMode = { args: {
  theme: 'dark',
  isDark: true,
  isOpen: true
} };
