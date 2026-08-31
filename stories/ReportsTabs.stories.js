import { ref } from 'vue';
import { Home, Settings, Bell } from 'lucide-vue-next';
import ReportsTabs from '../components/ReportsTabs.vue';

export default {
  title: 'Reports/ReportsTabs',
  component: ReportsTabs,
  argTypes: {
    modelValue: { control: 'text' }
  }
};

const tabs = [
  { value: 'overview', label: 'Overview', icon: Home },
  { value: 'activity', label: 'Activity', icon: Bell, count: 3 },
  { value: 'settings', label: 'Settings', icon: Settings }
];

export const Basic = {
  render: () => ({
    components: { ReportsTabs },
    setup() {
      const active = ref('overview');
      return { active, tabs };
    },
    template: `
      <ReportsTabs
        :tabs="tabs"
        :model-value="active"
        @update:model-value="active = $event"
      />
    `
  })
};
