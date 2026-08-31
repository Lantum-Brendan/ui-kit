import DashboardOnboarding from '../components/DashboardOnboarding.vue';

export default {
  title: 'Components/DashboardOnboarding',
  component: DashboardOnboarding,
  tags: ['autodocs'],
};

export const Default = { args: {
  hasWallets: true,
  hasCategories: true,
  hasTransactions: true,
  hasParties: true
} };
export const Empty = { args: {
  hasWallets: false,
  hasCategories: false,
  hasTransactions: false,
  hasParties: false
} };
export const Alternative = { args: {
  hasWallets: true,
  hasCategories: true,
  hasTransactions: true,
  hasParties: true
} };
