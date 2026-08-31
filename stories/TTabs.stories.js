import { ref } from 'vue';
import { Home, Settings } from 'lucide-vue-next';
import TTabs from '../components/TTabs.vue';

export default {
  title: 'Primitives/TTabs',
  component: TTabs,
};

export const Basic = {
  render: () => ({
    components: { TTabs },
    setup() {
      const active = ref('overview');
      const tabs = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
      return { active, tabs };
    },
    template: `
      <div style="width:480px">
        <TTabs :tabs="tabs" :active-tab="active" @update:active-tab="active = $event">
          <template #overview>Overview panel</template>
          <template #settings>Settings panel</template>
        </TTabs>
      </div>`,
  }),
};
