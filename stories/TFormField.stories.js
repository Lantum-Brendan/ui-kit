import TFormField from '../components/TFormField.vue';

export default {
  title: 'Components/TFormField',
  component: TFormField,
  tags: ['autodocs'],
};

export const Default = {
  args: { label: 'Email', fieldId: 'email', hint: 'We will never share your email.' },
  render: (args) => ({
    components: { TFormField },
    setup() { return { args }; },
    template: `<TFormField v-bind="args"><input id="email" placeholder="you@example.com" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px" /></TFormField>`,
  }),
};
export const WithError = {
  args: { label: 'Password', fieldId: 'password', error: 'Password is required', required: true },
  render: (args) => ({
    components: { TFormField },
    setup() { return { args }; },
    template: `<TFormField v-bind="args"><input id="password" type="password" style="width:100%;padding:8px;border:1px solid #ef4444;border-radius:6px" /></TFormField>`,
  }),
};
export const Required = {
  args: { label: 'Wallet name', fieldId: 'wallet', required: true, hint: '' },
  render: (args) => ({
    components: { TFormField },
    setup() { return { args }; },
    template: `<TFormField v-bind="args"><input id="wallet" placeholder="My wallet" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px" /></TFormField>`,
  }),
};

