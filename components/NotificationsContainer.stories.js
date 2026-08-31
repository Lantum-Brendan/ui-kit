import NotificationsContainer from './NotificationsContainer.vue';

export default {
  title: 'Components/NotificationsContainer',
  component: NotificationsContainer,
  tags: ['autodocs'],
};

const notifications = [
  { id: 1, type: 'success', title: 'Wallet created', message: 'Your wallet \'Savings\' was created.' },
  { id: 2, type: 'error', title: 'Import failed', message: 'CSV parsing error on line 42.' },
  { id: 3, type: 'warning', title: 'Budget exceeded', message: 'Dining budget at 110%.' },
  { id: 4, type: 'info', title: 'New feature', message: 'Check out the new reports tab.' },
];

export const Default = {
  args: {
    notifications: [notifications[0]],
    confirmModal: null,
  },
};

export const WithMultipleTypes = {
  args: {
    notifications,
    confirmModal: null,
  },
};

export const WithConfirmModal = {
  args: {
    notifications,
    confirmModal: {
      isOpen: true,
      title: 'Delete wallet?',
      message: 'This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    },
  },
};

export const Empty = {
  args: {
    notifications: [],
    confirmModal: null,
  },
};
