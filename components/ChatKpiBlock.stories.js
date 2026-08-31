import ChatKpiBlock from './ChatKpiBlock.vue';

export default {
  title: 'Components/ChatKpiBlock',
  component: ChatKpiBlock,
  tags: ['autodocs'],
};

const kpis = [
  { label: 'Income', value: 4250, currency: 'USD', delta_percent: 12 },
  { label: 'Expenses', value: 1890, currency: 'USD', delta_percent: -4 },
  { label: 'Net', value: 2360, currency: 'USD', delta_percent: 8 },
];
export const Default = { args: { title: 'This month', items: kpis } };
export const Single = { args: { title: 'Total balance', items: [{ label: 'Balance', value: 10234, currency: 'USD' }] } };
export const WithUnits = { args: { title: 'Metrics', items: [{ label: 'Users', value: 1234, unit: '' }, { label: 'Rate', value: 4.5, unit: '%' }] } };

