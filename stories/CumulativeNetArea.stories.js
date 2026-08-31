import CumulativeNetArea from '../components/CumulativeNetArea.vue';

export default {
  title: 'Components/CumulativeNetArea',
  component: CumulativeNetArea,
  tags: ['autodocs'],
};

const data = [
  { label: 'Jan', cumulative: 1200 },
  { label: 'Feb', cumulative: 2000 },
  { label: 'Mar', cumulative: 3240 },
  { label: 'Apr', cumulative: 4100 },
  { label: 'May', cumulative: 5300 },
];

export const Default = { args: { data, currency: 'USD' } };
export const Negative = { args: { data: [{ label: 'Jan', cumulative: -200 }, { label: 'Feb', cumulative: -500 }, { label: 'Mar', cumulative: -100 }], currency: 'USD' } };
export const Single = { args: { data: [{ label: 'Jan', cumulative: 100 }], currency: 'USD' } };
