import PartyDetailContent from '../components/PartyDetailContent.vue';

export default {
  title: 'Components/PartyDetailContent',
  component: PartyDetailContent,
  tags: ['autodocs'],
};

const party = {
  id: 1,
  name: 'Acme Corp',
  type: 'business',
  icon: 'Building2',
  receivedAmount: 5200,
  spentAmount: 3100,
};
const transactions = [
  { id: 1, partyId: 1, amount: 500, type: 'income', category: 'Sales', date: '2026-04-10' },
  { id: 2, partyId: 1, amount: 120, type: 'expense', category: 'Supplies', date: '2026-04-08' },
];
const labels = {
  backToList: 'Back',
  edit: 'Edit',
  delete: 'Delete',
  received: 'Received',
  spent: 'Spent',
  net: 'Net',
  lastSixMonths: 'Last 6 months',
  activity: 'Activity',
  noActivity: 'No activity',
  recentTransactions: 'Recent',
  shown: 'shown',
  viewAll: 'View all',
  noTransactions: 'No transactions',
  transaction: 'Transaction',
  individual: 'Individual',
  business: 'Business',
  organization: 'Organization',
  vendor: 'Vendor',
  client: 'Client',
  party: 'Party',
};
const formatter = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const Default = {
  args: {
    party,
    transactions,
    currency: 'USD',
    formatter,
    showBack: false,
    locale: 'en',
    labels,
  },
};

export const Individual = {
  args: {
    party: { ...party, id: 2, name: 'Alice Johnson', type: 'individual', icon: 'User', receivedAmount: 800, spentAmount: 1200 },
    transactions: [{ id: 3, partyId: 2, amount: 80, type: 'expense', category: 'Lunch', date: '2026-04-09' }],
    currency: 'USD',
    formatter,
    showBack: true,
    locale: 'en',
    labels,
  },
};

export const NoActivity = {
  args: {
    party,
    transactions: [],
    currency: 'USD',
    formatter,
    showBack: false,
    locale: 'en',
    labels,
  },
};
