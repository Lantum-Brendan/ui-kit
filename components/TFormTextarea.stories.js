import TFormTextarea from './TFormTextarea.vue';

export default {
  title: 'Components/TFormTextarea',
  component: TFormTextarea,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    modelValue: '',
    placeholder: 'Enter description...',
    rows: 3,
    disabled: false,
    error: false,
  },
};

export const WithValue = {
  args: {
    modelValue: 'This is a detailed description of the wallet purpose and usage.',
    placeholder: 'Enter description...',
    rows: 4,
  },
};

export const WithError = {
  args: {
    modelValue: '',
    placeholder: 'Required',
    rows: 3,
    error: true,
  },
};

export const LongText = {
  args: {
    modelValue: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5',
    rows: 5,
    maxlength: 500,
  },
};
