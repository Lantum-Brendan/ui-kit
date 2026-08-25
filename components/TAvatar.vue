<template>
  <div ref="rootRef" class="t-avatar">
    <button class="t-avatar-button" :aria-label="labels.accountMenu" @click="isOpen = !isOpen">
      <img :src="imageUrl" alt="User Avatar" class="avatar-image" />
      <div v-if="showName && userName" class="user-info">
        <span class="user-name-text">{{ userName }}</span>
      </div>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen && showDropdown" class="avatar-dropdown">
        <div v-if="user" class="dropdown-header">
          <img :src="imageUrl" alt="User Avatar" class="header-avatar" />
          <div class="header-info">
            <p class="header-name">{{ user.first_name }} {{ user.last_name }}</p>
            <p class="header-email">{{ user.email }}</p>
          </div>
        </div>
        <div class="menu-list">
          <button class="menu-item" @click="handleAction('settings')">
            <Settings class="menu-icon" />
            <span>{{ labels.settings }}</span>
          </button>
          <button v-if="user?.is_admin" class="menu-item" @click="handleAction('admin')">
            <ShieldCheck class="menu-icon" />
            <span>{{ labels.admin }}</span>
          </button>
          <button class="menu-item menu-item--danger" @click="handleAction('logout')">
            <LogOut class="menu-icon" />
            <span>{{ labels.logout }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Settings, LogOut, ShieldCheck } from 'lucide-vue-next';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
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
  user: {
    type: Object,
    default: null
  },
  labels: {
    type: Object,
    default: () => ({
      accountMenu: 'Account menu',
      settings: 'Settings',
      admin: 'Admin',
      logout: 'Logout'
    })
  }
});

const emit = defineEmits(['settings', 'admin', 'logout']);

const rootRef = ref(null);
const isOpen = ref(false);

const handleAction = (action) => {
  isOpen.value = false;
  emit(action);
};

const handleClickOutside = (event) => {
  if (rootRef.value && !rootRef.value.contains(event.target)) {
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
  border-bottom: 1px solid $border-color;

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

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: $font-size-sm;
  color: $text-primary;
  text-align: left;
  transition: background-color 0.2s;

  &:hover {
    background: $bg-gray;
  }

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
