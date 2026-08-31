import ChatQuestionBlock from './ChatQuestionBlock.vue';

export default {
  title: 'Components/ChatQuestionBlock',
  component: ChatQuestionBlock,
  tags: ['autodocs'],
};

export const Default = { args: { prompt: 'How would you like to proceed?', options: [{ label: 'Show transactions', message: 'Show transactions' }, { label: 'Show summary', message: 'Show summary' }] } };
export const SingleOption = { args: { prompt: 'Confirm?', options: [{ label: 'Yes, proceed', message: 'Yes' }] } };
export const ManyOptions = { args: { prompt: 'Pick a category', options: [{ label: 'Food' }, { label: 'Rent' }, { label: 'Transport' }, { label: 'Utilities' }].map((o) => ({ ...o, message: o.label })) } };
