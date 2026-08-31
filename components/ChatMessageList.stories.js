import ChatMessageList from './ChatMessageList.vue';

export default {
  title: 'Components/ChatMessageList',
  component: ChatMessageList,
  tags: ['autodocs'],
};

const now = new Date().toISOString();
const msgs = [
  { id: 1, user_id: 1, role: 'user', content: 'What did I spend on groceries?', status: 'completed', format_hint: null, language: 'en', result: null, error: null, completed_at: now, created_at: now, updated_at: now },
  { id: 2, user_id: null, role: 'assistant', content: 'You spent $320 on groceries this month.', status: 'completed', format_hint: null, language: 'en', result: { source: 'smartql' }, error: null, completed_at: now, created_at: now, updated_at: now },
];
const pending = [
  { id: 3, user_id: null, role: 'assistant', content: null, status: 'pending', format_hint: null, language: 'en', result: null, error: null, completed_at: null, created_at: now, updated_at: now },
];
const failed = [
  { id: 4, user_id: null, role: 'assistant', content: null, status: 'failed', format_hint: null, language: 'en', result: null, error: 'Something went wrong.', completed_at: null, created_at: now, updated_at: now },
];
export const Conversation = { args: { messages: msgs } };
export const Pending = { args: { messages: pending } };
export const Failed = { args: { messages: failed } };

