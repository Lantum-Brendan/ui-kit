import ChatChartBlock from '../components/ChatChartBlock.vue';

export default {
  title: 'Components/ChatChartBlock',
  component: ChatChartBlock,
  tags: ['autodocs'],
};

const donutData = [
  { category: 'Food', amount: 320 },
  { category: 'Rent', amount: 1200 },
  { category: 'Transport', amount: 180 },
];
export const Donut = { args: { title: 'Spending by category', chart_hint: 'donut', data: donutData } };
export const Bar = { args: { title: 'Monthly trend', chart_hint: 'bar', data: donutData } };
export const Empty = { args: { title: 'No data', data: [] } };

