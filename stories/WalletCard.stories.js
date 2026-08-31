import WalletCard from '../components/WalletCard.vue';

export default {
  title: 'Components/WalletCard',
  component: WalletCard,
  tags: ['autodocs'],
};

const wallets = [
  { id: null, name: 'All Wallets', currency: 'USD' },
  { id: 1, name: 'Checking', currency: 'USD' },
  { id: 2, name: 'Savings', currency: 'EUR' },
];
const stats = { total_balance: 3420, total_income: 5000, total_expenses: 1580 };
export const AllWallets = { args: { availableWallets: wallets, selectedWalletId: null, statistics: stats, formatCurrency: (v,c) => `${c} ${v}`, formatCompactCurrency: (v,c) => `${c} ${v}` } };
export const SpecificWallet = { args: { availableWallets: wallets, selectedWalletId: 1, statistics: stats, formatCurrency: (v,c) => `${c} ${v}`, formatCompactCurrency: (v,c) => `${c} ${v}` } };
export const NoWallets = { args: { availableWallets: [], selectedWalletId: null, statistics: null, formatCurrency: (v,c) => `${c} ${v}`, formatCompactCurrency: (v,c) => `${c} ${v}` } };

