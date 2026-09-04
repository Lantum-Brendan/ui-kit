import ExtensionSlot from './ExtensionSlot.vue';

export default {
  title: 'Primitives/ExtensionSlot',
  component: ExtensionSlot,
};

const sample = [
  {
    key: 'test',
    slot: 'settings.integrations',
    integration: { key: 'test', name: 'Test Integration', description: 'Example plugin', icon: null, configured: true, entitled: true, ui: { slots: ['settings.integrations'], card: { title: 'Test Card', description: 'Card description', cta: 'Open' } } },
    ui: { slots: ['settings.integrations'], card: { title: 'Test Card', description: 'Card description', cta: 'Open' } },
    order: 100,
    configured: true,
  },
];

export const WithContributions = { args: { contributions: sample } };
export const Empty = { args: { contributions: [] } };
