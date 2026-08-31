import SettingsAccount from '../components/SettingsAccount.vue';

export default {
  title: 'Components/SettingsAccount',
  component: SettingsAccount,
  tags: ['autodocs'],
};

const user = {
  first_name: 'Alex',
  last_name: 'Johnson',
  username: 'alexj',
  email: 'alex@example.com',
};

export const DisplayMode = {
  args: {
    isEditMode: false,
    user,
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },
};

export const EditMode = {
  args: {
    isEditMode: true,
    user,
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },
};

export const WithoutAvatar = {
  args: {
    isEditMode: false,
    user,
    avatarUrl: '',
  },
};
