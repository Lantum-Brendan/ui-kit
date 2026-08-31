import ChatProposedActionBlock from './ChatProposedActionBlock.vue';

export default {
  title: 'Components/ChatProposedActionBlock',
  component: ChatProposedActionBlock,
  tags: ['autodocs'],
};

const wallets = [
  { id: 1, name: 'Main Wallet' },
  { id: 2, name: 'Savings' },
];
const categories = [
  { id: 1, name: 'Groceries' },
  { id: 2, name: 'Dining' },
];
const parties = [
  { id: 1, name: 'Acme Corp' },
  { id: 2, name: 'Alice' },
];

const pendingBlock = {
  summary: 'Create transaction: Lunch $12 at Deli',
  risk: 'low',
  status: 'pending',
  fields: [
    { key: 'amount', label: 'Amount', type: 'number', value: 12 },
    { key: 'wallet_id', label: 'Wallet', type: 'wallet', value: 1 },
    { key: 'party_id', label: 'Party', type: 'party', value: null },
    { key: 'categories', label: 'Categories', type: 'categories', value: [] },
    { key: 'type', label: 'Type', type: 'enum', value: 'expense', options: ['expense', 'income'] },
  ],
};

const executedBlock = {
  summary: 'Transfer $200 Main -> Savings',
  risk: 'low',
  status: 'executed',
  fields: [
    { key: 'amount', label: 'Amount', type: 'number', value: 200, display: '$200' },
    { key: 'wallet', label: 'Wallet', type: 'text', value: 'Main', display: 'Main Wallet' },
  ],
};

const highRiskBlock = {
  summary: 'Delete 42 transactions',
  risk: 'high',
  status: 'pending',
  fields: [
    { key: 'count', label: 'Count', type: 'number', value: 42 },
    { key: 'confirm', label: 'Confirm', type: 'text', value: 'DELETE' },
  ],
};

export const PendingEditable = {
  args: {
    block: pendingBlock,
    wallets,
    categories,
    parties,
    busy: false,
  },
};

export const Executed = {
  args: {
    block: executedBlock,
    wallets,
    categories,
    parties,
    busy: false,
  },
};

export const HighRiskPending = {
  args: {
    block: highRiskBlock,
    wallets,
    categories,
    parties,
    busy: false,
  },
};

export const BusyWorking = {
  args: {
    block: pendingBlock,
    wallets,
    categories,
    parties,
    busy: true,
  },
};
