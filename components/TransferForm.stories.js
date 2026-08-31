import TransferForm from './TransferForm.vue';

export default {
  title: 'Components/TransferForm',
  component: TransferForm,
  tags: ['autodocs'],
};

export const Default = { args: {
  isSubmitting: false,
  wallets: [{ id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500 }, { id: 2, name: 'Cash', type: 'cash', currency: 'USD', balance: 500 }],
  defaultCurrency: 'USD',
  formatWalletName: (w) => w.name
} };
export const Empty = { args: {
  isSubmitting: false,
  wallets: [],
  defaultCurrency: ''
} };
export const Alternative = { args: {
  isSubmitting: true,
  wallets: [{ id: 3, name: 'Alt Wallet', type: 'cash', currency: 'EUR', balance: 1500 }],
  defaultCurrency: 'USD',
  formatWalletName: (w) => w.name
} };
