import UserDetail from './UserDetail.vue';

export default {
  title: 'Components/UserDetail',
  component: UserDetail,
  tags: ['autodocs'],
};

const detail = {
  user: { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', is_admin: false, created_at: '2024-03-10T12:00:00Z' },
  preferences: { country: 'US', language: 'en', currency: 'USD' },
  last_transaction_at: '2026-08-20T10:00:00Z',
  counts: { transactions: 42, wallets: 3, categories: 12, parties: 8 },
};
export const Default = { args: { detail, loading: false, error: '' } };
export const Loading = { args: { detail: null, loading: true, error: '' } };
export const ErrorState = { args: { detail: null, loading: false, error: 'Failed to load user.' } };

