import ImportConfirmDialog from '../components/ImportConfirmDialog.vue';

export default {
  title: 'Components/ImportConfirmDialog',
  component: ImportConfirmDialog,
  tags: ['autodocs'],
};

export const Default = { args: {
  show: true,
  acceptedCount: 5,
  rejectedCount: 2,
  duplicatesInAccepted: 1,
  isConfirming: false,
  newWalletCount: 2,
  newPartyCount: 1,
  newCategoryCount: 3,
  missingWalletCount: 0
} };
export const Empty = { args: {
  show: false
} };
export const Alternative = { args: {
  show: true,
  acceptedCount: 5,
  rejectedCount: 2,
  duplicatesInAccepted: 1,
  isConfirming: false,
  newWalletCount: 2,
  newPartyCount: 1,
  newCategoryCount: 3,
  missingWalletCount: 0
} };
