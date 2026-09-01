import LoadingSkeleton from './LoadingSkeleton.vue';

export default {
  title: 'Primitives/LoadingSkeleton',
  component: LoadingSkeleton,
  argTypes: {
    variant: { control: 'select', options: ['default', 'list', 'card', 'table'] },
    count: { control: 'number' },
    columns: { control: 'number' },
  },
};

export const Default = { args: { variant: 'default', count: 3 } };
export const List = { args: { variant: 'list', count: 3 } };
export const Card = { args: { variant: 'card' } };
export const Table = { args: { variant: 'table', count: 3, columns: 4 } };
