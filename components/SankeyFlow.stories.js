import SankeyFlow from './SankeyFlow.vue';

export default {
  title: 'Components/SankeyFlow',
  component: SankeyFlow,
  tags: ['autodocs'],
};

export const Default = { args: {
  flow: { totalIn: 5000, totalOut: 3200, savings: 1800, sources: [{ name: 'Salary', amount: 4000 }, { name: 'Freelance', amount: 1000 }], sinks: [{ name: 'Rent', amount: 1200, color: '#4f46e5' }, { name: 'Groceries', amount: 800, color: '#10b981' }] },
  currency: 'USD',
  formatter: (n) => `$${Math.round(n)}`
} };
export const Empty = { args: {
  flow: null,
  currency: ''
} };
export const Alternative = { args: {
  flow: { totalIn: 5000, totalOut: 3200, savings: 1800, sources: [{ name: 'Salary', amount: 4000 }, { name: 'Freelance', amount: 1000 }], sinks: [{ name: 'Rent', amount: 1200, color: '#4f46e5' }, { name: 'Groceries', amount: 800, color: '#10b981' }] },
  currency: 'EUR',
  formatter: (n) => `$${Math.round(n)}`
} };
