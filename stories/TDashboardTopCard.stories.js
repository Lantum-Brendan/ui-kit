import TDashboardTopCard from '../components/TDashboardTopCard.vue';

export default {
  title: 'Components/TDashboardTopCard',
  component: TDashboardTopCard,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    showFilters: true,
    activePeriod: 'current_month',
    isCustomActive: false,
    customOpen: false,
    periodSubtitle: 'Mar 1 — Mar 31, 2026',
  },
};

export const CustomActive = {
  args: {
    showFilters: true,
    activePeriod: 'current_month',
    isCustomActive: true,
    customOpen: true,
    periodSubtitle: 'Custom: Feb 15 — Apr 10, 2026',
  },
};

export const WithoutFilters = {
  args: {
    showFilters: false,
    activePeriod: 'current_year',
    isCustomActive: false,
    periodSubtitle: 'Jan 1 — Dec 31, 2026',
  },
};
