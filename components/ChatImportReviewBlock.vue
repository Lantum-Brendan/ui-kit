<template>
  <div class="import-review">
    <div class="ir-head">
      <FileText :size="18" class="ir-icon" />
      <span class="ir-name">{{ block.file_name || labels.document }}</span>
    </div>
    <div class="ir-status" :class="`is-${tone}`">
      <Loader2 v-if="spin" :size="15" class="spin" />
      <component :is="icon" v-else :size="15" />
      {{ statusLabel }}
    </div>
    <button
      v-if="block.import_session_id && tone !== 'unavailable'"
      type="button"
      class="ir-link-btn"
      @click="$emit('review', block.import_session_id)"
    >
      {{ labels.reviewImport }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-vue-next';

const IN_PROGRESS = ['analyzing', 'extracting', 'enriching', 'checking'];

const props = defineProps({
  block: {
    type: Object,
    default: () => ({})
  },
  status: {
    type: String,
    default: 'analyzing'
  },
  labels: {
    type: Object,
    default: () => ({
      document: 'Document',
      reviewImport: 'Review import',
      analyzing: 'Analyzing document…',
      ready: 'Ready to review',
      confirmed: 'Imported',
      failed: 'Import failed',
      expired: 'Import expired',
      unavailable: 'Import unavailable'
    })
  }
});

defineEmits(['review']);

const spin = computed(() => IN_PROGRESS.includes(props.status));

const tone = computed(() => {
  if (IN_PROGRESS.includes(props.status)) return 'analyzing';
  if (props.status === 'ready') return 'ready';
  if (props.status === 'confirmed') return 'confirmed';
  if (props.status === 'failed') return 'failed';
  if (props.status === 'expired') return 'expired';
  return 'unavailable';
});

const icon = computed(() =>
  tone.value === 'failed' || tone.value === 'unavailable' ? AlertCircle : CheckCircle
);

const statusLabel = computed(() => props.labels[tone.value] || props.labels.unavailable);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.import-review {
  border: 1px solid $primary-muted;
  border-radius: $radius-lg;
  padding: $spacing-3;
  background: $bg-white;
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.ir-head {
  display: flex;
  align-items: center;
  gap: $spacing-2;

  .ir-icon {
    color: $primary;
  }

  .ir-name {
    font-weight: $font-semibold;
    font-size: $font-size-sm;
  }
}

.ir-status {
  display: inline-flex;
  align-items: center;
  gap: $spacing-1;
  font-size: $font-size-sm;
  color: $text-muted;

  &.is-failed,
  &.is-unavailable {
    color: $error-color;
  }

  .spin {
    animation: spin 1s linear infinite;
  }
}

.ir-link-btn {
  color: $primary;
  font-weight: $font-semibold;
  font-size: $font-size-sm;
  text-decoration: underline;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
