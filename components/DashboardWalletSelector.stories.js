import DashboardWalletSelector from './DashboardWalletSelector.vue';

export default {
  title: 'Components/DashboardWalletSelector',
  component: DashboardWalletSelector,
  tags: ['autodocs'],
};

const wallets = [
  { id: 1, name: 'Main Wallet' },
  { id: 2, name: 'Savings (EUR)' },
  { id: 3, name: 'Travel Fund' },
];

export const DefaultAll = {
  args: {
    selectedWalletId: null,
    wallets,
  },
};

export const SelectedOne = {
  args: {
    selectedWalletId: 2,
    wallets,
  },
};

export const WithCustomAllLabel = {
  args: {
    selectedWalletId: null,
    wallets,
    allWalletsLabel: 'Every wallet',
  },
};
