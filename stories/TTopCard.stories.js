import TTopCard from '../components/TTopCard.vue';

export default {
  title: 'Components/TTopCard',
  component: TTopCard,
  tags: ['autodocs'],
};

export const Wallets = { args: { pageName: 'Wallet', pageNamePlural: 'Wallets', pageNameText: 'wallet', pageNamePluralText: 'Wallets', displayTitleText: 'Your wallets', showAddButton: true } };
export const Transactions = { args: { pageName: 'Transaction', pageNamePlural: 'Transactions', pageNameText: 'transaction', pageNamePluralText: 'Transactions', displayTitleText: 'All transactions', showAddButton: true } };
export const NoButton = { args: { pageName: 'Category', pageNamePlural: 'Categories', pageNameText: 'category', pageNamePluralText: 'Categories', displayTitleText: 'Categories', showAddButton: false } };

