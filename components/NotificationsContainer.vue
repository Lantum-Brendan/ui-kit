<template>
  <div>
    <div class="notifications-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="`notification--${notification.type}`"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-icon">
          <CheckCircleIcon v-if="notification.type === 'success'" />
          <XCircleIcon v-else-if="notification.type === 'error'" />
          <AlertTriangleIcon v-else-if="notification.type === 'warning'" />
          <InfoIcon v-else />
        </div>
        <div class="notification-content">
          <h4 class="notification-title">{{ notification.title }}</h4>
          <p v-if="notification.message" class="notification-message">{{ notification.message }}</p>
        </div>
        <button class="notification-close" @click.stop="removeNotification(notification.id)">
          <XIcon />
        </button>
      </div>
    </div>

    <ConfirmModal
      :is-open="!!confirmModal && confirmModal.isOpen"
      :title="confirmModal?.title ?? ''"
      :message="confirmModal?.message ?? ''"
      :confirm-text="confirmModal?.confirmText"
      :cancel-text="confirmModal?.cancelText"
      :type="confirmModal?.type ?? 'warning'"
      @confirm="handleConfirmResponse(true)"
      @cancel="handleConfirmResponse(false)"
    />
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  X as XIcon
} from 'lucide-vue-next';
import ConfirmModal from './ConfirmModal.vue';

export interface KitNotification {
  id: number | string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

export interface KitConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

const props = defineProps<{
  /** Notifications to render. */
  notifications: KitNotification[];
  /** Confirm-modal state, or null when closed. */
  confirmModal?: KitConfirmModalState | null;
}>();

const emit = defineEmits<{
  (e: 'remove', id: number | string): void;
  (e: 'confirm-response', value: boolean): void;
}>();

const removeNotification = (id: number | string) => {
  emit('remove', id);
};

const handleConfirmResponse = (value: boolean) => {
  emit('confirm-response', value);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;

  @media (max-width: $breakpoint-sm) {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    max-width: none;
  }
}

.notification {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: $bg-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  border-left: 4px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: slideIn 0.3s ease-out;

  &:hover {
    transform: translateX(-2px);
    box-shadow: $shadow-xl;
  }

  &--success {
    border-left-color: $success;

    .notification-icon {
      color: $success;
    }
  }

  &--error {
    border-left-color: $error-color;

    .notification-icon {
      color: $error-color;
    }
  }

  &--warning {
    border-left-color: $warning;

    .notification-icon {
      color: $warning;
    }
  }

  &--info {
    border-left-color: $info;

    .notification-icon {
      color: $info;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.notification-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;

  svg {
    width: 20px;
    height: 20px;
  }
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 0.25rem 0;
  line-height: 1.25;
}

.notification-message {
  font-size: 0.8rem;
  color: $text-secondary;
  margin: 0;
  line-height: 1.4;
}

.notification-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: $text-secondary;
  cursor: pointer;
  padding: 0.125rem;
  border-radius: $radius-sm;
  transition: all 0.2s ease;

  &:hover {
    background: $bg-light;
    color: $text-primary;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: $breakpoint-sm) {
  .notification {
    padding: 0.75rem;
  }

  .notification-title {
    font-size: 0.8rem;
  }

  .notification-message {
    font-size: 0.75rem;
  }
}
</style>
