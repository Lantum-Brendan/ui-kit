import TListHeader from './TListHeader.vue';

export default {
  title: 'Components/TListHeader',
  component: TListHeader,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Recent transactions' } };
export const CustomTitle = { args: { title: 'All wallets (4)' } };
export const EmptyTitle = { args: { title: '' } };

