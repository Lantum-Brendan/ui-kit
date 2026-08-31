import TransactionForm from './TransactionForm.vue';

export default {
  title: 'Components/TransactionForm',
  component: TransactionForm,
  tags: ['autodocs'],
};

export const Default = { args: {
  isOutcomeSelected: false,
  editingItem: null,
  isSubmitting: false,
  parties: [{ id: 1, name: 'Acme Corp', type: 'business', description: 'Client', receivedAmount: 1200, spentAmount: 400 }, { id: 2, name: 'John Doe', type: 'individual', description: 'Friend', receivedAmount: 300, spentAmount: 800 }],
  wallets: [{ id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500 }, { id: 2, name: 'Cash', type: 'cash', currency: 'USD', balance: 500 }],
  groups: [{ id: 1, name: 'Personal' }],
  categories: [{ id: 1, name: 'Food', icon: 'Utensils' }, { id: 2, name: 'Transport', icon: 'Car' }],
  defaultWalletId: 1,
  defaultGroupId: 1,
  defaultCurrency: 'USD',
  recentExpenses: [],
  existingAttachments: [],
  existingPreviews: {},
  removingFileIds: new Set()
} };
export const Empty = { args: {
  editingItem: null,
  isSubmitting: false,
  parties: [],
  wallets: [],
  groups: [],
  categories: [],
  defaultCurrency: ''
} };
export const Alternative = { args: {
  isOutcomeSelected: false,
  editingItem: null,
  isSubmitting: true,
  parties: [{ id: 3, name: 'Alt Party', type: 'individual', description: 'Alt', receivedAmount: 500, spentAmount: 100 }],
  wallets: [{ id: 3, name: 'Alt Wallet', type: 'cash', currency: 'EUR', balance: 1500 }],
  groups: [{ id: 1, name: 'Personal' }],
  categories: [{ id: 1, name: 'Food', icon: 'Utensils' }, { id: 2, name: 'Transport', icon: 'Car' }],
  defaultWalletId: 1,
  defaultGroupId: 1,
  defaultCurrency: 'USD',
  recentExpenses: [],
  existingAttachments: [],
  existingPreviews: {},
  removingFileIds: new Set()
} };
