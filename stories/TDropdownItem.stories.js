import TDropdownItem from '../components/TDropdownItem.vue';

export default {
  title: 'Components/TDropdownItem',
  component: TDropdownItem,
  tags: ['autodocs'],
};

export const Default = {
  render: () => ({
    components: { TDropdownItem },
    template: `<div style="width:200px;border:1px solid #e5e7eb;border-radius:8px;padding:8px"><TDropdownItem>Edit</TDropdownItem><TDropdownItem>Duplicate</TDropdownItem><TDropdownItem>Delete</TDropdownItem></div>`,
  }),
};
export const Single = {
  render: () => ({
    components: { TDropdownItem },
    template: `<div style="width:200px"><TDropdownItem>Single action</TDropdownItem></div>`,
  }),
};
export const WithIcons = {
  render: () => ({
    components: { TDropdownItem },
    template: `<div style="width:200px"><TDropdownItem>✏️ Edit</TDropdownItem><TDropdownItem>🗑️ Delete</TDropdownItem></div>`,
  }),
};

