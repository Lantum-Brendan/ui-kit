<template>
  <div class="mcp-settings">
    <p class="section-intro">
      {{ labels.intro }}
    </p>

    <div class="form-group form-group--full">
      <label class="form-label">{{ labels.mcpEndpoint }}</label>
      <div class="copy-row">
        <input class="form-input" :value="endpoint" readonly />
        <button
          type="button"
          class="icon-btn"
          :title="labels.copy"
          @click="copy(endpoint, 'endpoint')"
        >
          <Check v-if="copied === 'endpoint'" class="inline-icon" />
          <Copy v-else class="inline-icon" />
        </button>
      </div>
      <p class="hint">
        {{ labels.endpointHint }}
      </p>
    </div>

    <div class="tokens-section">
      <h3 class="tokens-title">{{ labels.accessTokens }}</h3>

      <div class="create-row">
        <input
          v-model="newName"
          class="form-input"
          :placeholder="labels.tokenNamePlaceholder"
          @keyup.enter="generate"
        />
        <TButton variant="primary" :loading="creating" @click="generate">
          {{ labels.generateToken }}
        </TButton>
      </div>

      <ul v-if="tokens.length" class="token-list">
        <li v-for="tk in tokens" :key="tk.id" class="token-item">
          <div class="token-info">
            <span class="token-name">{{ tk.name }}</span>
            <span class="token-meta">
              {{
                tk.last_used_at
                  ? labels.lastUsed + ' ' + formatDate(tk.last_used_at)
                  : labels.neverUsed
              }}
            </span>
          </div>
          <button type="button" class="icon-btn danger" :title="labels.revoke" @click="$emit('revoke', tk)">
            <Trash2 class="inline-icon" />
          </button>
        </li>
      </ul>
      <p v-else-if="!loading" class="empty">{{ labels.noTokensYet }}</p>
    </div>

    <div v-if="createdToken" class="modal-backdrop">
      <div class="modal">
        <h3 class="modal-title">{{ labels.copyTokenNow }}</h3>
        <p class="modal-subtitle">
          {{ labels.tokenShownOnce }}
        </p>
        <div class="copy-row">
          <input class="form-input token-reveal" :value="createdToken.token" readonly />
          <button
            type="button"
            class="icon-btn"
            :title="labels.copy"
            @click="copy(createdToken.token, 'token')"
          >
            <Check v-if="copied === 'token'" class="inline-icon" />
            <Copy v-else class="inline-icon" />
          </button>
        </div>
        <div class="modal-actions">
          <button type="button" class="submit-btn" @click="$emit('close-created-modal')">
            {{ labels.done }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Copy, Check, Trash2 } from 'lucide-vue-next';
import TButton from './TButton.vue';

const props = defineProps({
  endpoint: { type: String, default: '' },
  tokens: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  creating: { type: Boolean, default: false },
  createdToken: { type: Object, default: null },
  labels: {
    type: Object,
    default: () => ({
      intro: 'Connect an AI client like Claude Desktop or Cursor to your Trakli data over the Model Context Protocol.',
      mcpEndpoint: 'MCP endpoint',
      copy: 'Copy',
      endpointHint: 'Add this URL to your AI client and authenticate with one of the tokens below.',
      accessTokens: 'Access tokens',
      tokenNamePlaceholder: 'Token name, e.g. Claude Desktop',
      generateToken: 'Generate token',
      lastUsed: 'Last used',
      neverUsed: 'Never used',
      revoke: 'Revoke',
      noTokensYet: 'No tokens yet.',
      copyTokenNow: 'Copy your token now',
      tokenShownOnce: 'This token is shown only once. Store it somewhere safe before closing.',
      done: 'Done'
    })
  }
});

const emit = defineEmits(['generate-token', 'revoke', 'close-created-modal']);

const newName = ref('');
const copied = ref('');

const generate = () => {
  const name = newName.value.trim();
  if (!name || props.creating) return;
  emit('generate-token', name);
  newName.value = '';
};

const copy = async (text, which) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = which;
    setTimeout(() => (copied.value = ''), 1500);
  } catch {
    // Clipboard fallback
  }
};

const formatDate = (iso) => new Date(iso).toLocaleDateString();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.section-intro {
  color: $text-muted;
  font-size: $font-size-sm;
  margin-bottom: 1rem;
}

.copy-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.icon-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: $radius-lg;
  border: 1px solid $border-light;
  color: $text-primary;
  transition: $transition-base;

  &:hover {
    background: $bg-gray;
  }

  &.danger:hover {
    color: $error-color;
  }
}

.inline-icon {
  width: 18px;
  height: 18px;
}

.hint {
  margin-top: 0.5rem;
  color: $text-muted;
  font-size: $font-size-sm;
}

.tokens-section {
  margin-top: 1.5rem;
}

.tokens-title {
  font-size: $font-size-lg;
  font-weight: $font-semibold;
  margin-bottom: 0.75rem;
}

.create-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.token-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.token-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: $radius-lg;
  background: $bg-gray;
}

.token-info {
  display: flex;
  flex-direction: column;
}

.token-name {
  font-weight: $font-medium;
  color: $text-primary;
}

.token-meta {
  font-size: $font-size-sm;
  color: $text-muted;
}

.empty {
  color: $text-muted;
  font-size: $font-size-sm;
}

.token-reveal {
  font-family: monospace;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: $z-index-modal;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal {
  background: $bg-white;
  width: min(520px, calc(100% - 2rem));
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  padding: 1.5rem;
}

.modal-title {
  font-size: $font-size-2xl;
  font-weight: $font-bold;
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  color: $text-muted;
  font-size: $font-size-sm;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.submit-btn {
  padding: 0.5rem 1.25rem;
  border-radius: $radius-lg;
  background: $primary;
  color: $bg-white;
  font-weight: $font-semibold;
  transition: $transition-base;

  &:hover {
    opacity: 0.92;
  }
}
</style>
