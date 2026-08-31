import TTableRow from '../components/TTableRow.vue';

export default {
  title: 'Components/TTableRow',
  component: TTableRow,
  tags: ['autodocs'],
};

const labels = { transfer: 'Transfer', refund: 'Refund', recurring: 'Recurring' };
const formatDate = (txn) => new Date(txn.date || txn.datetime).toLocaleDateString();
const formatTimeAgo = (txn) => '2 days ago';

const baseTxn = {
  date: '2026-04-10',
  datetime: '2026-04-10T10:00:00Z',
  type: 'EXPENSE',
  party: 'Grocery Store',
  amount: '$42.50',
  category: 'Groceries',
  isTransfer: false,
  isRefund: false,
  isRecurring: false,
};

export const Default = {
  render: (args) => ({
    components: { TTableRow },
    setup() { return { args }; },
    template: '<table><tbody><TTableRow v-bind="args" /></tbody></table>',
  }),
  args: { txn: baseTxn, labels, formatDate, formatTimeAgo },
};

export const Income = {
  render: (args) => ({
    components: { TTableRow },
    setup() { return { args }; },
    template: '<table><tbody><TTableRow v-bind="args" /></tbody></table>',
  }),
  args: { txn: { ...baseTxn, type: 'INCOME', party: 'Employer', amount: '$2500', category: 'Salary' }, labels, formatDate, formatTimeAgo },
};

export const WithBadges = {
  render: (args) => ({
    components: { TTableRow },
    setup() { return { args }; },
    template: '<table><tbody><TTableRow v-bind="args" /></tbody></table>',
  }),
  args: { txn: { ...baseTxn, isTransfer: true, isRecurring: true, isRefund: true }, labels, formatDate, formatTimeAgo },
};
