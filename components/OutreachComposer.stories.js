import OutreachComposer from './OutreachComposer.vue';

export default {
  title: 'Components/OutreachComposer',
  component: OutreachComposer,
  tags: ['autodocs'],
};

export const Default = { args: {
  users: [{ id: 1, name: 'Alice', email: 'alice@example.com' }, { id: 2, name: 'Bob', email: 'bob@example.com' }],
  previewHtml: '<p>Preview content</p>',
  sending: false,
  imageUploading: false
} };
export const Empty = { args: {
  users: [],
  previewHtml: '',
  sending: false
} };
export const Alternative = { args: {
  users: [{ id: 1, name: 'Alice', email: 'alice@example.com' }, { id: 2, name: 'Bob', email: 'bob@example.com' }],
  previewHtml: '<p>Preview content</p>',
  sending: true,
  imageUploading: false
} };
