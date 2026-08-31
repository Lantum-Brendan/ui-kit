import TSidebarSub from './TSidebarSub.vue';

export default {
  title: 'Components/TSidebarSub',
  component: TSidebarSub,
  tags: ['autodocs'],
};

const subItems = [
  { label: 'All Wallets', labelKey: 'allWallets', to: '/wallets' },
  { label: 'Add Wallet', labelKey: 'addWallet', to: '/wallets/new' },
  { label: 'Settings', labelKey: 'settings', to: '/settings' },
];

export const Default = {
  args: {
    subItems,
    activeId: '/wallets',
    labels: { allWallets: 'All Wallets', addWallet: 'Add Wallet', settings: 'Settings' },
    parentTo: '/wallets',
  },
};

export const SecondActive = {
  args: {
    subItems,
    activeId: '/wallets/new',
    labels: { allWallets: 'All Wallets', addWallet: 'Add Wallet', settings: 'Settings' },
    parentTo: '/wallets',
  },
};

export const Interactive = {
  args: {
    subItems,
    activeId: '/settings',
    labels: { allWallets: 'All Wallets', addWallet: 'Add Wallet', settings: 'Settings' },
    parentTo: '/settings',
  },
};
