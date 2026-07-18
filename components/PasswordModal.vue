<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h3 class="modal-title">
        <Lock class="inline-icon" />
        <span>{{ labels.changePassword }}</span>
      </h3>
      <p class="modal-subtitle">
        {{ labels.confirmPrompt }}
      </p>

      <div class="form-group">
        <label class="form-label">{{ labels.oldPassword }}</label>
        <input v-model="oldPassword" type="password" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">{{ labels.newPassword }}</label>
        <input v-model="newPassword" type="password" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">{{ labels.confirmPassword }}</label>
        <input v-model="confirmNewPassword" type="password" class="form-input" />
      </div>

      <p
        v-if="message"
        class="modal-message"
        :class="{ 'modal-message--error': isError, 'modal-message--success': !isError }"
      >
        {{ message }}
      </p>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="$emit('close')">{{ labels.cancel }}</button>
        <button type="button" class="submit-btn" @click="handleUpdate">
          {{ labels.update }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Lock } from 'lucide-vue-next';

const { labels, messages } = defineProps({
  labels: {
    type: Object,
    default: () => ({
      changePassword: 'Change Password',
      confirmPrompt: 'For security, please enter your old password to confirm the change.',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      cancel: 'Cancel',
      update: 'Update Password'
    })
  },
  messages: {
    type: Object,
    default: () => ({
      incorrectOld: 'Incorrect old password.',
      tooShort: 'New password must be at least 6 characters long.',
      mismatch: 'New passwords do not match.',
      success: 'Password updated successfully!'
    })
  }
});

defineEmits(['close']);

const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const message = ref('');
const isError = ref(false);

const handleUpdate = () => {
  message.value = '';
  isError.value = false;

  if (oldPassword.value !== 'current123') {
    message.value = messages.incorrectOld;
    isError.value = true;
    return;
  }
  if (newPassword.value.length < 6) {
    message.value = messages.tooShort;
    isError.value = true;
    return;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    message.value = messages.mismatch;
    isError.value = true;
    return;
  }

  message.value = messages.success;
  isError.value = false;
  setTimeout(() => {
    oldPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
    message.value = '';
    // notify parent to close modal
  }, 1200);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: $z-index-modal;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal {
  background: $bg-white;
  width: min(480px, calc(100% - 2rem));
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  padding: 1.5rem;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: $font-size-2xl;
  font-weight: $font-bold;
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  color: $text-muted;
  font-size: $font-size-sm;
  margin-bottom: 1rem;
}

.inline-icon {
  width: 20px;
  height: 20px;
}

.modal-message {
  text-align: center;
  font-weight: $font-semibold;
  margin-top: 0.5rem;

  &--error {
    color: $error-color;
  }
  &--success {
    color: $primary;
  }
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.cancel-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: $radius-lg;
  border: 1px solid $border-light;
  color: $text-primary;
  transition: $transition-base;

  &:hover {
    background: $bg-gray;
  }
}
</style>
