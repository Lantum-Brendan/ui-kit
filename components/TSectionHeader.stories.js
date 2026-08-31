import TSectionHeader from './TSectionHeader.vue';

export default {
  title: 'Components/TSectionHeader',
  component: TSectionHeader,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Overview', subtitle: 'Summary of your financial activity', eyebrow: 'Dashboard' } };
export const Minimal = { args: { title: 'Transactions' } };
export const WithEyebrow = { args: { eyebrow: 'Reports', title: 'Spending trends', subtitle: 'Last 30 days' } };

