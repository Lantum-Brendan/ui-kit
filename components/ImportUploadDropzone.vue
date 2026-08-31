<template>
  <div
    class="upload-dropzone drop-zone"
    :class="{ 'upload-dropzone--active': isDragging, 'drop-zone--active': isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="onBrowse"
  >
    <Upload class="upload-dropzone__icon drop-zone__icon" />
    <div class="upload-dropzone__text drop-zone__text">
      <p class="upload-dropzone__title drop-zone__title">{{ labels.dropzone }}</p>
      <p class="upload-dropzone__subtitle drop-zone__subtitle">{{ labels.supportedFormats }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    isDragging?: boolean;
    labels?: {
      dropzone?: string;
      supportedFormats?: string;
    };
  }>(),
  {
    isDragging: false,
    labels: () => ({
      dropzone: 'Drop your file here or click to browse',
      supportedFormats: 'Supports CSV, PDF, PNG, JPG, TIFF, BMP'
    })
  }
);

const emit = defineEmits<{
  'files-dropped': [file: File];
  browse: [];
  'drag-over': [];
  'drag-leave': [];
}>();

const onDragOver = () => {
  emit('drag-over');
};

const onDragLeave = () => {
  emit('drag-leave');
};

const onDrop = (event: DragEvent) => {
  emit('drag-leave');
  const file = event.dataTransfer?.files?.[0];
  if (file) emit('files-dropped', file);
};

const onBrowse = () => emit('browse');
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.upload-dropzone,
.drop-zone {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: 16px 18px;
  border: 1.5px dashed var(--surface-accent, var(--color-primary-lighter));
  border-radius: 12px;
  background: var(--glass-bg);
  cursor: pointer;
  transition:
    background-color $duration-fast $easing-standard,
    border-color $duration-fast $easing-standard;
  backdrop-filter: blur(6px);

  &:hover,
  &--active {
    border-color: var(--surface-deep, var(--color-primary-dark));
    background: var(--glass-bg-strong);
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: var(--surface-deep, var(--color-primary-dark));
    flex-shrink: 0;
  }

  &__text {
    min-width: 0;
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-semibold;
    color: var(--surface-ink, var(--color-text-primary));
    margin: 0;
  }

  &__subtitle {
    font-size: 11px;
    color: var(--surface-ink, var(--color-text-primary));
    opacity: 0.65;
    margin: 0;
  }
}
</style>
