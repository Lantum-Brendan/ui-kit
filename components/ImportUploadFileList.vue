<template>
  <div v-if="filesArray.length" class="file-list">
    <div
      v-for="(file, index) in filesArray"
      :key="`${file.name}-${index}`"
      class="file-item selected-file"
    >
      <FileText class="file-item__icon selected-file__icon" />
      <div class="file-item__meta selected-file__meta">
        <span class="file-item__name selected-file__name">{{ file.name }}</span>
        <span class="file-item__size selected-file__size">{{ formatFileSize(file.size) }}</span>
      </div>
      <button class="file-item__remove selected-file__remove" :aria-label="labels.remove" @click="onRemove(index)">
        <X class="file-item__remove-icon selected-file__remove-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FileText, X } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{
    files?: File[] | File | null;
    labels?: {
      remove?: string;
    };
  }>(),
  {
    files: () => [],
    labels: () => ({
      remove: 'Remove'
    })
  }
);

const emit = defineEmits<{
  remove: [index: number];
}>();

const filesArray = computed(() => {
  if (!props.files) return [] as File[];
  return Array.isArray(props.files) ? props.files : [props.files];
});

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const removeFile = (index: number) => {
  emit('remove', index);
};

const onRemove = (index: number) => removeFile(index);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.file-item,
.selected-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  border-radius: 999px;
  backdrop-filter: blur(6px);

  &__icon {
    width: 16px;
    height: 16px;
    color: var(--surface-deep, var(--color-primary-dark));
    flex-shrink: 0;
  }

  &__meta {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: $font-size-sm;
    font-weight: $font-medium;
    color: var(--surface-ink, var(--color-text-primary));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__size {
    font-size: 10px;
    color: var(--surface-ink, var(--color-text-primary));
    opacity: 0.6;
    line-height: 1;
  }

  &__remove {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    display: inline-flex;
    transition: background-color $duration-fast $easing-standard;

    &:hover {
      background-color: rgba(var(--color-expense-rgb), 0.12);
    }
  }

  &__remove-icon {
    width: 14px;
    height: 14px;
    color: var(--surface-deep, var(--color-primary-dark));
  }
}
</style>
