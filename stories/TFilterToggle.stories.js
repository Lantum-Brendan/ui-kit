import TFilterToggle from '../components/TFilterToggle.vue';

export default {
  title: 'Components/TFilterToggle',
  component: TFilterToggle,
  tags: ['autodocs'],
};

export const Default = { args: { activeCount: 0, label: '' } };
export const WithActiveCount = { args: { activeCount: 3, label: '' } };
export const Labeled = { args: { activeCount: 1, label: 'Filters' } };

