import ChatComposer from '../components/ChatComposer.vue';

export default {
  title: 'Components/ChatComposer',
  component: ChatComposer,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    modelValue: '',
    disabled: false,
  },
};

export const WithText = {
  args: {
    modelValue: 'Hello, what is my balance?',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    modelValue: 'Please wait...',
    disabled: true,
    labels: {
      remove: 'Remove',
      attachFile: 'Attach a file',
      placeholder: 'Composer disabled',
      send: 'Send',
    },
  },
};
