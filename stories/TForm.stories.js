import TForm from '../components/TForm.vue';

export default {
  title: 'Components/TForm',
  component: TForm,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Create Wallet',
    isSubmitting: false,
    apiError: '',
    submitLabel: 'Create',
    cancelLabel: 'Cancel',
    showClose: true,
    showCancel: true,
  },
  render: (args) => ({
    components: { TForm },
    setup() { return { args }; },
    template: '<TForm v-bind="args"><div style="padding:12px; border:1px dashed #ccc;">Form body content</div></TForm>',
  }),
};

export const Submitting = {
  args: {
    title: 'Saving...',
    isSubmitting: true,
    apiError: '',
    submitLabel: 'Saving',
    cancelLabel: 'Cancel',
    showClose: false,
    showCancel: true,
  },
  render: (args) => ({
    components: { TForm },
    setup() { return { args }; },
    template: '<TForm v-bind="args"><div style="padding:12px;">Please wait</div></TForm>',
  }),
};

export const WithError = {
  args: {
    title: 'Create Wallet',
    isSubmitting: false,
    apiError: 'Failed to create wallet: name already exists',
    submitLabel: 'Create',
    cancelLabel: 'Cancel',
    showClose: true,
    showCancel: true,
  },
  render: (args) => ({
    components: { TForm },
    setup() { return { args }; },
    template: '<TForm v-bind="args"><div style="padding:12px;">Try again</div></TForm>',
  }),
};
