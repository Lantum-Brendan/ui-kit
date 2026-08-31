import CanvasPanel from '../components/CanvasPanel.vue';

export default {
  title: 'Components/CanvasPanel',
  component: CanvasPanel,
  tags: ['autodocs'],
};

const sampleCanvas = {
  title: 'Monthly Report',
  blocks: [
    { type: 'markdown', text: '# Summary\nYour spending decreased by **12%** this month.' },
    { type: 'kpi', label: 'Savings', value: '1,240 USD' },
  ],
};

const sampleCanvasLong = {
  title: 'Investment Overview',
  blocks: [
    { type: 'markdown', text: '## Portfolio\n- AAPL: +5%\n- TSLA: -2%' },
    { type: 'markdown', text: 'Detailed analysis follows...' },
  ],
};

export const Default = {
  args: {
    canvas: sampleCanvas,
    sessionId: 123,
    messageId: 456,
  },
};

export const WithCustomTitle = {
  args: {
    canvas: sampleCanvasLong,
    sessionId: 99,
    messageId: 100,
    labels: {
      eyebrow: 'Canvas',
      defaultTitle: 'Untitled',
      downloadMarkdown: 'Download as Markdown',
      printPdf: 'Print / Save as PDF',
      close: 'Close',
    },
  },
};

export const WithoutMessageId = {
  args: {
    canvas: { title: 'Draft Document', blocks: [{ type: 'markdown', text: 'Hello **world**' }] },
    sessionId: 1,
    messageId: undefined,
  },
};
