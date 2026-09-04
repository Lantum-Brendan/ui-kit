<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleCancel">
    <TCard class="modal-content" @click.stop>
      <template #header>
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <TButton
            variant="text"
            :full-width="false"
            class="close-button"
            @click="handleCancel"
          >
            <XIcon />
          </TButton>
        </div>
      </template>

      <div class="modal-body">
        <div class="icon-container" :class="`type-${type}`">
          <AlertTriangleIcon v-if="type === 'warning'" />
          <TrashIcon v-else-if="type === 'danger'" />
          <InfoIcon v-else />
        </div>
        <p class="message">{{ message }}</p>
      </div>

      <template #footer>
        <div class="modal-actions">
          <TButton variant="secondary" :full-width="false" @click="handleCancel">
            {{ cancelText || t('Cancel') }}
          </TButton>
          <TButton
            variant="primary"
            :full-width="false"
            class="confirm-button"
            :class="`type-${type}`"
            @click="handleConfirm"
          >
            {{ confirmText || t('Confirm') }}
          </TButton>
        </div>
      </template>
    </TCard>
  </div>
</template>

<script setup>
import {
  X as XIcon,
  AlertTriangle as AlertTriangleIcon,
  Trash as TrashIcon,
  Info as InfoIcon
} from 'lucide-vue-next';
import TCard from '../TCard.vue';
import TButton from '../TButton.vue';

const { t } = useI18n();

defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmText: { type: String, default: '' },
  cancelText: { type: String, default: '' },
  type: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'danger', 'info'].includes(value)
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => emit('confirm');
const handleCancel = () => emit('cancel');
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

// TCard provides bg, border-radius and shadow — we only set sizing & animation
.modal-content {
  max-width: 400px;
  width: 100%;
  animation: modalEnter 0.2s ease-out;

  @media (max-width: $breakpoint-sm) {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
}

@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;

  @media (max-width: $breakpoint-sm) {
    padding: 1rem 1rem 0;
  }
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0;

  @media (max-width: $breakpoint-sm) {
    font-size: 1.125rem;
  }
}

// Icon-only close button — strip TButton padding
.close-button {
  padding: 0.25rem;
  min-height: auto;
  color: $text-secondary;
}

.modal-body {
  padding: 1.5rem;
  text-align: center;

  @media (max-width: $breakpoint-sm) {
    padding: 1rem;
  }
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;

  svg { width: 24px; height: 24px; }

  &.type-warning { background: $warning-bg; color: $warning; }
  &.type-danger  { background: rgba(var(--color-error-rgb), 0.15); color: $error-color; }
  &.type-info    { background: rgba(var(--color-primary-rgb), 0.15); color: $primary; }
}

.message {
  color: $text-secondary;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
  justify-content: flex-end;

  @media (max-width: $breakpoint-sm) {
    padding: 0 1rem 1rem;
    flex-direction: column-reverse;

    // Both buttons go full-width on mobile
    > * { width: 100%; }
  }
}

// Contextual colour overrides for the confirm button
.confirm-button {
  &.type-warning {
    --btn-bg: #{$warning};
    --btn-border: #{$warning};
    --btn-color: #{$text-primary};
    --btn-bg-hover: #{$warning-text};
    --btn-border-hover: #{$warning-text};
    --btn-color-hover: #{$bg-white};
  }
  &.type-danger {
    --btn-bg: #{$error-color};
    --btn-border: #{$error-color};
    --btn-bg-hover: #{$error-dark};
    --btn-border-hover: #{$error-dark};
  }
}
</style>
