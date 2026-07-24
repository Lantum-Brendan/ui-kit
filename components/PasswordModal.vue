<template>
  <TModal :model-value="true" size="sm" @close="$emit('close')">
    <TModalHeader :title="labels.changePassword" @close="$emit('close')">
      <template #icon>
        <Lock class="inline-icon" />
      </template>
    </TModalHeader>
    <TModalBody>
      <p class="modal-subtitle">
        {{ labels.confirmPrompt }}
      </p>

      <TFormField :label="labels.oldPassword">
        <TFormInput v-model="oldPassword" type="password" />
      </TFormField>

      <TFormField :label="labels.newPassword">
        <TFormInput v-model="newPassword" type="password" />
      </TFormField>

      <TFormField :label="labels.confirmPassword">
        <TFormInput v-model="confirmNewPassword" type="password" />
      </TFormField>

      <p
        v-if="message"
        class="modal-message"
        :class="{ 'modal-message--error': isError, 'modal-message--success': !isError }"
      >
        {{ message }}
      </p>
    </TModalBody>
    <TModalFooter align="right">
      <button type="button" class="cancel-btn" @click="$emit('close')">
        {{ labels.cancel }}
      </button>
      <button type="button" class="submit-btn" @click="handleUpdate">
        {{ labels.update }}
      </button>
    </TModalFooter>
  </TModal>
</template>

<script setup>
import { ref } from 'vue';
import TModal from './TModal.vue';
import TModalHeader from './TModalHeader.vue';
import TModalBody from './TModalBody.vue';
import TModalFooter from './TModalFooter.vue';
import TFormField from './TFormField.vue';
import TFormInput from './TFormInput.vue';
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
  }, 1200);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.inline-icon {
  width: 20px;
  height: 20px;
  color: $primary;
}

.modal-subtitle {
  color: $text-muted;
  font-size: $font-size-sm;
  margin-bottom: 1rem;
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

.cancel-btn {
  padding: 0.5rem 0.75rem;
  border-radius: $radius-lg;
  border: 1px solid $border-light;
  color: $text-primary;
  background: $bg-white;
  cursor: pointer;

  &:hover {
    background: $bg-gray;
  }
}

.submit-btn {
  padding: 0.5rem 0.75rem;
  border-radius: $radius-lg;
  border: none;
  color: $text-inverse;
  background: $primary;
  cursor: pointer;

  &:hover {
    background: $primary-hover;
  }
}
</style>
