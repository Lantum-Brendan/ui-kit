import TSidebar from './TSidebar.vue';

export default {
  title: 'Components/TSidebar',
  component: TSidebar,
  tags: ['autodocs'],
};

export const Default = { args: { currentPath: '/dashboard', isMobile: false, collapsed: false, isSidebarOpen: false } };
export const Collapsed = { args: { currentPath: '/transactions', isMobile: false, collapsed: true } };
export const MobileOpen = { args: { currentPath: '/wallets', isMobile: true, isSidebarOpen: true } };

