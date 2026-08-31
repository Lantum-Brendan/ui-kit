import SettingsGeneral from '../components/SettingsGeneral.vue';

export default {
  title: 'Components/SettingsGeneral',
  component: SettingsGeneral,
  tags: ['autodocs'],
};

export const DisplayMode = {
  args: {
    isEditMode: false,
    initialLanguage: 'en',
    initialCurrency: 'USD',
  },
};

export const EditMode = {
  args: {
    isEditMode: true,
    initialLanguage: 'en',
    initialCurrency: 'USD',
  },
};

export const FrenchEuro = {
  args: {
    isEditMode: false,
    initialLanguage: 'fr',
    initialCurrency: 'EUR',
    message: 'Preferences saved',
  },
};

export const EditSpanish = {
  args: {
    isEditMode: true,
    initialLanguage: 'es',
    initialCurrency: 'GBP',
  },
};
