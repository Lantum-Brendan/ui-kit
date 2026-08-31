import DiscussionDropdown from './DiscussionDropdown.vue';

export default {
  title: 'Components/DiscussionDropdown',
  component: DiscussionDropdown,
  tags: ['autodocs'],
};

export const Default = { args: {
  sessions: [{ id: 1, title: 'Budget review', created_at: '2026-08-10T10:00:00Z', updated_at: '2026-08-10T10:00:00Z' }, { id: 2, title: 'Spending trends', created_at: '2026-08-05T10:00:00Z', updated_at: '2026-08-05T10:00:00Z' }],
  currentId: 1,
  currentTitle: 'Budget review'
} };
export const Empty = { args: {
  sessions: [],
  currentId: null,
  currentTitle: ''
} };
export const Alternative = { args: {
  sessions: [{ id: 2, title: 'Alt chat', created_at: '2026-08-15T10:00:00Z', updated_at: '2026-08-15T10:00:00Z' }],
  currentId: 2,
  currentTitle: 'Alt title'
} };
