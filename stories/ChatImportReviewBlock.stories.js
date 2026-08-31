import ChatImportReviewBlock from '../components/ChatImportReviewBlock.vue';

export default {
  title: 'Components/ChatImportReviewBlock',
  component: ChatImportReviewBlock,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['analyzing', 'extracting', 'ready', 'confirmed', 'failed', 'expired', 'unavailable'] },
  },
};

export const Analyzing = {
  args: {
    block: { file_name: 'statement-may.pdf', import_session_id: 101 },
    status: 'analyzing',
  },
};

export const ReadyToReview = {
  args: {
    block: { file_name: 'statement-may.pdf', import_session_id: 101 },
    status: 'ready',
  },
};

export const Confirmed = {
  args: {
    block: { file_name: 'receipt.jpg', import_session_id: 202 },
    status: 'confirmed',
  },
};

export const Failed = {
  args: {
    block: { file_name: 'corrupted.csv', import_session_id: null },
    status: 'failed',
  },
};
