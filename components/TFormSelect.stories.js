import TFormSelect from './TFormSelect.vue';

export default {
  title: 'Components/TFormSelect',
  component: TFormSelect,
  tags: ['autodocs'],
};

const options = [
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'GBP - British Pound', value: 'GBP' },
];

export const Default = {
  args: {
    modelValue: 'USD',
    options,
    disabled: false,
    error: false,
    size: 'md',
  },
};

export const WithError = {
  args: {
    modelValue: '',
    options,
    error: true,
    size: 'md',
  },
};

export const Disabled = {
  args: {
    modelValue: 'EUR',
    options,
    disabled: true,
    size: 'md',
  },
};

export const SmallSize = {
  args: {
    modelValue: 'GBP',
    options,
    size: 'sm',
  },
};
