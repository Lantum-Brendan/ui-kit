import OutreachComposerAudience from '../components/OutreachComposerAudience.vue';

export default {
  title: 'Components/OutreachComposerAudience',
  component: OutreachComposerAudience,
  tags: ['autodocs'],
};

const audiences = [
  { value: 'all', label: 'All users' },
  { value: 'active', label: 'Active users' },
  { value: 'inactive', label: 'Inactive users' },
];
const users = [
  { id: 1, first_name: 'Alice', last_name: 'Johnson', email: 'alice@example.com' },
  { id: 2, first_name: 'Bob', last_name: 'Smith', email: 'bob@example.com' },
  { id: 3, first_name: 'Carol', last_name: 'White', email: 'carol@example.com' },
];
const labels = {
  audience: 'Audience',
  audienceOptions: { all: 'All users', active: 'Active users', inactive: 'Inactive users' },
  chooseRecipients: 'Choose recipients',
  searchUsers: 'Search users...',
  noMatches: 'No matches found',
};

export const Default = {
  args: {
    audiences,
    selectedAudience: 'all',
    users,
    selectedUserIds: [],
    labels,
  },
};

export const WithSelection = {
  args: {
    audiences,
    selectedAudience: 'active',
    users,
    selectedUserIds: [1, 2],
    labels,
  },
};

export const Interactive = {
  args: {
    audiences,
    selectedAudience: 'inactive',
    users,
    selectedUserIds: [3],
    labels,
  },
};
