import ConfirmModal from '../components/ConfirmModal.vue';

export default {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
};

export const Default = { args: { isOpen: true, title: 'Are you sure?', message: 'This action cannot be undone.' } };
export const Danger = { args: { isOpen: true, title: 'Delete item?', message: 'This will permanently delete the item.', type: 'danger', confirmText: 'Delete', cancelText: 'Cancel' } };
export const Info = { args: { isOpen: true, title: 'Confirm update', message: 'Do you want to save changes?', type: 'info' } };
