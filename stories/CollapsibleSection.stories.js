import CollapsibleSection from '../components/CollapsibleSection.vue';
import { Settings } from 'lucide-vue-next';

export default {
  title: 'Components/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'General settings', icon: Settings, defaultOpen: true } };
export const Collapsed = { args: { title: 'Notifications', icon: Settings, defaultOpen: false } };
export const WithContent = {
  args: { title: 'Account', icon: Settings, defaultOpen: true },
  render: (args) => ({
    components: { CollapsibleSection },
    setup() { return { args }; },
    template: '<CollapsibleSection v-bind="args"><template #default="{ isEditMode }"><p>{{ isEditMode ? "Edit mode" : "View mode" }}</p></template></CollapsibleSection>',
  }),
};
