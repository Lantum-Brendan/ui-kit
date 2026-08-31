import StatsFilterModal from '../components/StatsFilterModal.vue';

export default {
  title: 'Components/StatsFilterModal',
  component: StatsFilterModal,
  tags: ['autodocs'],
};

const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Savings', currency: 'EUR' },
  { id: 3, name: 'Travel', currency: 'USD' },
];

export const Default = {
  args: {
    wallets,
    initialFilters: {},
    currentPeriod: 'current_month',
  },
};

export const WithPreselectedPeriod = {
  args: {
    wallets,
    initialFilters: { startDate: '2026-03-01', endDate: '2026-03-31', walletIds: [1] },
    currentPeriod: 'last_3_months',
  },
};

export const AllTimeEmptyFilters = {
  args: {
    wallets,
    initialFilters: { walletIds: [] },
    currentPeriod: 'all_time',
  },
};
