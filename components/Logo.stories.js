import Logo from './Logo.vue';

export default {
  title: 'Primitives/Logo',
  component: Logo,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    alt: { control: 'text' },
  },
};

export const Small = { args: { size: 'small' } };
export const Medium = { args: { size: 'medium' } };
export const Large = { args: { size: 'large' } };

export const AllSizes = {
  render: () => ({
    components: { Logo },
    template: `
      <div style="display:flex; gap:24px; align-items:flex-end;">
        <Logo size="small" />
        <Logo size="medium" />
        <Logo size="large" />
      </div>`,
  }),
};
