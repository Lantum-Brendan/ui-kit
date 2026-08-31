import SettingsConnections from './SettingsConnections.vue';

export default {
  title: 'Components/SettingsConnections',
  component: SettingsConnections,
  tags: ['autodocs'],
};

const tokens = [
  { id: 1, name: 'Claude Desktop', last_used_at: new Date().toISOString() },
  { id: 2, name: 'Cursor', last_used_at: null },
];

export const Default = {
  args: {
    endpoint: 'https://api.trakli.example/mcp',
    tokens,
    loading: false,
    creating: false,
    createdToken: null,
  },
};

export const EmptyTokens = {
  args: {
    endpoint: 'https://api.trakli.example/mcp',
    tokens: [],
    loading: false,
    creating: false,
    createdToken: null,
  },
};

export const WithCreatedToken = {
  args: {
    endpoint: 'https://api.trakli.example/mcp',
    tokens,
    loading: false,
    creating: false,
    createdToken: { token: 'sk_live_abc123xyz', name: 'New token' },
  },
};

export const LoadingState = {
  args: {
    endpoint: 'https://api.trakli.example/mcp',
    tokens: [],
    loading: true,
    creating: false,
    createdToken: null,
  },
};
