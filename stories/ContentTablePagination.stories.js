import ContentTablePagination from '../components/ContentTablePagination.vue';

export default {
  title: 'Components/ContentTablePagination',
  component: ContentTablePagination,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    currentPage: 1,
    totalPages: 5,
    perPage: 10,
    previousPageLabel: 'Previous page',
    nextPageLabel: 'Next page',
    showLabel: 'Show',
    perPageLabel: 'per page',
  },
};

export const Middle = {
  args: {
    currentPage: 3,
    totalPages: 10,
    perPage: 20,
    previousPageLabel: 'Previous page',
    nextPageLabel: 'Next page',
    showLabel: 'Show',
    perPageLabel: 'per page',
  },
};

export const LastPage = {
  args: {
    currentPage: 10,
    totalPages: 10,
    perPage: 10,
    previousPageLabel: 'Prev',
    nextPageLabel: 'Next',
    showLabel: 'Show',
    perPageLabel: 'per page',
  },
};
