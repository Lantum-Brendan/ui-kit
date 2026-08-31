import TTab from '../components/TTab.vue';

export default {
  title: 'Components/TTab',
  component: TTab,
  tags: ['autodocs'],
};

export const Default = { args: { value: 'all', label: 'All', active: false } };
export const Active = { args: { value: 'active', label: 'Active', active: true } };
export const WithCount = { args: { value: 'expenses', label: 'Expenses', count: 12, active: false } };

