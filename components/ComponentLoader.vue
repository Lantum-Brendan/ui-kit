<template>
  <div class="component-loader">
    <LoadingSkeleton
      v-if="isLoading && !hasData"
      :variant="skeletonVariant"
      :count="skeletonCount"
      :columns="skeletonColumns"
    />

    <div v-if="error && !isLoading" class="error-state">
      <div class="error-icon">
        <AlertTriangle :size="24" />
      </div>
      <div class="error-content">
        <h3 class="error-title">
          <span v-if="getErrorCode(error)">{{ errorTitle }} {{ getErrorCode(error) }}</span>
          <span v-else>{{ errorFallbackTitle }}</span>
        </h3>
        <p class="error-message">{{ formatErrorMessage(error) }}</p>
        <TButton
          v-if="onRetry"
          :text="retryLabel"
          variant="primary"
          size="medium"
          :full-width="false"
          @click="onRetry"
        />
      </div>
    </div>

    <div v-if="!isLoading && !error && !hasData && showEmpty" class="empty-state">
      <slot name="empty">
        <EmptyState
          :title="emptyTitle || undefined"
          :description="emptySubtitle || undefined"
          :action-label="emptyButtonLabel || undefined"
          @create="$emit('create')"
        />
      </slot>
    </div>

    <div v-if="hasData" class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
import LoadingSkeleton from './LoadingSkeleton.vue';
import EmptyState from './EmptyState.vue';
import TButton from './TButton.vue';
import { AlertTriangle } from 'lucide-vue-next';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, Object, Error],
    default: null
  },
  hasData: {
    type: Boolean,
    default: false
  },
  showEmpty: {
    type: Boolean,
    default: true
  },
  emptyStateName: {
    type: String,
    default: 'items'
  },
  emptyTitle: {
    type: String,
    default: ''
  },
  emptySubtitle: {
    type: String,
    default: ''
  },
  emptyButtonLabel: {
    type: String,
    default: ''
  },
  skeletonVariant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'list', 'card', 'table'].includes(value)
  },
  skeletonCount: {
    type: Number,
    default: 3
  },
  skeletonColumns: {
    type: Number,
    default: 4
  },
  onRetry: {
    type: Function,
    default: null
  },
  errorTitle: {
    type: String,
    default: 'Error:'
  },
  errorFallbackTitle: {
    type: String,
    default: 'Something went wrong'
  },
  retryLabel: {
    type: String,
    default: 'Try Again'
  },
  errorFormatter: {
    type: Function,
    default: null
  }
});

defineEmits(['create']);

// Default error extraction fallback helper
function defaultExtractApiErrors(err) {
  if (typeof err === 'string') return err;
  if (err?.response?._data?.message) return err.response._data.message;
  if (err?.response?._data?.errors?.length) return err.response._data.errors.join(', ');
  if (err?.message) return err.message;
  if (err?._data?.message) return err._data.message;
  if (err?._data?.errors?.length) return err._data.errors.join(', ');
  return 'An unknown error occurred';
}

function formatErrorMessage(error) {
  if (props.errorFormatter) return props.errorFormatter(error);
  return defaultExtractApiErrors(error);
}

// Extract HTTP status code from error object
function getErrorCode(error) {
  if (!error) return null;
  if (error?.response?.status) return error.response.status;
  if (error?.status) return error.status;
  if (error?.statusCode) return error.statusCode;
  if (typeof error === 'string') {
    const statusMatch = error.match(/\b(4\d{2}|5\d{2})\b/);
    if (statusMatch) return parseInt(statusMatch[0]);
  }
  return null;
}
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;

.component-loader {
  width: 100%;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: rgba(var(--color-error-rgb), 0.05);
  border: 1px solid rgba(var(--color-error-rgb), 0.2);
  border-radius: $radius-lg;
  margin: 1rem 0;

  .error-icon {
    color: $error-color;
    margin-bottom: 1rem;
  }

  .error-content {
    max-width: 400px;
  }

  .error-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: $error-color;
    margin: 0 0 0.5rem 0;
  }

  .error-message {
    color: $error-dark;
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }
}

.empty-state {
  width: 100%;
}

.content-wrapper {
  width: 100%;
}
</style>
