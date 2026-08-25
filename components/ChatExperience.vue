<template>
  <div
    class="chat-experience"
    :class="{
      'is-fullscreen': isFullscreen,
      'mode-full': mode === 'full',
      'mode-landing': mode === 'landing'
    }"
  >
    <!-- History sidebar (full mode) -->
    <ChatSidebar
      v-if="mode === 'full' && !sidebarCollapsed"
      class="experience-sidebar"
      :sessions="sessions"
      :current-session-id="currentSessionId"
      :is-loading="isLoadingSessions"
      @new-chat="$emit('new-chat')"
      @open-session="$emit('open-session', $event)"
      @delete-session="$emit('delete-session', $event)"
    />

    <section class="chat-main">
      <!-- Hero: empty state -->
      <div v-if="!hasConversation" class="hero">
        <div class="hero-mark"><Bot :size="30" /></div>
        <h1 class="hero-title">{{ labels.heroTitle }}</h1>
        <p class="hero-subtitle">{{ labels.heroSubtitle }}</p>
        <div class="hero-composer">
          <slot name="composer">
            <ChatComposer
              v-model="inputValue"
              :disabled="isSending"
              @submit="handleSubmit"
              @attach="$emit('attach', $event)"
            />
          </slot>
        </div>
        <slot name="landing-insights" />
        <div class="hero-suggestions">
          <button
            v-for="s in suggestions"
            :key="s.text"
            type="button"
            class="suggestion"
            @click="handleSuggestion(s.text)"
          >
            <component
              :is="iconFor(s.icon)"
              v-if="iconFor(s.icon)"
              class="suggestion-icon"
              :size="15"
            />
            <span>{{ s.text }}</span>
          </button>
        </div>
      </div>

      <!-- Work area -->
      <div v-else class="work" :class="{ 'with-canvas': !!openCanvas }">
        <section class="conversation">
          <div class="chat-ambient" aria-hidden="true">
            <Wallet class="amb a1" :size="150" :stroke-width="1" />
            <PieChart class="amb a2" :size="120" :stroke-width="1" />
            <Coins class="amb a3" :size="104" :stroke-width="1" />
            <Receipt class="amb a4" :size="132" :stroke-width="1" />
            <PiggyBank class="amb a5" :size="116" :stroke-width="1" />
            <TrendingUp class="amb a6" :size="110" :stroke-width="1" />
          </div>

          <header class="chat-header">
            <div class="header-left">
              <button
                v-if="mode === 'full'"
                type="button"
                class="header-icon-btn"
                :title="labels.toggleHistory"
                @click="sidebarCollapsed = !sidebarCollapsed"
              >
                <component :is="sidebarCollapsed ? PanelLeft : PanelLeftClose" :size="16" />
              </button>

              <slot name="discussion-dropdown">
                <h2 class="chat-title">{{ currentTitle || labels.assistant }}</h2>
              </slot>
            </div>

            <div class="header-actions">
              <button
                type="button"
                class="header-icon-btn"
                :title="labels.newChat"
                @click="$emit('new-chat')"
              >
                <Plus :size="16" />
              </button>
              <button
                type="button"
                class="header-icon-btn"
                :title="isFullscreen ? labels.exitFullscreen : labels.fullscreen"
                @click="isFullscreen = !isFullscreen"
              >
                <component :is="isFullscreen ? Minimize2 : Maximize2" :size="16" />
              </button>
            </div>
          </header>

          <div ref="chatWindow" class="chat-window">
            <slot name="messages">
              <ChatEmptyState v-if="!messages.length" @pick="handleSuggestion" />
            </slot>
          </div>

          <div class="composer-dock">
            <slot name="composer-dock">
              <ChatComposer
                v-model="inputValue"
                :disabled="isSending"
                @submit="handleSubmit"
                @attach="$emit('attach', $event)"
              />
            </slot>
          </div>
        </section>

        <CanvasPanel
          v-if="openCanvas"
          class="work-canvas"
          :canvas="openCanvas"
          :session-id="currentSessionId"
          :message-id="canvasMessageId"
          :labels="labels.canvas"
          @close="$emit('close-canvas')"
          @print="$emit('print-canvas')"
          @download="$emit('download-canvas')"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  Bot, Plus, Maximize2, Minimize2, PanelLeft, PanelLeftClose,
  Wallet, PieChart, Coins, Receipt, PiggyBank, TrendingUp
} from 'lucide-vue-next';
import * as lucideIcons from 'lucide-vue-next';
import ChatSidebar from './ChatSidebar.vue';
import ChatComposer from './ChatComposer.vue';
import ChatEmptyState from './ChatEmptyState.vue';
import CanvasPanel from './CanvasPanel.vue';

const props = defineProps({
  mode: { type: String, default: 'landing' }, // 'landing' | 'full'
  // Session / conversation data
  sessions: { type: Array, default: () => [] },
  currentSessionId: { type: [Number, String], default: null },
  currentTitle: { type: String, default: '' },
  messages: { type: Array, default: () => [] },
  isLoadingSessions: { type: Boolean, default: false },
  isSending: { type: Boolean, default: false },
  // Composer
  modelValue: { type: String, default: '' },
  // Canvas
  openCanvas: { type: Object, default: null },
  canvasMessageId: { type: [Number, String], default: null },
  // Landing suggestions
  suggestions: { type: Array, default: () => [] },
  // Labels
  labels: {
    type: Object,
    default: () => ({
      heroTitle: 'What can I help with?',
      heroSubtitle: 'Ask about your money, log a transaction, or import a statement.',
      toggleHistory: 'Toggle history',
      newChat: 'New chat',
      assistant: 'Assistant',
      fullscreen: 'Full screen',
      exitFullscreen: 'Exit full screen',
      canvas: {}
    })
  }
});

const emit = defineEmits([
  'update:modelValue',
  'submit', 'attach',
  'new-chat', 'open-session', 'delete-session',
  'open-canvas', 'close-canvas', 'print-canvas', 'download-canvas',
  'suggestion'
]);

const sidebarCollapsed = ref(false);
const isFullscreen = ref(false);
const chatWindow = ref(null);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const hasConversation = computed(() => props.messages.length > 0);

const lucideMap = lucideIcons;
const iconFor = (name) => (name && lucideMap[name]) ? lucideMap[name] : null;

const handleSuggestion = (text) => {
  emit('update:modelValue', text);
  emit('suggestion', text);
};

const handleSubmit = () => emit('submit');
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.chat-experience {
  width: 100%;
  display: flex;
  min-width: 0;
}

.mode-full {
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  height: calc(100vh - 110px);
  min-height: 560px;
  overflow: hidden;

  .experience-sidebar {
    flex: 0 0 260px;
  }

  @media (max-width: $breakpoint-md) {
    .experience-sidebar {
      display: none;
    }
  }
}

.mode-landing {
  height: 100%;
  min-height: 0;
  border-radius: inherit;
  overflow: hidden;
}

.chat-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: $bg-white;
  border-radius: 0;
  height: 100vh;
  padding: $spacing-2 $spacing-4;
}

.chat-main:has(.hero) {
  background:
    radial-gradient(62% 56% at 50% 44%, $bg-white, transparent 72%),
    radial-gradient(46% 42% at 3% 2%, rgba(var(--color-primary-rgb), 0.24), transparent 56%),
    radial-gradient(44% 40% at 98% 2%, rgba(var(--color-info-rgb), 0.22), transparent 56%),
    radial-gradient(44% 40% at 98% 99%, rgba(var(--color-warning-rgb), 0.22), transparent 56%),
    radial-gradient(46% 42% at 2% 99%, rgba(var(--color-error-rgb), 0.18), transparent 56%),
    $bg-light;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: $spacing-3;
  padding: $spacing-5 $spacing-4 $spacing-4;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
}

.hero-mark {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-light;
  color: $primary;
}

.hero-title {
  font-size: $font-size-2xl;
  font-weight: $font-bold;
  color: $text-primary;
  margin: 0;
}

.hero-subtitle {
  color: $text-muted;
  margin: 0;
}

.hero-composer,
.composer-dock {
  border: 1px solid $border-light;
  border-radius: 16px;
  overflow: hidden;
  background: $bg-white;
  box-shadow: $elevation-2;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1), $elevation-2;
  }

  :deep(.composer-shell) {
    border-top: none;
    background: transparent;
  }

  :deep(.chat-input) {
    border: none;
    background: transparent;
    min-height: 46px;

    &:focus {
      background: transparent;
      box-shadow: none;
    }
  }
}

.hero-composer {
  width: 100%;
  margin-top: $spacing-2;
}

.hero-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-2;
  justify-content: center;
}

.suggestion {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid $border-light;
  background: $bg-white;
  color: $text-secondary;
  border-radius: 9999px;
  padding: $spacing-2 $spacing-3;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: $transition-base;

  .suggestion-icon {
    color: $primary;
    flex-shrink: 0;
  }

  &:hover {
    background: $primary-light;
    color: $primary;
    border-color: $primary-muted;
    transform: translateY(-1px);
  }
}

.work {
  flex: 1;
  display: flex;
  gap: $spacing-4;
  min-height: 0;
}

.conversation {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  background:
    radial-gradient(120% 60% at 50% 0%, rgba(var(--color-primary-rgb), 0.04), transparent 60%),
    $bg-light;

  > .chat-header,
  > .chat-window,
  > .composer-dock {
    position: relative;
    z-index: 1;
  }
}

.chat-ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  .amb {
    position: absolute;
    color: $primary;
    opacity: 0.05;
  }
  .a1 { top: 8%; left: 4%; transform: rotate(-12deg); }
  .a2 { top: 22%; right: 6%; color: $info; transform: rotate(10deg); }
  .a3 { top: 52%; left: 8%; color: $warning; transform: rotate(8deg); }
  .a4 { bottom: 16%; right: 9%; transform: rotate(-8deg); }
  .a5 { bottom: 6%; left: 14%; color: $warning; transform: rotate(6deg); }
  .a6 { top: 40%; left: 46%; color: $info; transform: rotate(-6deg); }
}

.work.with-canvas {
  .conversation {
    max-width: none;
    margin: 0;
    flex: 1 1 60%;
  }

  .work-canvas {
    flex: 1 1 40%;
    min-width: 0;
  }
}

@media (max-width: 960px) {
  .work.with-canvas {
    flex-direction: column;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-2;
  min-height: 52px;
  padding: 0 $spacing-4;
  border-bottom: 1px solid $border-light;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  min-width: 0;
}

.chat-title {
  margin: 0;
  font-size: $font-size-base;
  font-weight: $font-medium;
  color: $text-secondary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-1;
  flex-shrink: 0;
}

.header-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: $text-muted;
  cursor: pointer;
  transition: $transition-base;

  &:hover {
    background: $primary-light;
    color: $primary;
  }
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-4 max(#{$spacing-3}, calc((100% - 768px) / 2));
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  min-height: 0;
}

.composer-dock {
  width: min(768px, calc(100% - #{$spacing-3} * 2));
  margin: 0 auto $spacing-3;
}
</style>
