import ChatCanvasBlock from './ChatCanvasBlock.vue';

export default {
  title: 'Components/ChatCanvasBlock',
  component: ChatCanvasBlock,
  tags: ['autodocs'],
};

const blockSample = {
  title: 'Monthly Report',
  blocks: [
    { type: 'markdown', text: 'This is a preview of the canvas content.' },
    { type: 'callout', text: 'Important note', title: 'Note', variant: 'info' },
  ],
};
export const Default = { args: { block: blockSample } };
export const NoBlocks = { args: { block: { title: 'Empty Doc', blocks: [] } } };
export const SingleBlock = { args: { block: { title: 'Summary', blocks: [{ type: 'markdown', text: 'Only one section here.' }] } } };

