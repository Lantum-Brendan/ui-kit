import ContentSection from '../components/ContentSection.vue';

export default {
  title: 'Components/ContentSection',
  component: ContentSection,
  tags: ['autodocs'],
};

export const Default = { args: { pageName: 'Category', pageNamePlural: 'Categories' } };
export const WithItems = { args: { pageName: 'Wallet', pageNamePlural: 'Wallets', items: [{ id: 1, name: 'Main' }, { id: 2, name: 'Savings' }] } };
export const Tablet = { args: { pageName: 'Group', pageNamePlural: 'Groups', isTabletOrBelow: true } };
