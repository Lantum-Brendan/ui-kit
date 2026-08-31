import DashboardQuickActionModal from '../components/DashboardQuickActionModal.vue';

export default {
  title: 'Components/DashboardQuickActionModal',
  component: DashboardQuickActionModal,
  tags: ['autodocs'],
  argTypes: {
    action: { control: 'select', options: ['log', 'transfer', 'report', 'import'] },
  },
};

const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Euro Wallet', currency: 'EUR' },
];
const parties = [
  { id: 1, name: 'Acme Corp' },
  { id: 2, name: 'Alice Johnson' },
];

export const LogTransaction = {
  args: {
    action: 'log',
    wallets,
    parties,
    busy: false,
  },
};

export const Transfer = {
  args: {
    action: 'transfer',
    wallets,
    parties,
    busy: false,
  },
};

export const BuildReport = {
  args: {
    action: 'report',
    wallets,
    parties,
    busy: false,
  },
};

export const ImportDocument = {
  args: {
    action: 'import',
    wallets,
    parties,
    busy: false,
  },
};
