import ChatEmptyState from '../components/ChatEmptyState.vue';

export default {
  title: 'Components/ChatEmptyState',
  component: ChatEmptyState,
  tags: ['autodocs'],
};

export const Default = { args: {} };
export const WithLabels = { args: { labels: { askAboutFinances: 'Ask anything', tryOneOfThese: 'Popular questions', suggestions: {} } } };
export const Minimal = { args: { labels: null } };
