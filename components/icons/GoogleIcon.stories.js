import GoogleIcon from './GoogleIcon.vue';

export default {
  title: 'Primitives/GoogleIcon',
  component: GoogleIcon,
};

export const Default = {};
export const Large = {
  render: () => ({
    components: { GoogleIcon },
    template: `<div style="transform:scale(2); transform-origin:left;"><GoogleIcon /></div>`,
  }),
};
