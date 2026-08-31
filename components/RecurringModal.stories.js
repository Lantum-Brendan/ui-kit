import RecurringModal from './RecurringModal.vue';

export default {
  title: 'Components/RecurringModal',
  component: RecurringModal,
  tags: ['autodocs'],
};

export const Default = { args: {
  isOpen: true,
  transaction: { id: 1, description: 'Test', amount: 100, isRecurring: false }
} };
export const Empty = { args: {
  isOpen: false,
  transaction: null
} };
export const Alternative = { args: {
  isOpen: true,
  transaction: { id: 1, description: 'Test', amount: 100, isRecurring: false }
} };
