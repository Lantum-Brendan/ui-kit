import WalletListCard from '../components/WalletListCard.vue';

export default {
  title: 'Components/WalletListCard',
  component: WalletListCard,
  tags: ['autodocs'],
};

export const Default = { args: {
  wallet: { id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500, icon: 'Wallet' },
  isDefault: false
} };
export const Empty = { args: {
  wallet: null,
  isDefault: false
} };
export const Alternative = { args: {
  wallet: { id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500, icon: 'Wallet' },
  isDefault: false
} };
