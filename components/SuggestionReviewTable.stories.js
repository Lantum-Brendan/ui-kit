import SuggestionReviewTable from './SuggestionReviewTable.vue';

export default {
  title: 'Components/SuggestionReviewTable',
  component: SuggestionReviewTable,
  tags: ['autodocs'],
};

export const Default = { args: {
  suggestions: [{ id: 1, description: 'Grocery', amount: 50, type: 'expense', date: '2026-08-10', isDuplicate: false, confidence: 0.92, party: 'Store', category: 'Food', wallet: 'Main' }, { id: 2, description: 'Rent', amount: 1200, type: 'expense', date: '2026-08-01', isDuplicate: true, confidence: 0.85, party: 'Landlord', category: 'Housing', wallet: 'Main' }],
  wallets: [{ id: 1, name: 'Main Wallet', type: 'bankAccount', currency: 'USD', balance: 2500 }, { id: 2, name: 'Cash', type: 'cash', currency: 'USD', balance: 500 }],
  categories: [{ id: 1, name: 'Food', icon: 'Utensils' }, { id: 2, name: 'Transport', icon: 'Car' }],
  parties: [{ id: 1, name: 'Acme Corp', type: 'business', description: 'Client', receivedAmount: 1200, spentAmount: 400 }, { id: 2, name: 'John Doe', type: 'individual', description: 'Friend', receivedAmount: 300, spentAmount: 800 }],
  acceptedCount: 5,
  rejectedCount: 2,
  pendingCount: 3
} };
export const Empty = { args: {
  suggestions: [],
  wallets: [],
  categories: [],
  parties: []
} };
export const Alternative = { args: {
  suggestions: [{ id: 1, description: 'Grocery', amount: 50, type: 'expense', date: '2026-08-10', isDuplicate: false, confidence: 0.92, party: 'Store', category: 'Food', wallet: 'Main' }, { id: 2, description: 'Rent', amount: 1200, type: 'expense', date: '2026-08-01', isDuplicate: true, confidence: 0.85, party: 'Landlord', category: 'Housing', wallet: 'Main' }],
  wallets: [{ id: 3, name: 'Alt Wallet', type: 'cash', currency: 'EUR', balance: 1500 }],
  categories: [{ id: 1, name: 'Food', icon: 'Utensils' }, { id: 2, name: 'Transport', icon: 'Car' }],
  parties: [{ id: 3, name: 'Alt Party', type: 'individual', description: 'Alt', receivedAmount: 500, spentAmount: 100 }],
  acceptedCount: 5,
  rejectedCount: 2,
  pendingCount: 3
} };
