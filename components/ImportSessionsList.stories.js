import ImportSessionsList from './ImportSessionsList.vue';

export default {
  title: 'Components/ImportSessionsList',
  component: ImportSessionsList,
  tags: ['autodocs'],
};

export const Default = { args: {
  sessions: [{ id: 1, file_name: 'statement.pdf', status: 'ready', created_at: '2026-08-10T10:00:00Z', metadata: { total_suggestions: 5, duplicates_found: 1 } }, { id: 2, file_name: 'receipt.jpg', status: 'analyzing', created_at: '2026-08-12T10:00:00Z' }]
} };
export const Empty = { args: {
  sessions: []
} };
export const Alternative = { args: {
  sessions: [{ id: 2, file_name: 'alt.pdf', status: 'ready', created_at: '2026-08-15T10:00:00Z', metadata: { total_suggestions: 2 } }]
} };
