<template>
  <div class="message-section">
    <label class="field">
      <span class="field__label">{{ labels.subject }}</span>
      <input
        :value="subject"
        class="field__input"
        :placeholder="labels.subject"
        required
        @input="$emit('update:subject', $event.target.value)"
      />
    </label>

    <div class="field">
      <span class="field__label">{{ labels.message }}</span>
      <div class="md-toolbar">
        <button
          v-for="f in formats"
          :key="f.label"
          type="button"
          class="md-btn"
          :title="labels.formatLabels[f.key] || f.label"
          @click="f.action()"
        >
          <component :is="f.icon" class="md-btn__icon" />
        </button>
      </div>
      <textarea
        ref="bodyRef"
        :value="message"
        class="field__textarea"
        rows="8"
        :placeholder="labels.messagePlaceholder"
        required
        @input="$emit('update:message', $event.target.value)"
      />
    </div>

    <div class="tokens">
      <span class="tokens__hint">{{ labels.personalizeWith }}</span>
      <button
        v-for="token in tokens"
        :key="token"
        type="button"
        class="token"
        @click="insertToken(token)"
      >
        {{ token }}
      </button>
    </div>

    <div class="preview">
      <span class="preview__tag">{{ labels.livePreview }}</span>
      <div class="preview__frame">
        <iframe
          v-if="previewHtml"
          :srcdoc="previewHtml"
          class="preview__iframe"
          sandbox=""
          :title="labels.livePreview"
        />
        <p v-else class="preview__empty">{{ labels.startTypingPreview }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Heading2 as HeadingIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Link2 as LinkIcon
} from 'lucide-vue-next';

const props = defineProps({
  subject: { type: String, default: '' },
  message: { type: String, default: '' },
  previewHtml: { type: String, default: '' },
  labels: { type: Object, required: true }
});

const emit = defineEmits(['update:subject', 'update:message']);

const tokens = ['{{first_name}}', '{{last_name}}', '{{name}}', '{{email}}'];

const bodyRef = ref(null);

const insertToken = (token) => {
  const next = `${props.message}${props.message.endsWith(' ') || !props.message ? '' : ' '}${token} `;
  emit('update:message', next);
};

const surround = (before, after) => {
  const el = bodyRef.value;
  if (!el) {
    // fallback: wrap whole message
    emit('update:message', `${before}${props.message}${after}`);
    return;
  }
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = props.message.slice(start, end);
  const next = props.message.slice(0, start) + before + selected + after + props.message.slice(end);
  emit('update:message', next);
  nextTick(() => {
    el.focus();
    el.selectionStart = start + before.length;
    el.selectionEnd = end + before.length;
  });
};

const prefixLines = (prefix) => {
  const el = bodyRef.value;
  if (!el) {
    const replaced = props.message
      .split('\n')
      .map((line, i) => (prefix === '1. ' ? `${i + 1}. ${line}` : `${prefix}${line}`))
      .join('\n');
    emit('update:message', replaced);
    return;
  }
  const lineStart = props.message.lastIndexOf('\n', el.selectionStart - 1) + 1;
  const block = props.message.slice(lineStart, el.selectionEnd);
  const replaced = block
    .split('\n')
    .map((line, i) => (prefix === '1. ' ? `${i + 1}. ${line}` : `${prefix}${line}`))
    .join('\n');
  const next = props.message.slice(0, lineStart) + replaced + props.message.slice(el.selectionEnd);
  emit('update:message', next);
  nextTick(() => el.focus());
};

const formats = [
  { key: 'bold', label: 'Bold', icon: BoldIcon, action: () => surround('**', '**') },
  { key: 'italic', label: 'Italic', icon: ItalicIcon, action: () => surround('*', '*') },
  { key: 'heading', label: 'Heading', icon: HeadingIcon, action: () => prefixLines('## ') },
  { key: 'bulletList', label: 'Bullet list', icon: ListIcon, action: () => prefixLines('- ') },
  { key: 'numberedList', label: 'Numbered list', icon: ListOrderedIcon, action: () => prefixLines('1. ') },
  { key: 'link', label: 'Link', icon: LinkIcon, action: () => surround('[', '](https://)') }
];
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.message-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.field__label {
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  color: $text-secondary;
}

.field__input,
.field__textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  padding: 0.6rem 0.75rem;
  font-size: $font-size-sm;
  font-family: inherit;
  color: $text-primary;
  background: $bg-white;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.field__textarea {
  resize: vertical;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.md-toolbar {
  display: flex;
  gap: 0.15rem;
  padding: 0.3rem 0.4rem;
  border: 1px solid $border-color;
  border-bottom: none;
  border-radius: $radius-lg $radius-lg 0 0;
  background: $bg-light;
}

.md-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: $radius-md;
  background: transparent;
  color: $text-secondary;
  cursor: pointer;

  &:hover {
    background: $bg-white;
    color: $primary;
  }
}

.md-btn__icon {
  width: 15px;
  height: 15px;
}

.tokens {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tokens__hint {
  font-size: $font-size-xs;
  color: $text-muted;
}

.token {
  border: 1px solid $border-color;
  background: $bg-light;
  border-radius: $radius-md;
  padding: 0.2rem 0.5rem;
  font-size: $font-size-xs;
  font-family: monospace;
  color: $primary-dark;
  cursor: pointer;

  &:hover {
    border-color: $primary;
  }
}

.preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview__tag {
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: $text-muted;
}

.preview__frame {
  border: 1px solid $border-color;
  border-radius: $radius-xl;
  background: $bg-white;
  overflow: hidden;
  box-shadow: $elevation-1;
  min-height: 320px;
}

.preview__iframe {
  display: block;
  width: 100%;
  height: 520px;
  border: none;
}

.preview__empty {
  margin: 0;
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: $text-muted;
  font-size: $font-size-sm;
}
</style>
