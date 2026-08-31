<template>
  <div ref="bellRef" class="notification-bell">
    <button
      class="icon-button bell-button"
      :aria-label="labels.notifications"
      :title="labels.notifications"
      @click="toggleDropdown"
    >
      <Bell class="bell-icon" />
      <span v-if="unreadCount > 0" class="badge">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="notification-dropdown">
        <div class="dropdown-header">
          <h3>{{ labels.notifications }}</h3>
          <button v-if="notifications.length > 0" class="mark-all-btn" @click="$emit('mark-all-read')">
            {{ labels.markAllRead }}
          </button>
        </div>

        <div v-if="loading" class="dropdown-loading">
          <p>{{ labels.loading }}</p>
        </div>

        <div v-else-if="notifications.length === 0" class="dropdown-empty">
          <BellOff class="empty-icon" />
          <p>{{ labels.noNotifications }}</p>
        </div>

        <div v-else class="notification-list">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class="{ unread: !notification.read_at }"
            @click="$emit('click-notification', notification)"
          >
            <div class="notification-icon">
              <component :is="getNotificationIcon(notification.type)" />
            </div>
            <div class="notification-content">
              <p class="notification-title">{{ notification.title }}</p>
              <p class="notification-body">{{ truncateText(notification.body, 60) }}</p>
              <p class="notification-time">{{ formatTime(notification.created_at) }}</p>
            </div>
            <button
              v-if="!notification.read_at"
              class="mark-read-btn"
              :title="labels.markAsRead"
              @click.stop="$emit('mark-read', notification.id)"
            >
              <Check class="check-icon" />
            </button>
          </div>
        </div>

        <div class="dropdown-footer">
          <button type="button" class="view-all-link-btn" @click="handleViewAll">
            {{ labels.viewAllNotifications }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Bell, BellOff, Check, Clock, TrendingUp, AlertCircle, Award } from 'lucide-vue-next';
import { fill } from '../utils/fill';

const props = defineProps({
  notifications: { type: Array, default: () => [] },
  unreadCount: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      notifications: 'Notifications',
      markAllRead: 'Mark all read',
      loading: 'Loading...',
      noNotifications: 'No notifications yet',
      markAsRead: 'Mark as read',
      viewAllNotifications: 'View all notifications',
      justNow: 'Just now',
      minAgo: '{n} min ago',
      hAgo: '{n}h ago',
      dAgo: '{n}d ago'
    })
  }
});

const emit = defineEmits([
  'toggle',
  'mark-all-read',
  'mark-read',
  'click-notification',
  'view-all'
]);

const bellRef = ref(null);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  emit('toggle', isOpen.value);
};

const handleViewAll = () => {
  isOpen.value = false;
  emit('view-all');
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'reminder':
      return Clock;
    case 'system':
      return TrendingUp;
    case 'alert':
      return AlertCircle;
    case 'achievement':
      return Award;
    default:
      return Bell;
  }
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};



const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return props.labels.justNow;
  if (diffMins < 60) return fill(props.labels.minAgo, { n: diffMins });
  if (diffHours < 24) return fill(props.labels.hAgo, { n: diffHours });
  if (diffDays < 7) return fill(props.labels.dAgo, { n: diffDays });
  return date.toLocaleDateString();
};

const handleClickOutside = (event) => {
  if (bellRef.value && !bellRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.notification-bell {
  position: relative;
}

.bell-button {
  position: relative;
}

.bell-icon {
  width: 16px;
  height: 16px;
  color: currentColor;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 10px;
  font-weight: $font-bold;
  color: white;
  background: $primary;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 360px;
  max-height: 480px;
  background: $bg-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  border: 1px solid $border-color;
  overflow: hidden;
  z-index: $z-index-dropdown;

  @media (max-width: $breakpoint-sm) {
    width: calc(100vw - 32px);
    right: -8px;
  }
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid $border-color;

  h3 {
    font-size: $font-size-base;
    font-weight: $font-semibold;
    margin: 0;
  }
}

.mark-all-btn {
  font-size: $font-size-sm;
  color: $primary;
  font-weight: $font-medium;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.dropdown-loading,
.dropdown-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: $text-secondary;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.notification-list {
  max-height: 320px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: $bg-gray;
  }

  &.unread {
    background: rgba(var(--color-primary-rgb), 0.05);

    &:hover {
      background: rgba(var(--color-primary-rgb), 0.1);
    }
  }
}

.notification-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-gray;
  border-radius: 50%;

  svg {
    width: 18px;
    height: 18px;
    color: $primary;
  }
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0 0 2px 0;
}

.notification-body {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.notification-time {
  font-size: 11px;
  color: $text-muted;
  margin: 0;
}

.mark-read-btn {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid $border-color;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: $primary;
    border-color: $primary;

    .check-icon {
      color: white;
    }
  }
}

.check-icon {
  width: 14px;
  height: 14px;
  color: $text-secondary;
}

.dropdown-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid $border-color;
  text-align: center;
}

.view-all-link-btn {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $primary;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
