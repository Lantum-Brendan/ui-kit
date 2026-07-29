<template>
  <TDropdown class="discussion-dropdown">
    <template #trigger>
      <button type="button" class="dd-trigger">
        <MessageSquare :size="16" class="dd-icon" />
        <span class="dd-title">{{ currentTitle }}</span>
        <ChevronDown :size="14" />
      </button>
    </template>

    <TDropdownItem @click="$emit('new')"> <Plus :size="14" /> {{ labels.newChat }} </TDropdownItem>

    <div v-if="sessions.length" class="dd-divider" />

    <TDropdownItem v-for="s in sessions" :key="s.id" @click="$emit('open', s.id)">
      <span class="dd-item-label" :class="{ active: s.id === currentId }">
        {{ s.title || labels.newChat }}
      </span>
    </TDropdownItem>

    <div v-if="!sessions.length" class="dd-empty">{{ labels.noConversations }}</div>
  </TDropdown>
</template>

<script setup lang="ts">
import { MessageSquare, ChevronDown, Plus } from 'lucide-vue-next';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';

interface ChatSession {
  id: number;
  title: string | null;
  created_at: string;
  updated_at: string;
}

withDefaults(
  defineProps<{
    sessions: ChatSession[];
    currentId: number | null;
    currentTitle: string;
    labels?: {
      newChat?: string;
      noConversations?: string;
    };
  }>(),
  {
    labels: () => ({
      newChat: 'New chat',
      noConversations: 'No conversations yet'
    })
  }
);

defineEmits<{ (e: 'open', id: number): void; (e: 'new'): void }>();
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.dd-trigger {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  max-width: 320px;
  padding: $spacing-1 $spacing-2;
  border: 1px solid transparent;
  border-radius: $radius-md;
  background: transparent;
  cursor: pointer;
  color: $text-primary;
  font-weight: $font-semibold;
  font-size: $font-size-base;

  &:hover {
    background: $bg-gray;
  }

  .dd-icon {
    color: $primary;
    flex-shrink: 0;
  }

  .dd-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.dd-divider {
  height: 1px;
  background: $border-light;
  margin: $spacing-1 0;
}

.dd-item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.active {
    color: $primary;
    font-weight: $font-semibold;
  }
}

.dd-empty {
  padding: $spacing-2 $spacing-3;
  color: $text-muted;
  font-size: $font-size-sm;
}
</style>
