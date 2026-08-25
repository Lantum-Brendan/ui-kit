<script setup lang="ts">
import TButton from './TButton.vue';
import GoogleIcon from './GoogleIcon.vue';

const props = defineProps({
  mode: {
    type: String as () => 'login' | 'signup',
    default: 'login' as const,
    validator: (value: string) => ['login', 'signup'].includes(value)
  },
  labels: {
    type: Object as () => { signInWithGoogle: string; signUpWithGoogle: string },
    default: () => ({
      signInWithGoogle: 'Sign in with Google',
      signUpWithGoogle: 'Sign up with Google'
    })
  }
});

const emit = defineEmits<{ (e: 'google-login'): void }>();

const handleGoogleLogin = () => {
  emit('google-login');
};
</script>

<template>
  <TButton
    type="button"
    variant="secondary"
    class="w-full btn-google"
    @click="handleGoogleLogin"
  >
    <template #left-icon>
      <GoogleIcon />
    </template>
    {{ props.mode === 'login' ? labels.signInWithGoogle : labels.signUpWithGoogle }}
  </TButton>
</template>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
// .btn-google style is global in webui auth.scss — kept minimal here for isolation.
// Host can provide global .btn-google if needed.
</style>
