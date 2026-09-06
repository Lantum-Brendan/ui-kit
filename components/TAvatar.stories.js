import TAvatar from './TAvatar.vue';
import { User, Bell, LifeBuoy } from 'lucide-vue-next';

export default {
  title: 'Primitives/TAvatar',
  component: TAvatar,
  argTypes: {
    imageUrl: { control: 'text' },
    userName: { control: 'text' },
    showName: { control: 'boolean' },
    showDropdown: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    imageUrl: 'https://i.pravatar.cc/100?img=1',
    user: { first_name: 'John', last_name: 'Doe', email: 'john@example.com', is_admin: true },
    userName: 'John Doe',
    showName: true,
  },
};

export const CustomItems = {
  args: {
    imageUrl: 'https://i.pravatar.cc/100?img=3',
    user: { first_name: 'Alice', last_name: 'Smith', email: 'alice@plugin.org' },
    userName: 'Alice Smith',
    showName: true,
    items: [
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'notifications', label: 'Notification Preferences', icon: Bell },
      { id: 'support', label: 'Get Support', icon: LifeBuoy },
      { id: 'exit', label: 'Switch Tenant', danger: true }
    ]
  }
};

export const WithoutDropdown = {
  args: {
    imageUrl: 'https://i.pravatar.cc/100?img=2',
    showDropdown: false
  }
};
