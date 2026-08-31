import TransferFormContainer from './TransferFormContainer.vue';

export default {
  title: 'Components/TransferFormContainer',
  component: TransferFormContainer,
  tags: ['autodocs'],
};

export const Default = { args: {
  isSubmitting: false
} };
export const Empty = { args: {
  isSubmitting: false
} };
export const Alternative = { args: {
  isSubmitting: true
} };
