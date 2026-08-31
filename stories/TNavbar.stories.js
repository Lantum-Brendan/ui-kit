import TNavbar from '../components/TNavbar.vue';

export default {
  title: 'Components/TNavbar',
  component: TNavbar,
  tags: ['autodocs'],
};

export const Default = { args: { isMobile: false, isSidebarOpen: false } };
export const MobileClosed = { args: { isMobile: true, isSidebarOpen: false } };
export const MobileOpen = { args: { isMobile: true, isSidebarOpen: true } };

