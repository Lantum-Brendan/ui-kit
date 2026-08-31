import ExtensionSlot from './ExtensionSlot.vue';

export default {
  title: 'Components/ExtensionSlot',
  component: ExtensionSlot,
  tags: ['autodocs'],
};

const makeContribution = (key, name, slot) => ({
  key,
  slot,
  integration: { key, name, description: name + ' integration', icon: 'Puzzle', configured: false },
  ui: {
    slots: [slot],
    card: { title: name, description: 'Description for ' + name, cta: 'Open', href: '/ext/' + key },
    onboarding: null,
    component: null,
    show_when_unconfigured: true,
  },
  configured: false,
});

export const SingleCard = {
  args: {
    contributions: [makeContribution('bank-sync', 'Bank Sync', 'dashboard.widgets')],
  },
};

export const MultipleCards = {
  args: {
    contributions: [
      makeContribution('bank-sync', 'Bank Sync', 'dashboard.widgets'),
      makeContribution('notion', 'Notion Export', 'dashboard.widgets'),
      makeContribution('slack', 'Slack Alerts', 'dashboard.widgets'),
    ],
  },
};

export const Empty = {
  args: {
    contributions: [],
  },
};
