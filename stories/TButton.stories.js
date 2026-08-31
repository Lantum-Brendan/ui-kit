import TButton from '../components/TButton.vue';

export default {
  title: 'Primitives/TButton',
  component: TButton,
  args: { text: 'Button', fullWidth: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'text'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Primary = { args: { variant: 'primary', text: 'Save' } };
export const Secondary = { args: { variant: 'secondary', text: 'Cancel' } };
export const Outline = { args: { variant: 'outline', text: 'Outline' } };
export const Text = { args: { variant: 'text', text: 'Text' } };
export const Loading = { args: { loading: true, text: 'Saving' } };
export const Disabled = { args: { disabled: true, text: 'Disabled' } };
export const AsLink = { args: { to: '/destination', text: 'Go somewhere' } };

export const Sizes = {
  render: () => ({
    components: { TButton },
    template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <TButton size="small" :full-width="false" text="Small" />
        <TButton size="medium" :full-width="false" text="Medium" />
        <TButton size="large" :full-width="false" text="Large" />
      </div>`,
  }),
};
