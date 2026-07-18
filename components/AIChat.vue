<template>
  <div class="ai-chat">
    <ChatSidebar
      :sessions="sessions"
      :current-session-id="currentSession?.id ?? null"
      :is-loading="isLoadingSessions"
      @new-chat="handleNew"
      @open-session="handleOpen"
      @delete-session="handleDelete"
    />

    <section class="chat-pane">
      <header class="chat-header">
        <Bot :size="18" class="chat-header-icon" />
        <h2 class="chat-title">
          {{ currentSession?.title || labels.aiInsights }}
        </h2>
      </header>

      <div ref="chatWindow" class="chat-window">
        <ChatMessageList
          v-if="currentSession?.messages?.length"
          :messages="currentSession.messages"
        />
        <ChatEmptyState v-else @pick="handleSuggestion" />
      </div>

      <ChatComposer ref="composerEl" v-model="input" :disabled="isSending" @submit="handleSubmit" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { Bot } from 'lucide-vue-next';
import ChatSidebar from './ChatSidebar.vue';
import ChatMessageList from './ChatMessageList.vue';
import ChatEmptyState from './ChatEmptyState.vue';
import ChatComposer from './ChatComposer.vue';

const props = defineProps({
  labels: {
    type: Object,
    default: () => ({
      aiInsights: 'AI Insights'
    })
  },
  sessions: {
    type: Array,
    default: () => []
  },
  currentSession: {
    type: Object,
    default: null
  },
  isLoadingSessions: {
    type: Boolean,
    default: false
  },
  isSending: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['open-session', 'new-session', 'send', 'delete-session']);

const input = ref('');
const chatWindow = ref<HTMLElement | null>(null);
const composerEl = ref<InstanceType<typeof ChatComposer> | null>(null);

watch(
  () => props.currentSession?.messages?.length,
  () => scrollToBottom()
);
watch(
  () => props.currentSession?.messages?.map((m) => m.status).join(','),
  () => scrollToBottom()
);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
  });
};

const handleSubmit = async () => {
  const message = input.value.trim();
  if (!message) return;
  input.value = '';
  emit('send', message);
  scrollToBottom();
};

const handleSuggestion = async (prompt: string) => {
  input.value = prompt;
  await handleSubmit();
};

const handleOpen = async (id: number) => {
  emit('open-session', id);
  scrollToBottom();
};

const handleNew = () => {
  emit('new-session');
  input.value = '';
  composerEl.value?.focus();
};

const handleDelete = async (id: number) => {
  emit('delete-session', id);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.ai-chat {
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  display: grid;
  grid-template-columns: 260px 1fr;
  height: calc(100vh - 120px);
  min-height: 560px;
  overflow: hidden;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    height: calc(100vh - 100px);
  }
}

.chat-pane {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-3 $spacing-4;
  border-bottom: 1px solid $border-light;
}

.chat-header-icon {
  color: $primary;
}

.chat-title {
  margin: 0;
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-window {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: $spacing-4;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
}
</style>
