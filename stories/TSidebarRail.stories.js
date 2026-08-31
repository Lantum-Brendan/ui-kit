import TSidebarRail from '../components/TSidebarRail.vue';

export default {
  title: 'Components/TSidebarRail',
  component: TSidebarRail,
  tags: ['autodocs'],
};

const items = [
  { id: 'dashboard', label: 'Dashboard', labelKey: 'dashboard', hintKey: 'dashboardHint', hint: 'Overview', to: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'transactions', label: 'Transactions', labelKey: 'transactions', hintKey: 'transactionsHint', hint: 'All transactions', to: '/transactions', icon: 'ArrowLeftRight' },
  { id: 'wallets', label: 'Wallets', labelKey: 'wallets', hintKey: 'walletsHint', hint: 'Manage wallets', to: '/wallets', icon: 'Wallet' },
];

const labels = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  wallets: 'Wallets',
  dashboardHint: 'Overview',
  transactionsHint: 'All transactions',
  walletsHint: 'Manage wallets',
};

export const Default = {
  args: {
    items,
    activeId: 'dashboard',
    collapsed: false,
    labels,
  },
};

export const Collapsed = {
  args: {
    items,
    activeId: 'transactions',
    collapsed: true,
    labels,
  },
};

export const Interactive = {
  args: {
    items,
    activeId: 'wallets',
    collapsed: false,
    labels,
  },
};
