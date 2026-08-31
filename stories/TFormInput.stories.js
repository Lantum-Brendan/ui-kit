import TFormInput from '../components/TFormInput.vue';

export default {
  title: 'Components/TFormInput',
  component: TFormInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    modelValue: '',
    placeholder: 'Enter wallet name',
    type: 'text',
    disabled: false,
    error: false,
    size: 'md',
  },
};

export const WithValue = {
  args: {
    modelValue: 'Main Wallet',
    placeholder: 'Enter wallet name',
    type: 'text',
    error: false,
    size: 'md',
  },
};

export const ErrorState = {
  args: {
    modelValue: '',
    placeholder: 'Required field',
    type: 'text',
    error: true,
    size: 'md',
  },
};

export const Disabled = {
  args: {
    modelValue: 'Disabled value',
    disabled: true,
    size: 'md',
  },
};
