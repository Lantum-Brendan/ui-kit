import LanguageSelector from './LanguageSelector.vue';

export default {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
};

export const Default = { args: {
  locale: 'en',
  languages: [{ code: 'en', name: 'English', flagUrl: '/flags/gb.svg' }, { code: 'fr', name: 'Français', flagUrl: '/flags/fr.svg' }]
} };
export const French = { args: {
  locale: 'fr',
  languages: [{ code: 'en', name: 'English', flagUrl: '/flags/gb.svg' }, { code: 'fr', name: 'Français', flagUrl: '/flags/fr.svg' }]
} };
export const Empty = { args: {
  locale: '',
  languages: []
} };
