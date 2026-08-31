import TDropdown from '../components/TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';
import TButton from './TButton.vue';

export default {
  title: 'Primitives/TDropdown',
  component: TDropdown,
};

export const Basic = {
  render: () => ({
    components: { TDropdown, TDropdownItem, TButton },
    template: `
      <div style="height:200px">
        <TDropdown>
          <template #trigger>
            <TButton :full-width="false" text="Open menu" />
          </template>
          <TDropdownItem>Profile</TDropdownItem>
          <TDropdownItem>Settings</TDropdownItem>
          <TDropdownItem>Sign out</TDropdownItem>
        </TDropdown>
      </div>`,
  }),
};
