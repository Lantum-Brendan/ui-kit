import TPagination from './TPagination.vue';

export default {
  title: 'Components/TPagination',
  component: TPagination,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    currentPage: 1,
    totalPages: 5,
    totalEntries: 48,
    itemsPerPage: 10,
    maxVisible: 5,
    showLabels: false,
    prevLabel: 'Previous',
    nextLabel: 'Next',
    entryText: 'Showing 1-10 of 48',
  },
};

export const MiddlePage = {
  args: {
    currentPage: 3,
    totalPages: 10,
    totalEntries: 100,
    itemsPerPage: 10,
    maxVisible: 5,
    showLabels: true,
    prevLabel: 'Previous',
    nextLabel: 'Next',
    entryText: 'Showing 21-30 of 100',
  },
};

export const LastPage = {
  args: {
    currentPage: 10,
    totalPages: 10,
    totalEntries: 100,
    itemsPerPage: 10,
    maxVisible: 5,
    showLabels: true,
    prevLabel: 'Prev',
    nextLabel: 'Next',
    entryText: 'Showing 91-100 of 100',
  },
};

export const ManyPages = {
  args: {
    currentPage: 5,
    totalPages: 20,
    totalEntries: 200,
    itemsPerPage: 10,
    maxVisible: 3,
    showLabels: false,
    entryText: '',
  },
};
