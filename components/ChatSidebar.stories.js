import ChatSidebar from './ChatSidebar.vue';

export default {
  title: 'Components/ChatSidebar',
  component: ChatSidebar,
  tags: ['autodocs'],
};

const sessions = [
  { id: 1, title: 'Budget review', created_at: '2026-08-10T10:00:00Z', updated_at: '2026-08-10T10:00:00Z' },
  { id: 2, title: 'Spending trends', created_at: '2026-08-05T10:00:00Z', updated_at: '2026-08-05T10:00:00Z' },
  { id: 3, title: 'Old chat', created_at: '2026-07-01T10:00:00Z', updated_at: '2026-07-01T10:00:00Z' },
];

export const Default = { args: { sessions, currentSessionId: 1, isLoading: false } };
export const Loading = { args: { sessions: [], currentSessionId: null, isLoading: true } };
export const Empty = { args: { sessions: [], currentSessionId: null, isLoading: false } };
