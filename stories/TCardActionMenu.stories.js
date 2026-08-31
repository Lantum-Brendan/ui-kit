import TCardActionMenu from '../components/TCardActionMenu.vue';

export default {
  title: 'Components/TCardActionMenu',
  component: TCardActionMenu,
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const CustomItems = {
  args: {
    items: [
      { action: 'edit', label: 'Rename' },
      { action: 'duplicate', label: 'Duplicate' },
      { action: 'delete', label: 'Remove', variant: 'danger' },
    ],
  },
};

export const SingleDanger = {
  args: {
    items: [{ action: 'delete', label: 'Delete forever', variant: 'danger' }],
  },
};
