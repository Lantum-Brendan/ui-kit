import DashboardAgentHero from './DashboardAgentHero.vue';

export default {
  title: 'Components/DashboardAgentHero',
  component: DashboardAgentHero,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: '',
  },
};

export const WithName = {
  args: {
    name: 'Alex',
  },
};

export const WithCustomLabels = {
  args: {
    name: 'Sam',
    labels: {
      dismiss: 'Close hero',
      greeting: 'Welcome back, {name}!',
      defaultName: 'friend',
      subtitle: 'What shall we do today?',
      placeholder: 'Ask anything...',
      send: 'Send',
      logTransaction: 'Log spend',
      transferMoney: 'Move money',
      buildReport: 'New report',
      importDocument: 'Upload doc',
    },
  },
};
