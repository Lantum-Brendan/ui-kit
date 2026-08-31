import ChatProgressBlock from './ChatProgressBlock.vue';

export default {
  title: 'Components/ChatProgressBlock',
  component: ChatProgressBlock,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Budget progress', items: [{ label: 'Groceries', current: 225, target: 500, currency: 'USD' }, { label: 'Dining', current: 180, target: 200, currency: 'USD' }] } };
export const OverBudget = { args: { title: 'Over budget', items: [{ label: 'Entertainment', current: 550, target: 500, currency: 'USD' }] } };
export const Empty = { args: { title: 'No budgets', items: [] } };
