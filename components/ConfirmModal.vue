<template>
  <TModal :model-value="isOpen" size="sm" @close="handleCancel">
    <TModalHeader :title="title" @close="handleCancel" />
    <TModalBody>
      <div class="icon-container" :class="`type-${type}`">
        <AlertTriangleIcon v-if="type === 'warning'" />
        <TrashIcon v-else-if="type === 'danger'" />
        <InfoIcon v-else />
      </div>
      <p class="message">{{ message }}</p>
    </TModalBody>
    <TModalFooter align="right">
      <button class="cancel-button" @click="handleCancel">
        {{ cancelText || labels.cancel }}
      </button>
      <button class="confirm-button" :class="`type-${type}`" @click="handleConfirm">
        {{ confirmText || labels.confirm }}
      </button>
    </TModalFooter>
  </TModal>
</template>

<script setup>
import TModal from './TModal.vue';
import TModalHeader from './TModalHeader.vue';
import TModalBody from './TModalBody.vue';
import TModalFooter from './TModalFooter.vue';
import {
  AlertTriangle as AlertTriangleIcon,
  Trash as TrashIcon,
  Info as InfoIcon
} from 'lucide-vue-next';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'danger', 'info'].includes(value)
  },
  labels: {
    type: Object,
    default: () => ({
      cancel: 'Cancel',
      confirm: 'Confirm'
    })
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;

  svg {
    width: 24px;
    height: 24px;
  }

  &.type-warning {
    background: $warning-bg;
    color: $warning;
  }

  &.type-danger {
    background: rgba(var(--color-error-rgb), 0.15);
    color: $error-color;
  }

  &.type-info {
    background: rgba(var(--color-primary-rgb), 0.15);
    color: $primary;
  }
}

.message {
  color: $text-secondary;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

.cancel-button,
.confirm-button {
  padding: 0.5rem 1rem;
  border-radius: $radius-md;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  min-width: 80px;
}

.cancel-button {
  background: $bg-white;
  color: $text-secondary;
  border-color: $border-light;

  &:hover {
    background: $bg-light;
    border-color: $border-medium;
  }
}

.confirm-button {
  &.type-warning {
    background: $warning;
    color: $text-primary;
    border-color: $warning;

    &:hover {
      background: $warning-text;
      border-color: $warning-text;
      color: $bg-white;
    }
  }

  &.type-danger {
    background: $error-color;
    color: white;
    border-color: $error-color;

    &:hover {
      background: $error-dark;
      border-color: $error-dark;
    }
  }

  &.type-info {
    background: $primary;
    color: white;
    border-color: $primary;

    &:hover {
      background: $primary-dark;
      border-color: $primary-dark;
    }
  }
}
</style>
