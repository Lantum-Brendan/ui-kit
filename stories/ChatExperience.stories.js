import ChatExperience from '../components/ChatExperience.vue';

export default {
  title: 'Components/ChatExperience',
  component: ChatExperience,
  tags: ['autodocs'],
};

const sessions = [
  { id: 1, title: 'Budget review - May' },
  { id: 2, title: 'Import Bank Statement' },
];

const suggestions = [
  { text: 'What did I spend on groceries?', icon: 'ShoppingBag' },
  { text: 'Show my net worth', icon: 'Wallet' },
];

const messages = [
  { id: 1, role: 'user', text: 'What is my balance?' },
  { id: 2, role: 'assistant', text: 'Your balance is $4,200.' },
];

export const LandingEmpty = {
  args: {
    mode: 'landing',
    sessions: [],
    messages: [],
    suggestions,
    modelValue: '',
    isSending: false,
    labels: {
      heroTitle: 'What can I help with?',
      heroSubtitle: 'Ask about your money, log a transaction, or import a statement.',
      assistant: 'Assistant',
      toggleHistory: 'Toggle history',
      newChat: 'New chat',
      fullscreen: 'Full screen',
      exitFullscreen: 'Exit full screen',
      canvas: {},
    },
  },
};

export const WithConversation = {
  args: {
    mode: 'full',
    sessions,
    currentSessionId: 1,
    currentTitle: 'Budget review - May',
    messages,
    suggestions,
    modelValue: '',
    isSending: false,
  },
};

export const FullModeWithCanvas = {
  args: {
    mode: 'full',
    sessions,
    currentSessionId: 1,
    currentTitle: 'Import Bank Statement',
    messages,
    isSending: false,
    openCanvas: {
      title: 'Imported Document',
      blocks: [{ type: 'markdown', text: '# Imported\nParsed successfully' }],
    },
    canvasMessageId: 999,
    suggestions,
  },
};
