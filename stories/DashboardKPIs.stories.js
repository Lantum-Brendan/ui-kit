import DashboardKPIs from '../components/DashboardKPIs.vue';

export default {
  title: 'Components/DashboardKPIs',
  component: DashboardKPIs,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    statistics: { total_balance: 12400, total_income: 5200, total_expenses: 3100 },
    currency: 'USD',
    isCustomActive: false,
    activeFilterChips: [],
  },
};

export const WithFilters = {
  args: {
    statistics: { total_balance: 8900, total_income: 3200, total_expenses: 2100 },
    currency: 'USD',
    isCustomActive: true,
    activeFilterChips: [
      { key: 'wallet_1', label: 'Main Wallet' },
      { key: 'period_custom', label: 'Custom: 2026-03-01 → 2026-04-01' },
    ],
  },
};

export const NegativeNet = {
  args: {
    statistics: { total_balance: 4500, total_income: 2000, total_expenses: 3500 },
    currency: 'EUR',
    isCustomActive: false,
    activeFilterChips: [],
  },
};

export const LargeNumbers = {
  args: {
    statistics: { total_balance: 1250000, total_income: 45000, total_expenses: 32000 },
    currency: 'USD',
  },
};
