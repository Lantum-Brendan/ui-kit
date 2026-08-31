import TransactionsSpreadsheetEditor from '../components/TransactionsSpreadsheetEditor.vue';

export default {
  title: 'Components/TransactionsSpreadsheetEditor',
  component: TransactionsSpreadsheetEditor,
  tags: ['autodocs'],
};

const labels = {
  dateCol: 'Date',
  amountCol: 'Amount',
  descCol: 'Description',
  catCol: 'Category',
  save: 'Save',
  cancel: 'Cancel',
};

const editingRow = {
  amount: 42.5,
  datetime: '2026-04-10T10:00:00Z',
  categories: [{ name: 'Groceries' }],
  wallet: { currency: 'USD' },
  description: 'Weekly groceries',
  type: 'expense',
};

export const Default = {
  args: {
    editingRow: null,
    labels,
    currencies: ['USD', 'EUR', 'GBP'],
  },
};

export const WithRow = {
  args: {
    editingRow,
    labels,
    currencies: ['USD', 'EUR'],
  },
};

export const Interactive = {
  args: {
    editingRow: { ...editingRow, amount: 120, description: 'Rent payment', type: 'income' },
    labels,
    currencies: ['USD'],
  },
};
