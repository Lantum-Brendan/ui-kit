<template>
  <div ref="rootRef" class="t-avatar">
    <button class="t-avatar-button" :aria-label="accountMenuLabel" @click="toggle">
      <img :src="imageUrl" alt="User Avatar" class="avatar-image" />
      <div v-if="showName && userName" class="user-info">
        <span class="user-name-text">{{ userName }}</span>
      </div>
    </button>

    <Transition v-if="showDropdown" name="dropdown">
      <div v-if="isOpen" class="avatar-dropdown">
        <slot name="header" :user="user" :close="close">
          <div v-if="user" class="dropdown-header">
            <img :src="imageUrl" alt="User Avatar" class="header-avatar" />
            <div class="header-info">
              <p class="header-name">{{ user.first_name }} {{ user.last_name }}</p>
              <p class="header-email">{{ user.email }}</p>
            </div>
          </div>
        </slot>
        <TDivider v-if="user || $slots.header" orientation="horizontal" />
        <div class="menu-list">
          <slot name="menu" :user="user" :close="close">
            <template v-if="items && items.length">
              <TDropdownItem
                v-for="item in items"
                :key="item.id || item.label"
                class="avatar-menu-item"
                :class="{ 'avatar-menu-item--danger': item.danger }"
                @click="onCustomItemClick(item)"
              >
                <component :is="item.icon" v-if="item.icon" class="menu-icon" />
                <span>{{ item.label }}</span>
              </TDropdownItem>
            </template>
            <template v-else>
              <TDropdownItem class="avatar-menu-item" @click="onSettings">
                <Settings class="menu-icon" />
                <span>{{ settingsLabel }}</span>
              </TDropdownItem>
              <TDropdownItem v-if="user?.is_admin" class="avatar-menu-item" @click="onAdmin">
                <ShieldCheck class="menu-icon" />
                <span>{{ adminLabel }}</span>
              </TDropdownItem>
              <TDropdownItem class="avatar-menu-item avatar-menu-item--danger" @click="onLogout">
                <LogOut class="menu-icon" />
                <span>{{ logoutLabel }}</span>
              </TDropdownItem>
            </template>
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { Settings, LogOut, ShieldCheck } from 'lucide-vue-next';
import { useDropdown } from '../composables/useDropdown';
import TDropdownItem from './TDropdownItem.vue';
import TDivider from './TDivider.vue';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    default: null
  },
  userName: {
    type: String,
    default: ''
  },
  showName: {
    type: Boolean,
    default: false
  },
  showDropdown: {
    type: Boolean,
    default: true
  },
  accountMenuLabel: {
    type: String,
    default: 'Account menu'
  },
  settingsLabel: {
    type: String,
    default: 'Settings'
  },
  adminLabel: {
    type: String,
    default: 'Admin'
  },
  logoutLabel: {
    type: String,
    default: 'Logout'
  },
  items: {
    type: Array,
    default: null
  }
});

const emit = defineEmits(['settings', 'admin', 'logout', 'select']);

const { isOpen, rootRef, toggle, close } = useDropdown();

const onSettings = () => {
  close();
  emit('settings');
};

const onAdmin = () => {
  close();
  emit('admin');
};

const onLogout = () => {
  close();
  emit('logout');
};

const onCustomItemClick = (item) => {
  close();
  if (item.action) {
    item.action();
  }
  emit('select', item);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-avatar {
  position: relative;
  display: inline-block;
}

.t-avatar-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: transparent;
  border: none;
  border-radius: $radius-md;
  padding: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $bg-light;
  }

  .avatar-image {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid $border-medium;
    box-shadow: 0 0 0 2px $bg-white;
    background-color: $bg-white;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .user-name-text {
    color: $text-primary;
    font-weight: $font-semibold;
    font-size: 1rem;
  }
}

.avatar-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 260px;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
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
  gap: 0.75rem;
  padding: 1rem;

  .header-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .header-info {
    min-width: 0;
    flex: 1;
  }

  .header-name {
    margin: 0;
    font-size: $font-size-sm;
    font-weight: $font-semibold;
    color: $text-primary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-email {
    margin: 0;
    font-size: $font-size-xs;
    color: $text-muted;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.menu-list {
  padding: 0.25rem 0;
}

.avatar-menu-item {
  border-radius: 0;

  .menu-icon {
    width: 18px;
    height: 18px;
    color: $text-secondary;
  }

  &--danger {
    color: $error-color;

    .menu-icon {
      color: $error-color;
    }

    &:hover {
      background: rgba(var(--color-error-rgb), 0.08);
      color: $error-color;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
