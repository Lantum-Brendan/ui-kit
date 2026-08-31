import TransactionFormAttachments from './TransactionFormAttachments.vue';

export default {
  title: 'Components/TransactionFormAttachments',
  component: TransactionFormAttachments,
  tags: ['autodocs'],
  argTypes: {
    inputId: { control: 'text' },
  },
};

const labels = {
  attachment: 'Attachment',
  remove: 'Remove attachment',
  browseFiles: 'Browse files',
  fileHint: 'PNG, JPG, PDF up to 10MB',
};

export const Default = {
  args: {
    existingAttachments: [],
    existingPreviews: {},
    newAttachments: [],
    inputId: 'file-input-default',
    labels,
  },
};

export const WithExisting = {
  args: {
    existingAttachments: [
      { id: '1', path: 'receipt.jpg' },
      { id: '2', path: 'invoice.pdf' },
    ],
    existingPreviews: { '1': 'https://via.placeholder.com/80' },
    removingFileIds: new Set(),
    newAttachments: [],
    inputId: 'file-input-existing',
    labels,
  },
};

export const WithNew = {
  args: {
    existingAttachments: [],
    existingPreviews: {},
    removingFileIds: new Set(),
    newAttachments: [
      { name: 'photo.png', isImage: true, previewUrl: 'https://via.placeholder.com/80' },
      { name: 'doc.pdf', isImage: false },
    ],
    inputId: 'file-input-new',
    labels,
  },
};

export const Interactive = {
  args: {
    existingAttachments: [{ id: '1', path: 'statement.pdf' }],
    existingPreviews: {},
    removingFileIds: new Set(['1']),
    newAttachments: [{ name: 'new-receipt.jpg', isImage: true, previewUrl: 'https://via.placeholder.com/80' }],
    inputId: 'file-input-interactive',
    labels,
  },
};
