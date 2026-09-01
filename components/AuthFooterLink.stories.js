import AuthFooterLink from './AuthFooterLink.vue';

export default {
  title: 'Primitives/AuthFooterLink',
  component: AuthFooterLink,
  args: { text: 'No account?', linkText: 'Sign up', to: '/register' },
  argTypes: {
    text: { control: 'text' },
    linkText: { control: 'text' },
    to: { control: 'text' },
  },
};

export const Default = {};
export const Login = { args: { text: 'Already have an account?', linkText: 'Log in', to: '/login' } };
