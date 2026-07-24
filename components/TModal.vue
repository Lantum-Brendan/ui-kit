<template>
  <Teleport to="body">
    <Transition name="t-modal-fade">
      <div
        v-if="modelValue"
        class="t-modal-overlay"
        tabindex="-1"
        @click.self="handleBackdropClick"
        @keydown.esc="handleEsc"
      >
        <div
          :class="['t-modal-dialog', `t-modal-dialog--${size}`]"
          role="dialog"
          aria-modal="true"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnBackdrop?: boolean;
    closeOnEsc?: boolean;
  }>(),
  {
    size: 'md',
    closeOnBackdrop: true,
    closeOnEsc: true
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) close();
};

const handleEsc = () => {
  if (props.closeOnEsc) close();
};

// Lock scroll when modal is open
watch(
  () => props.modelValue,
  (isOpen) => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-4;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.t-modal-dialog {
  width: 100%;
  background-color: $bg-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-xl;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  border: 1px solid $border-color;

  &--sm {
    max-width: 400px;
  }

  &--md {
    max-width: 540px;
  }

  &--lg {
    max-width: 720px;
  }

  &--xl {
    max-width: 900px;
  }
}

.t-modal-fade-enter-active,
.t-modal-fade-leave-active {
  transition: opacity 0.25s ease;

  .t-modal-dialog {
    transition: transform 0.25s ease;
  }
}

.t-modal-fade-enter-from,
.t-modal-fade-leave-to {
  opacity: 0;

  .t-modal-dialog {
    transform: scale(0.95);
  }
}
</style>
