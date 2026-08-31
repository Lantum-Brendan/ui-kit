import LoadingSkeleton from '../components/LoadingSkeleton.vue';

export default {
  title: 'Primitives/LoadingSkeleton',
  component: LoadingSkeleton,
  argTypes: {
    variant: { control: { type: 'select', options: ['default', 'list', 'card', 'table'] } },
    count: { control: 'number' },
    columns: { control: 'number' }
  }
};

const Template = (args) => ({
  components: { LoadingSkeleton },
  setup() {
    return { args };
  },
  template: `<LoadingSkeleton v-bind="args" />`
});

export const Default = Template.bind({});
Default.args = { variant: 'default', count: 3 };

export const List = Template.bind({});
List.args = { variant: 'list', count: 3 };

export const Card = Template.bind({});
Card.args = { variant: 'card' };

export const Table = Template.bind({});
Table.args = { variant: 'table', count: 3, columns: 4 };
