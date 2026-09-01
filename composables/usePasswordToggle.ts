import { ref } from 'vue';

/**
 * Password visibility toggle — Tier 0 primitive
 * Migrated from webui/composables/usePasswordToggle.js
 * .js → .ts for ui-kit; behavior identical.
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
