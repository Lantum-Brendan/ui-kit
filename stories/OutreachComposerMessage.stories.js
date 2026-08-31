import OutreachComposerMessage from '../components/OutreachComposerMessage.vue';

export default {
  title: 'Components/OutreachComposerMessage',
  component: OutreachComposerMessage,
  tags: ['autodocs'],
};

const labels = {
  subject: 'Subject',
  message: 'Message',
  messagePlaceholder: 'Write your message...',
  personalizeWith: 'Personalize with',
  livePreview: 'Live preview',
  startTypingPreview: 'Start typing to see preview',
  formatLabels: { bold: 'Bold', italic: 'Italic', heading: 'Heading', bulletList: 'Bullet list', numberedList: 'Numbered list', link: 'Link' },
};

export const Default = {
  args: {
    subject: 'Hello from Trakli',
    message: 'Hi {{first_name}}, welcome to Trakli!',
    previewHtml: '<p>Hi Alice, welcome to Trakli!</p>',
    labels,
  },
};

export const Empty = {
  args: {
    subject: '',
    message: '',
    previewHtml: '',
    labels,
  },
};

export const Interactive = {
  args: {
    subject: 'Monthly Update {{name}}',
    message: 'Dear {{first_name}} {{last_name}},\n\nYour balance is ready.',
    previewHtml: '<p>Dear Alice Johnson,</p><p>Your balance is ready.</p>',
    labels,
  },
};
