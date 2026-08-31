import ContentListView from './ContentListView.vue';

export default {
  title: 'Components/ContentListView',
  component: ContentListView,
  tags: ['autodocs'],
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Amount' },
];

export const Default = { args: { entities: [{ id: 1, name: 'Groceries', amount: 320 }, { id: 2, name: 'Rent', amount: 1200 }], columns, pageName: 'Party', pageNamePlural: 'Parties' } };
export const Loading = { args: { entities: [], columns, pageName: 'Wallet', pageNamePlural: 'Wallets', isLoading: true } };
export const Empty = { args: { entities: [], columns, pageName: 'Category', pageNamePlural: 'Categories' } };
