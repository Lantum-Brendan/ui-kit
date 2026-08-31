import CashflowLineChart from '../components/CashflowLineChart.vue';

export default {
  title: 'Components/CashflowLineChart',
  component: CashflowLineChart,
  tags: ['autodocs'],
};

const data = [
  { label: 'Jan', income: 3000, expense: 1800, net: 1200 },
  { label: 'Feb', income: 2800, expense: 2000, net: 800 },
  { label: 'Mar', income: 3200, expense: 1960, net: 1240 },
  { label: 'Apr', income: 3100, expense: 2100, net: 1000 },
  { label: 'May', income: 3400, expense: 2200, net: 1200 },
];

export const Default = { args: { data, currency: 'USD' } };
export const SinglePoint = { args: { data: [data[0]], currency: 'USD' } };
export const Flat = { args: { data: data.map((d) => ({ ...d, income: 2000, expense: 2000, net: 0 })), currency: 'USD' } };
