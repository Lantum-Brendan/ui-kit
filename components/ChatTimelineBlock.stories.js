import ChatTimelineBlock from './ChatTimelineBlock.vue';

export default {
  title: 'Components/ChatTimelineBlock',
  component: ChatTimelineBlock,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Recent activity', items: [{ date: '2026-08-10', title: 'Grocery purchase', description: 'Walmart', amount: 42, currency: 'USD' }, { date: '2026-08-09', title: 'Salary', amount: 3000, currency: 'USD' }] } };
export const Single = { args: { title: 'Today', items: [{ date: '2026-08-10', title: 'Coffee', amount: 5, currency: 'USD' }] } };
export const Empty = { args: { title: 'No events', items: [] } };
