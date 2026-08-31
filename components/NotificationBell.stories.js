import NotificationBell from './NotificationBell.vue';

export default {
  title: 'Components/NotificationBell',
  component: NotificationBell,
  tags: ['autodocs'],
};

const notifications = [
  { id: 1, type: 'reminder', title: 'Pay electricity bill', body: 'Due tomorrow', read_at: null, created_at: new Date().toISOString() },
  { id: 2, type: 'achievement', title: 'Goal reached', body: 'You saved $500', read_at: '2026-04-01T10:00:00Z', created_at: new Date(Date.now() - 3600_000 * 5).toISOString() },
  { id: 3, type: 'alert', title: 'Unusual spending detected', body: 'Spending up 30% this week in Dining category which seems unusually high for you', read_at: null, created_at: new Date(Date.now() - 3600_000 * 24).toISOString() },
];

export const Default = {
  args: {
    notifications,
    unreadCount: 2,
    loading: false,
  },
};

export const Empty = {
  args: {
    notifications: [],
    unreadCount: 0,
    loading: false,
  },
};

export const Loading = {
  args: {
    notifications: [],
    unreadCount: 0,
    loading: true,
  },
};

export const ManyUnread = {
  args: {
    notifications,
    unreadCount: 99,
    loading: false,
  },
};
