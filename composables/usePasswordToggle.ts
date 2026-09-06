import { ref } from 'vue';

/**
 * Manages password field visibility toggling.
 */
export const usePasswordToggle = () => {
  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  return {
    showPassword,
    togglePassword
  };
};
