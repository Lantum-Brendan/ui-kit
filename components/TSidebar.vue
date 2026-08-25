<template>
  <div v-if="isMobile && isSidebarOpen" class="sidebar-overlay" @click="$emit('close-sidebar')" />

  <div
    class="sidebar"
    :class="{
      'sidebar--compact': isCompact,
      'sidebar--mobile-open': isMobile && isSidebarOpen,
      'sidebar--mobile-closed': isMobile && !isSidebarOpen
    }"
  >
    <div class="sidebar-header">
      <button class="sidebar-brand-btn" :aria-label="labels.home" @click="$emit('navigate', '/dashboard')">
        <slot name="logo">
          <Logo size="small" alt="Trakli Logo" />
        </slot>
      </button>

      <button
        v-if="isMobile && isSidebarOpen"
        class="close-button"
        aria-label="Close navigation menu"
        @click="$emit('close-sidebar')"
      >
        <XMarkIcon class="close-icon" />
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in primary" :key="item.to">
          <button
            type="button"
            class="nav-button"
            :class="{
              'nav-button--with-subtext': !isCompact && item.hint,
              'nav-button--compact': isCompact,
              selected: currentPath === item.to || currentPath.startsWith(item.to + '/')
            }"
            :title="isCompact ? `${labels[item.labelKey] || item.label}: ${labels[item.hintKey] || item.hint || ''}` : undefined"
            @click="handleNavClick(item.to)"
          >
            <component :is="item.icon" class="icon" />
            <div v-if="!isCompact && item.hint" class="nav-copy">
              <span class="text">{{ labels[item.labelKey] || item.label }}</span>
              <span class="subtext">{{ labels[item.hintKey] || item.hint }}</span>
            </div>
            <span v-else-if="!isCompact" class="text">{{ labels[item.labelKey] || item.label }}</span>
            <span v-else class="compact-label">{{ labels[item.labelKey] || item.label }}</span>
          </button>

          <ul
            v-if="!isCompact && item.subItems && (currentPath === item.to || currentPath.startsWith(item.to + '/'))"
            class="sub-list"
          >
            <li v-for="sub in item.subItems" :key="sub.label">
              <button
                type="button"
                class="sub-link"
                :class="{ selected: isSubActive(item.to, sub) }"
                @click="handleNavClick(sub.to || item.to)"
              >
                <span class="dot" :class="`dot--${sub.tone}`" />
                <span>{{ labels[sub.labelKey] || sub.label }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>

      <div v-if="!isCompact" class="sidebar-ext">
        <slot name="extension-nav" />
      </div>
    </nav>

    <hr v-if="!isCompact" class="divider" />

    <div class="nav-footer">
      <ul>
        <li v-for="item in footer" :key="item.to">
          <button
            type="button"
            class="nav-footer-button"
            :class="{
              selected: currentPath === item.to,
              'nav-footer-button--compact': isCompact
            }"
            :title="isCompact ? (labels[item.labelKey] || item.label) : undefined"
            @click="handleNavClick(item.to)"
          >
            <component :is="item.icon" class="icon" />
            <span v-if="!isCompact" class="text">{{ labels[item.labelKey] || item.label }}</span>
            <span v-else class="compact-label">{{ labels[item.labelKey] || item.label }}</span>
          </button>
        </li>
      </ul>
    </div>

    <button
      v-if="!isMobile"
      type="button"
      class="collapse-toggle"
      :class="{ 'collapse-toggle--compact': isCompact }"
      :aria-label="isCompact ? labels.expandSidebar : labels.collapseSidebar"
      @click="$emit('toggle-collapse')"
    >
      <ChevronDoubleLeftIcon v-if="!isCompact" class="icon" />
      <ChevronDoubleRightIcon v-else class="icon" />
      <span v-if="!isCompact" class="text">{{ labels.collapseSidebar }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  ArrowUpTrayIcon,
  BellIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  Cog8ToothIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  TagIcon,
  UserGroupIcon,
  UsersIcon,
  WalletIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import { Sparkles, Scale, Coins } from 'lucide-vue-next';
import Logo from './Logo.vue';

const props = defineProps({
  currentPath: { type: String, default: '/dashboard' },
  isSidebarOpen: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      home: 'Home',
      collapseSidebar: 'Collapse sidebar',
      expandSidebar: 'Expand sidebar',
      dashboard: 'Dashboard',
      dashboardHint: 'Overview of your finances',
      assistant: 'Assistant',
      assistantHint: 'Chat and ask about your finances',
      discussions: 'Discussions',
      transactions: 'Transactions',
      transactionsHint: 'All money movements in one place',
      wallets: 'Wallets',
      walletsHint: 'Accounts money moves through',
      financialPosition: 'Financial position',
      financialPositionHint: 'Net worth, grouped by intent',
      holdings: 'Holdings',
      holdingsHint: 'Assets you own: crypto, stocks, property',
      reports: 'Reports',
      reportsHint: 'Charts and insights',
      budgets: 'Budgets',
      budgetsHint: 'Set spending limits and track progress',
      allBudgets: 'All Budgets',
      active: 'Active',
      archived: 'Archived',
      categories: 'Categories',
      categoriesHint: 'Organize transactions by type',
      parties: 'Parties',
      partiesHint: 'People and organizations you transact with',
      groups: 'Groups',
      groupsHint: 'Bundle related transactions',
      reminders: 'Reminders',
      imports: 'Import',
      settings: 'Settings'
    })
  }
});

const emit = defineEmits(['navigate', 'close-sidebar', 'toggle-collapse']);

const isCompact = computed(() => props.collapsed && !props.isMobile);

const primary = [
  { to: '/dashboard', label: 'Dashboard', labelKey: 'dashboard', hint: 'Overview of your finances', hintKey: 'dashboardHint', icon: Squares2X2Icon },
  { to: '/home', label: 'Assistant', labelKey: 'assistant', hint: 'Chat and ask about your finances', hintKey: 'assistantHint', icon: Sparkles, subItems: [{ label: 'Discussions', labelKey: 'discussions', to: '/assistant', tone: 'info' }] },
  { to: '/transactions', label: 'Transactions', labelKey: 'transactions', hint: 'All money movements in one place', hintKey: 'transactionsHint', icon: RectangleGroupIcon },
  { to: '/wallets', label: 'Wallets', labelKey: 'wallets', hint: 'Accounts money moves through', hintKey: 'walletsHint', icon: WalletIcon },
  { to: '/financial-position', label: 'Financial position', labelKey: 'financialPosition', hint: 'Net worth, grouped by intent', hintKey: 'financialPositionHint', icon: Scale },
  { to: '/holdings', label: 'Holdings', labelKey: 'holdings', hint: 'Assets you own: crypto, stocks, property', hintKey: 'holdingsHint', icon: Coins },
  { to: '/reports', label: 'Reports', labelKey: 'reports', hint: 'Charts and insights', hintKey: 'reportsHint', icon: ChartBarIcon },
  { to: '/budgets', label: 'Budgets', labelKey: 'budgets', hint: 'Set spending limits and track progress', hintKey: 'budgetsHint', icon: ChartPieIcon, subItems: [{ label: 'All Budgets', labelKey: 'allBudgets', tone: 'neutral' }, { query: { scope: 'active' }, label: 'Active', labelKey: 'active', tone: 'success' }, { query: { scope: 'archived' }, label: 'Archived', labelKey: 'archived', tone: 'muted' }] },
  { to: '/categories', label: 'Categories', labelKey: 'categories', hint: 'Organize transactions by type', hintKey: 'categoriesHint', icon: TagIcon },
  { to: '/parties', label: 'Parties', labelKey: 'parties', hint: 'People and organizations you transact with', hintKey: 'partiesHint', icon: UsersIcon },
  { to: '/groups', label: 'Groups', labelKey: 'groups', hint: 'Bundle related transactions', hintKey: 'groupsHint', icon: UserGroupIcon }
];

const footer = [
  { to: '/reminders', label: 'Reminders', labelKey: 'reminders', icon: BellIcon },
  { to: '/imports', label: 'Import', labelKey: 'imports', icon: ArrowUpTrayIcon },
  { to: '/settings', label: 'Settings', labelKey: 'settings', icon: Cog8ToothIcon }
];

const isSubActive = (parentTo, sub) => {
  if (sub.to) return props.currentPath === sub.to;
  return props.currentPath === parentTo;
};

const handleNavClick = (to) => {
  emit('navigate', to);
  if (props.isMobile) emit('close-sidebar');
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.sidebar {
  width: $sidebar-width;
  height: 100vh;
  background-color: $bg-gray;
  border-right: 1px solid $border-color;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  box-sizing: border-box;
  transition: width 0.25s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: $z-index-fixed;

  &--compact {
    width: $sidebar-rail-width;
  }

  @media (min-width: $breakpoint-md) {
    transform: translateX(0);
  }

  @media (max-width: calc($breakpoint-md - 1px)) {
    width: $sidebar-mobile-width;
    transform: translateX(-100%);
    z-index: $z-index-modal;

    &--mobile-open {
      transform: translateX(0);
    }

    &--mobile-closed {
      transform: translateX(-100%);
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 16px;
    width: calc(100% - 32px);
    padding: 0;
    flex-shrink: 0;
  }

  &--compact .sidebar-header {
    margin: 16px 0;
    justify-content: center;
    width: 100%;
  }

  .sidebar-brand-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;

    &__mark {
      width: 38px;
      height: 46px;
      display: block;
    }

    :deep(img.logo-small) {
      width: 115px !important;
    }
  }

  &-nav {
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 8px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    li {
      width: 100%;
    }
  }

  .nav-button {
    display: flex;
    align-items: center;
    width: calc(100% - 20px);
    min-height: 44px;
    border-radius: $radius-xl;
    padding: 8px 10px;
    gap: 12px;
    background-color: transparent;
    border: none;
    color: $text-secondary;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px;
    position: relative;
    text-decoration: none;

    &:hover:not(.selected) {
      background-color: rgba(var(--color-primary-rgb), 0.15);
    }

    &.selected {
      background-color: $primary-light;

      .subtext {
        color: $text-secondary;
      }
    }
  }

  .nav-button--with-subtext {
    align-items: flex-start;
  }

  .nav-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .text {
    font-size: $font-size-sm;
    line-height: 1.2;
    color: inherit;
  }

  .subtext {
    font-size: $font-size-xs;
    line-height: 1.35;
    color: $text-muted;
  }

  .icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &--compact .nav-button,
  &--compact .nav-footer-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    padding: 8px 4px;
    margin-left: 6px;
    margin-right: 6px;
    width: calc(100% - 12px);
    min-height: 56px;

    .icon {
      width: 22px;
      height: 22px;
      margin-top: 0;
    }

    .compact-label {
      font-size: 10px;
      line-height: 1.1;
      font-weight: $font-medium;
      text-align: center;
      color: inherit;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: $radius-lg;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(var(--color-primary-rgb), 0.15);
    }

    &:focus {
      outline: none;
      background-color: rgba(var(--color-primary-rgb), 0.15);
    }
  }

  .close-icon {
    width: 20px;
    height: 20px;
    color: $text-primary;
  }

  .divider {
    display: flex;
    justify-items: center;
    border: 1px solid $border-light;
    width: calc(#{$sidebar-width} - 20px);
    margin-left: 10px;
    margin-top: 8px;
    margin-bottom: 0;
    flex-shrink: 0;

    @media (max-width: calc($breakpoint-md - 1px)) {
      width: calc(#{$sidebar-mobile-width} - 20px);
    }
  }

  .nav-footer {
    display: flex;
    width: 100%;
    padding: 8px 0;
    gap: 8px;
    flex-direction: column;
    flex-shrink: 0;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }

  .nav-footer-button {
    display: flex;
    align-items: center;
    width: calc(100% - 20px);
    min-height: 44px;
    border-radius: $radius-xl;
    padding: 8px 10px;
    gap: 12px;
    background-color: transparent;
    border: none;
    color: $text-secondary;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px;
    margin-top: 2px;

    &:hover:not(.selected) {
      background-color: rgba(var(--color-primary-rgb), 0.15);
    }

    &.selected {
      background-color: $primary-light;
    }
  }

  .sub-list {
    list-style: none;
    margin: 4px 10px 8px 46px;
    padding: 0 0 0 10px;
    border-left: 2px solid $border-color;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sub-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    color: $text-secondary;
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background-color 0.15s ease;

    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex-shrink: 0;

      &--success {
        background: var(--color-success);
      }
      &--error {
        background: var(--color-error);
      }
      &--info {
        background: var(--color-info);
      }
      &--muted {
        background: $text-muted;
        opacity: 0.4;
      }
      &--neutral {
        background: $primary-muted;
      }
    }

    &:hover:not(.selected) {
      background-color: rgba(var(--color-primary-rgb), 0.08);
      color: $primary;
    }

    &.selected {
      background-color: $bg-white;
      color: $primary;
      font-weight: $font-semibold;
      box-shadow: var(--shadow-sm);
    }
  }
}

.sidebar .collapse-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: calc(100% - 20px);
  margin: 2px 10px 10px;
  padding: 8px 14px;
  background: transparent;
  border: 1px solid $border-color;
  border-radius: $radius-xl;
  color: $text-muted;
  cursor: pointer;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  transition: all 0.15s ease;
  flex-shrink: 0;

  .icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.08);
    color: $primary;
    border-color: $primary-muted;
  }

  &--compact {
    justify-content: center;
    width: calc(100% - 12px);
    margin: 4px 6px 10px;
    padding: 10px 4px;

    .icon {
      width: 18px;
      height: 18px;
    }
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: $z-index-modal-backdrop;
  backdrop-filter: blur(2px);
}
</style>
