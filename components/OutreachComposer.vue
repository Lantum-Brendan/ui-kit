<template>
  <div class="composer">
    <form class="composer__form" @submit.prevent="onSend">
      <OutreachComposerMessage
        :subject="form.subject"
        :message="form.body"
        :preview-html="previewHtml"
        :labels="labels"
        @update:subject="form.subject = $event"
        @update:message="form.body = $event"
      />

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

      <OutreachComposerAudience
        :audiences="audiences"
        :selected-audience="form.audience"
        :users="users"
        :selected-user-ids="form.user_ids"
        :labels="labels"
        @update:selectedAudience="form.audience = $event"
        @update:selectedUserIds="form.user_ids = $event"
      />

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
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { Image as ImageIcon, Paperclip as PaperclipIcon } from 'lucide-vue-next';
import TButton from './TButton.vue';
import OutreachComposerAudience from './OutreachComposerAudience.vue';
import OutreachComposerMessage from './OutreachComposerMessage.vue';

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
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
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

.field__input {
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
