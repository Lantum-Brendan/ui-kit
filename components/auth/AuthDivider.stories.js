import AuthDivider from './AuthDivider.vue';

export default {
  title: 'Primitives/AuthDivider',
  component: AuthDivider,
};

export const Default = {};
export const InCard = {
  render: () => ({
    components: { AuthDivider },
    template: `
      <div style="max-width:400px; border:1px solid var(--color-border); padding:24px; border-radius:12px;">
        <AuthDivider />
      </div>`,
  }),
};
