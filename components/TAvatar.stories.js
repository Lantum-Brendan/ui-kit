import TAvatar from './TAvatar.vue';

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
export const WithoutDropdown = { args: { imageUrl: 'https://i.pravatar.cc/100?img=2', showDropdown: false } };
