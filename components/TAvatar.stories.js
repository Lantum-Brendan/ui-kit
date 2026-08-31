import TAvatar from './TAvatar.vue';

export default {
  title: 'Components/TAvatar',
  component: TAvatar,
  tags: ['autodocs'],
};

const user = {
  first_name: 'Alice',
  last_name: 'Johnson',
  email: 'alice@example.com',
  is_admin: false,
};

const adminUser = {
  first_name: 'Bob',
  last_name: 'Admin',
  email: 'bob@example.com',
  is_admin: true,
};

export const Default = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=32',
    userName: 'Alice Johnson',
    showName: false,
    showDropdown: true,
    user,
  },
};

export const WithName = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=32',
    userName: 'Alice Johnson',
    showName: true,
    showDropdown: true,
    user,
  },
};

export const AdminUser = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    userName: 'Bob Admin',
    showName: true,
    showDropdown: true,
    user: adminUser,
  },
};

export const NoDropdown = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=12',
    userName: 'Alice',
    showName: false,
    showDropdown: false,
    user,
  },
};
