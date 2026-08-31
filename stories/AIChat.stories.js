import AIChat from '../components/AIChat.vue';

export default {
  title: 'Components/AIChat',
  component: AIChat,
  tags: ['autodocs'],
};

const sessions = [
  { id: 1, title: 'Budget review', created_at: '2026-08-01T10:00:00Z', updated_at: '2026-08-10T10:00:00Z', messages: [{ id: 1, role: 'user', content: 'What did I spend?', status: 'completed', created_at: '2026-08-10T10:00:00Z', updated_at: '2026-08-10T10:00:00Z' }] },
  { id: 2, title: 'Spending trends', created_at: '2026-08-05T10:00:00Z', updated_at: '2026-08-05T10:00:00Z', messages: [] },
];
const currentSession = {
  id: 1,
  title: 'Budget review',
  messages: [
    { id: 1, role: 'user', content: 'What did I spend last month?', status: 'completed' },
    { id: 2, role: 'assistant', content: 'You spent $1,245 last month.', status: 'completed' },
  ],
};

export const Default = { args: { sessions, currentSession, isLoadingSessions: false, isSending: false } };
export const Empty = { args: { sessions: [], currentSession: null, isLoadingSessions: false, isSending: false } };
export const Loading = { args: { sessions: [], currentSession: null, isLoadingSessions: true, isSending: true } };
