import AuthSocialLogin from '../components/AuthSocialLogin.vue';

export default {
  title: 'Components/AuthSocialLogin',
  component: AuthSocialLogin,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['login', 'signup'] },
  },
};

export const Default = {
  args: {
    mode: 'login',
  },
};

export const Signup = {
  args: {
    mode: 'signup',
  },
};

export const WithCustomLabels = {
  args: {
    mode: 'login',
    labels: {
      signInWithGoogle: 'Continue with Google',
      signUpWithGoogle: 'Create account with Google',
    },
  },
};
