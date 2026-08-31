import WalletDetailPanel from '../components/WalletDetailPanel.vue';

export default {
  title: 'Components/WalletDetailPanel',
  component: WalletDetailPanel,
  tags: ['autodocs'],
};

export const Default = { args: {
  wallet: { id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500, icon: 'Wallet' },
  isDefault: false,
  transactions: [{ id: 1, description: 'Grocery run', amount: 85, type: 'expense', date: '2026-08-10', currency: 'USD' }, { id: 2, description: 'Salary', amount: 3000, type: 'income', date: '2026-08-05', currency: 'USD' }],
  formatter: (n) => `$${Math.round(n)}`,
  showBack: false,
  locale: 'en'
} };
export const Empty = { args: {
  wallet: null,
  isDefault: false,
  transactions: [],
  showBack: false,
  locale: ''
} };
export const Alternative = { args: {
  wallet: { id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500, icon: 'Wallet' },
  isDefault: false,
  transactions: [{ id: 3, description: 'Alt expense', amount: 45, type: 'expense', date: '2026-08-12', currency: 'EUR' }],
  formatter: (n) => `$${Math.round(n)}`,
  showBack: true,
  locale: 'fr'
} };
