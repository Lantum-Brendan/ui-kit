import SettingsWallets from '../components/SettingsWallets.vue';

export default {
  title: 'Components/SettingsWallets',
  component: SettingsWallets,
  tags: ['autodocs'],
};

const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Euro Wallet', currency: 'EUR' },
];
const groups = [
  { id: 10, name: 'Personal' },
  { id: 20, name: 'Business' },
];

export const DisplayMode = {
  args: {
    isEditMode: false,
    wallets,
    groups,
    defaultWalletId: 1,
    defaultGroupId: 10,
    allowNegativeBalance: false,
  },
};

export const EditMode = {
  args: {
    isEditMode: true,
    wallets,
    groups,
    defaultWalletId: 1,
    defaultGroupId: null,
    allowNegativeBalance: false,
  },
};

export const WithNegativeAllowed = {
  args: {
    isEditMode: false,
    wallets,
    groups,
    defaultWalletId: 2,
    defaultGroupId: 20,
    allowNegativeBalance: true,
  },
};
