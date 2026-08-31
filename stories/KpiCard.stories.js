import KpiCard from '../components/KpiCard.vue';

export default {
  title: 'Components/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
};

export const Default = { args: { label: 'Revenue', value: '$2,500', valueClass: '' } };
export const Positive = { args: { label: 'Profit', value: '$1,200', valueClass: 'is-positive' } };
export const Negative = { args: { label: 'Loss', value: '-$300', valueClass: 'is-negative' } };
