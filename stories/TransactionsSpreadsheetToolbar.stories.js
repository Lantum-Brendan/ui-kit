import TransactionsSpreadsheetToolbar from '../components/TransactionsSpreadsheetToolbar.vue';

export default {
  title: 'Components/TransactionsSpreadsheetToolbar',
  component: TransactionsSpreadsheetToolbar,
  tags: ['autodocs'],
};

const labels = {
  title: 'Transactions Spreadsheet',
  rowCount: '{count} rows',
  loadingMore: 'Loading more',
  searchPlaceholder: 'Search transactions...',
  exportCsv: 'Export CSV',
  close: 'Close',
  addRow: 'Add row',
  deleteSelected: 'Delete selected',
};

export const Default = {
  args: {
    labels,
    rowCount: 12,
    isStreaming: false,
    searchValue: '',
    hasSelection: false,
    exportDisabled: false,
  },
};

export const WithSelection = {
  args: {
    labels,
    rowCount: 42,
    isStreaming: false,
    searchValue: 'grocery',
    hasSelection: true,
    exportDisabled: false,
  },
};

export const Interactive = {
  args: {
    labels,
    rowCount: 100,
    isStreaming: true,
    searchValue: '',
    hasSelection: false,
    exportDisabled: true,
  },
};
