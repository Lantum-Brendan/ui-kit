import TTabList from '../components/TTabList.vue';

export default {
  title: 'Components/TTabList',
  component: TTabList,
  tags: ['autodocs'],
};

const sampleTabs = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];
export const Default = { args: { modelValue: 'all', tabs: sampleTabs, variant: 'pill' } };
export const Underline = { args: { modelValue: 'income', tabs: sampleTabs, variant: 'underline' } };
export const Indicator = { args: { modelValue: 'expense', tabs: sampleTabs, variant: 'indicator' } };

