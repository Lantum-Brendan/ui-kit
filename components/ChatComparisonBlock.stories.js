import ChatComparisonBlock from './ChatComparisonBlock.vue';

export default {
  title: 'Components/ChatComparisonBlock',
  component: ChatComparisonBlock,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Compare periods', series: [{ period: 'Jan', income: 3000, expense: 1800 }, { period: 'Feb', income: 2800, expense: 2000 }] } };
export const Single = { args: { title: 'This month', series: [{ period: 'Mar', income: 3200, expense: 1960 }] } };
export const ThreeColumns = { args: { title: 'Quarter', series: [{ period: 'Jan', income: 3000, expense: 1800 }, { period: 'Feb', income: 2800, expense: 2000 }, { period: 'Mar', income: 3200, expense: 1960 }] } };
