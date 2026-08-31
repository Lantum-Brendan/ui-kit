import TModalHeader from './TModalHeader.vue';

export default {
  title: 'Components/TModalHeader',
  component: TModalHeader,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Edit wallet', showClose: true } };
export const WithoutClose = { args: { title: 'Read only', showClose: false } };
export const LongTitle = { args: { title: 'Very long modal title that wraps when needed', showClose: true } };

