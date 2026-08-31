import TransactionsSpreadsheet from './TransactionsSpreadsheet.vue';

export default {
  title: 'Components/TransactionsSpreadsheet',
  component: TransactionsSpreadsheet,
  tags: ['autodocs'],
};

export const Default = { args: {
  rows: [{ id: 1, date: '2026-08-10', type: 'expense', amount: 85, currency: 'USD', description: 'Grocery', categories: ['Food'], wallet: 'Main', party: 'Store' }, { id: 2, date: '2026-08-05', type: 'income', amount: 3000, currency: 'USD', description: 'Salary', categories: ['Income'], wallet: 'Main', party: 'Employer' }],
  isLoading: false,
  isStreaming: false,
  error: ''
} };
export const Empty = { args: {
  rows: [],
  isLoading: false,
  isStreaming: false,
  error: ''
} };
export const Loading = { args: {
  rows: [{ id: 1, date: '2026-08-10', type: 'expense', amount: 85, currency: 'USD', description: 'Grocery', categories: ['Food'], wallet: 'Main', party: 'Store' }, { id: 2, date: '2026-08-05', type: 'income', amount: 3000, currency: 'USD', description: 'Salary', categories: ['Income'], wallet: 'Main', party: 'Employer' }],
  isLoading: true,
  isStreaming: true,
  error: ''
} };
