<template>
  <div class="composer">
    <form class="composer__form" @submit.prevent="onSend">
      <label class="field">
        <span class="field__label">{{ labels.subject }}</span>
        <input v-model="form.subject" class="field__input" :placeholder="labels.subject" required />
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
          v-model="form.body"
          class="field__textarea"
          rows="8"
          :placeholder="labels.messagePlaceholder"
          required
        />
      </div>

      <div class="field">
        <span class="field__label">{{ labels.headerImage }}</span>
        <div v-if="form.image_url" class="media">
          <img :src="form.image_url" class="media__thumb" alt="" />
          <button type="button" class="media__remove" @click="form.image_url = ''">
            {{ labels.remove }}
          </button>
        </div>
        <label v-else class="upload">
          <ImageIcon class="upload__icon" />
          <span>{{ imageUploading ? labels.uploading : labels.addCampaignImage }}</span>
          <input type="file" accept="image/*" class="upload__input" @change="onImage" />
        </label>
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

      <div class="cta-row">
        <label class="field">
          <span class="field__label">{{ labels.buttonLabel }}</span>
          <input
            v-model="form.cta_label"
            class="field__input"
            :placeholder="labels.buttonLabelPlaceholder"
          />
        </label>
        <label class="field">
          <span class="field__label">{{ labels.buttonLink }}</span>
          <input v-model="form.cta_url" class="field__input" placeholder="https://" />
        </label>
      </div>

      <label class="field">
        <span class="field__label">{{ labels.audience }}</span>
        <select v-model="form.audience" class="field__input">
          <option v-for="opt in audiences" :key="opt.value" :value="opt.value">
            {{ labels.audienceOptions[opt.value] || opt.label }}
          </option>
        </select>
      </label>

      <div v-if="form.audience === 'specific'" class="field">
        <span class="field__label">{{ labels.chooseRecipients }}</span>
        <input v-model="userQuery" class="field__input" :placeholder="labels.searchUsers" />
        <div class="recipients">
          <label v-for="u in filteredUsers" :key="u.id" class="recipient">
            <input v-model="form.user_ids" type="checkbox" :value="u.id" />
            <span class="recipient__text"
              >{{ u.first_name }} {{ u.last_name }} · {{ u.email }}</span
            >
          </label>
          <p v-if="!filteredUsers.length" class="recipients__empty">{{ labels.noMatches }}</p>
        </div>
      </div>

      <div class="field">
        <span class="field__label">{{ labels.attachments }}</span>
        <label class="upload upload--slim">
          <PaperclipIcon class="upload__icon" />
          <span>{{ labels.attachFiles }}</span>
          <input type="file" multiple class="upload__input" @change="onFiles" />
        </label>
        <ul v-if="form.files.length" class="attach-list">
          <li v-for="(file, i) in form.files" :key="i" class="attach-item">
            <span class="attach-item__name">{{ file.name }}</span>
            <button type="button" class="attach-item__remove" @click="removeFile(i)">×</button>
          </li>
        </ul>
      </div>

      <div v-if="confirming" class="confirm">
        <p class="confirm__text">{{ confirmText }}</p>
        <div class="confirm__actions">
          <TButton
            :text="labels.cancel"
            variant="outline"
            size="small"
            :full-width="false"
            @click="confirming = false"
          />
          <TButton
            :text="labels.sendNow"
            size="small"
            :full-width="false"
            :loading="sending"
            @click="send"
          />
        </div>
      </div>
      <div v-else class="composer__actions">
        <TButton
          type="submit"
          :text="form.audience === 'test' ? labels.sendTestToMe : labels.send"
          :full-width="false"
          :loading="sending"
        />
      </div>
    </form>

    <aside class="preview">
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
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue';
import {
  Image as ImageIcon,
  Paperclip as PaperclipIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Heading2 as HeadingIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Link2 as LinkIcon
} from 'lucide-vue-next';
import TButton from './TButton.vue';

const props = defineProps({
  users: { type: Array, default: () => [] },
  previewHtml: { type: String, default: '' },
  sending: { type: Boolean, default: false },
  imageUploading: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      subject: 'Subject',
      message: 'Message',
      messagePlaceholder: 'Write your message. Markdown is supported.',
      headerImage: 'Header image',
      remove: 'Remove',
      uploading: 'Uploading...',
      addCampaignImage: 'Add a campaign image',
      personalizeWith: 'Personalize with:',
      buttonLabel: 'Button label',
      buttonLabelPlaceholder: 'e.g. Open Trakli',
      buttonLink: 'Button link',
      audience: 'Audience',
      chooseRecipients: 'Choose recipients',
      searchUsers: 'Search users',
      noMatches: 'No matches',
      attachments: 'Attachments',
      attachFiles: 'Attach files',
      cancel: 'Cancel',
      sendNow: 'Send now',
      sendTestToMe: 'Send test to me',
      send: 'Send',
      livePreview: 'Live preview',
      startTypingPreview: 'Start typing to preview the email.',
      confirmTextTemplate: 'This will email {audience}. Personalized per recipient.',
      formatLabels: {
        bold: 'Bold',
        italic: 'Italic',
        heading: 'Heading',
        bulletList: 'Bullet list',
        numberedList: 'Numbered list',
        link: 'Link'
      },
      audienceOptions: {
        all: 'All users',
        active: 'Active users',
        inactive: 'Inactive users',
        specific: 'Specific users',
        test: 'Send test to me'
      }
    })
  }
});

const emit = defineEmits(['send', 'upload-image', 'preview-change']);

const tokens = ['{{first_name}}', '{{last_name}}', '{{name}}', '{{email}}'];

const form = reactive({
  subject: '',
  body: '',
  cta_label: '',
  cta_url: '',
  image_url: '',
  audience: 'all',
  user_ids: [],
  files: []
});

const audiences = [
  { value: 'all', label: 'All users' },
  { value: 'active', label: 'Active users' },
  { value: 'inactive', label: 'Inactive users' },
  { value: 'specific', label: 'Specific users' },
  { value: 'test', label: 'Send test to me' }
];

const confirming = ref(false);
const userQuery = ref('');

const filteredUsers = computed(() => {
  const q = userQuery.value.trim().toLowerCase();
  const list = props.users;
  if (!q) return list.slice(0, 50);
  return list
    .filter((u) => `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(q))
    .slice(0, 50);
});

const onImage = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  emit('upload-image', file, (url) => {
    form.image_url = url;
  });
};

const onFiles = (event) => {
  const picked = Array.from(event.target.files ?? []);
  form.files = [...form.files, ...picked];
};

const removeFile = (index) => {
  form.files.splice(index, 1);
};

watch(
  () => [form.subject, form.body, form.cta_label, form.cta_url, form.image_url],
  () => {
    emit('preview-change', {
      subject: form.subject,
      body: form.body,
      cta_label: form.cta_label,
      cta_url: form.cta_url,
      image_url: form.image_url
    });
  }
);

const confirmText = computed(() => {
  const label = props.labels.audienceOptions[form.audience] || form.audience;
  return props.labels.confirmTextTemplate.replace('{audience}', label);
});

const insertToken = (token) => {
  form.body = `${form.body}${form.body.endsWith(' ') || !form.body ? '' : ' '}${token} `;
};

const bodyRef = ref(null);

const surround = (before, after) => {
  const el = bodyRef.value;
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = form.body.slice(start, end);
  form.body = form.body.slice(0, start) + before + selected + after + form.body.slice(end);
  nextTick(() => {
    el.focus();
    el.selectionStart = start + before.length;
    el.selectionEnd = end + before.length;
  });
};

const prefixLines = (prefix) => {
  const el = bodyRef.value;
  if (!el) return;
  const lineStart = form.body.lastIndexOf('\n', el.selectionStart - 1) + 1;
  const block = form.body.slice(lineStart, el.selectionEnd);
  const replaced = block
    .split('\n')
    .map((line, i) => (prefix === '1. ' ? `${i + 1}. ${line}` : `${prefix}${line}`))
    .join('\n');
  form.body = form.body.slice(0, lineStart) + replaced + form.body.slice(el.selectionEnd);
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

const onSend = () => {
  if (form.audience === 'test') {
    send();
  } else {
    confirming.value = true;
  }
};

const send = () => {
  emit('send', { ...form });
  confirming.value = false;
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.composer {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.composer__form {
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

.cta-row {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 0.75rem;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.composer__actions {
  display: flex;
}

.confirm {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  background: $warning-bg;
  border-radius: $radius-lg;
}

.confirm__text {
  margin: 0;
  font-size: $font-size-sm;
  color: $warning-text;
}

.confirm__actions {
  display: flex;
  gap: 0.5rem;
}

.preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: sticky;
  top: 1rem;
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

.upload {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  border: 1px dashed $border-color;
  border-radius: $radius-lg;
  color: $text-secondary;
  font-size: $font-size-sm;
  cursor: pointer;

  &:hover {
    border-color: $primary;
    color: $primary;
  }

  &--slim {
    padding: 0.6rem 0.85rem;
  }
}

.upload__icon {
  width: 17px;
  height: 17px;
}

.upload__input {
  display: none;
}

.media {
  position: relative;
  border-radius: $radius-lg;
  overflow: hidden;
  border: 1px solid $border-color;
}

.media__thumb {
  display: block;
  width: 100%;
  max-height: 180px;
  object-fit: cover;
}

.media__remove {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  border-radius: $radius-md;
  padding: 0.3rem 0.6rem;
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
}

.recipients {
  margin-top: 0.4rem;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  padding: 0.4rem;
}

.recipient {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.4rem;
  font-size: $font-size-sm;
  color: $text-primary;
  cursor: pointer;
  border-radius: $radius-md;

  &:hover {
    background: $bg-light;
  }
}

.recipient__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipients__empty {
  margin: 0;
  padding: 0.6rem;
  color: $text-muted;
  font-size: $font-size-sm;
}

.attach-list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.attach-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  background: $bg-light;
  border-radius: $radius-md;
  font-size: $font-size-sm;
}

.attach-item__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attach-item__remove {
  border: none;
  background: transparent;
  color: $text-muted;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: $error-color;
  }
}
</style>
