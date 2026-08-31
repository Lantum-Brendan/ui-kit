import AuthDivider from '../components/AuthDivider.vue';

export default {
  title: 'Components/AuthDivider',
  component: AuthDivider,
  tags: ['autodocs'],
};

export const Default = { args: {} };
export const InCard = {
  render: () => ({
    components: { AuthDivider },
    template: '<div style="max-width:320px;padding:16px;border:1px solid #eee;border-radius:8px"><AuthDivider /></div>',
  }),
};
export const WithText = { args: {} };
