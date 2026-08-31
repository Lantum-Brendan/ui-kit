<template>
  <div class="transaction-files">
    <div v-if="existingAttachments.length" class="attachment-grid">
      <div v-for="file in existingAttachments" :key="`existing-${file.id}`" class="attachment-card" :class="{ removing: removingFileIds.has(file.id) }">
        <div v-if="isImageAttachment(file)" class="thumb">
          <img v-if="existingPreviews[file.id]" :src="existingPreviews[file.id]" :alt="labels.attachment" />
          <div v-else class="thumb-placeholder">…</div>
        </div>
        <div v-else class="thumb thumb-doc"><span>{{ extensionLabel(file.path) }}</span></div>
        <button type="button" class="remove" :disabled="removingFileIds.has(file.id)" :title="labels.remove" @click="$emit('remove-existing-attachment', file)">×</button>
      </div>
    </div>
    <div class="upload-box">
      <input :id="inputId" type="file" multiple @change="(e) => $emit('files-selected', e)" />
      <label :for="inputId" class="upload-button">{{ labels.browseFiles }}</label>
      <span class="hint">{{ labels.fileHint }}</span>
    </div>
    <div v-if="newAttachments.length" class="attachment-grid">
      <div v-for="(att, i) in newAttachments" :key="`new-${att.name}-${i}`" class="attachment-card">
        <div v-if="att.isImage && att.previewUrl" class="thumb"><img :src="att.previewUrl" :alt="att.name" /></div>
        <div v-else class="thumb thumb-doc"><span>{{ extensionLabel(att.name) }}</span></div>
        <span class="filename">{{ att.name }}</span>
        <button type="button" class="remove" :title="labels.remove" @click="$emit('remove-new-attachment', i)">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  existingAttachments: { type: Array, default: () => [] },
  existingPreviews: { type: Object, default: () => ({}) },
  removingFileIds: { type: Set, default: () => new Set() },
  newAttachments: { type: Array, default: () => [] },
  inputId: { type: String, default: 'file-input' },
  labels: { type: Object, required: true }
});
const emit = defineEmits(['remove-existing-attachment', 'remove-new-attachment', 'files-selected']);

const isImageAttachment = (file) => {
  if (!file.path && !file.name) return false;
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.path || file.name || '');
};
const extensionLabel = (path) => {
  if (!path) return '?';
  const parts = String(path).split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
};
const onFilesSelected = (e) => {
  const files = Array.from(e.target.files || []);
  e.target.value = '';
  // parent handles remaining logic via emit
  const remaining = 5 - props.newAttachments.length - props.existingAttachments.length;
  const selected = files.slice(0, remaining).map((file) => {
    const isImage = file.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(file) : null;
    return { file, name: file.name, size: file.size, isImage, previewUrl };
  });
  // emit for parent to handle? We'll emit files-selected with selected array
  // For simplicity, parent will handle via prop mutation – we emit event
  // But to keep logic in parent, we just emit raw event
  // This component is presentational; parent handles via @files-selected
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.transaction-files{display:flex;flex-direction:column;gap:$spacing-2}
.attachment-grid{display:flex;flex-wrap:wrap;gap:$spacing-2}
.attachment-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;width:80px;&.removing{opacity:0.5}}
.thumb{width:64px;height:64px;border-radius:$radius-md;overflow:hidden;border:1px solid $border-color;display:flex;align-items:center;justify-content:center;background:$bg-light;img{width:100%;height:100%;object-fit:cover}&-doc span{font-size:$font-size-xs;font-weight:$font-bold;color:$text-muted}}
.thumb-placeholder{color:$text-muted;font-size:$font-size-lg}
.filename{font-size:10px;color:$text-muted;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.remove{position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;border:1px solid $border-color;background:$bg-white;color:$text-secondary;font-size:14px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;&:hover{background:rgba(var(--color-error-rgb),0.1);color:$error-color;border-color:$error-color}}
.upload-box{display:flex;align-items:center;gap:$spacing-3;#file-input{display:none}}
.upload-button{padding:6px 12px;border:1px solid $border-color;border-radius:$radius-md;cursor:pointer;font-size:$font-size-sm;color:$text-secondary;background:$bg-white;&:hover{border-color:$primary;color:$primary}}
.hint{font-size:$font-size-xs;color:$text-muted}
</style>
