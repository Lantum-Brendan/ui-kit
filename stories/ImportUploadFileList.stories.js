import ImportUploadFileList from '../components/ImportUploadFileList.vue';

export default {
  title: 'Components/ImportUploadFileList',
  component: ImportUploadFileList,
  tags: ['autodocs'],
};

const makeFile = (name, size) => ({ name, size });

export const Default = {
  args: {
    files: [],
    labels: { remove: 'Remove' },
  },
};

export const WithSingleFile = {
  args: {
    files: [makeFile('statement.csv', 24576)],
    labels: { remove: 'Remove' },
  },
};

export const WithMultiple = {
  args: {
    files: [makeFile('receipt.jpg', 102400), makeFile('bank.pdf', 512000)],
    labels: { remove: 'Remove file' },
  },
};

export const Interactive = {
  args: {
    files: makeFile('single-file.pdf', 123456),
    labels: { remove: 'Delete' },
  },
};
