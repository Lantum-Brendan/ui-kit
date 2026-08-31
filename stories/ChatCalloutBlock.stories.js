import ChatCalloutBlock from '../components/ChatCalloutBlock.vue';

export default {
  title: 'Components/ChatCalloutBlock',
  component: ChatCalloutBlock,
  tags: ['autodocs'],
};

export const Info = { args: { title: 'Heads up', text: 'This is an informational callout.', variant: 'info' } };
export const Success = { args: { title: 'Done', text: 'Your import succeeded.', variant: 'success' } };
export const Warning = { args: { title: 'Warning', text: 'Some rows had issues.', variant: 'warning' } };

