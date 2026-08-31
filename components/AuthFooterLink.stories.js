import AuthFooterLink from './AuthFooterLink.vue';

export default {
  title: 'Components/AuthFooterLink',
  component: AuthFooterLink,
  tags: ['autodocs'],
};

export const Default = { args: { text: 'Already have an account?', linkText: 'Log in', to: '/login' } };
export const Register = { args: { text: "Don't have an account?", linkText: 'Sign up', to: '/register' } };
export const Forgot = { args: { text: 'Forgot your password?', linkText: 'Reset it', to: '/reset' } };
