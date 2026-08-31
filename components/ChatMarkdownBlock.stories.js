import ChatMarkdownBlock from './ChatMarkdownBlock.vue';

export default {
  title: 'Components/ChatMarkdownBlock',
  component: ChatMarkdownBlock,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    text: '# Hello\n\nThis is **markdown** rendered via `markdown-it`.\n\n- Item one\n- Item two\n\n> Blockquote example',
  },
};

export const WithTable = {
  args: {
    text: '| Category | Amount |\n| --- | --- |\n| Groceries | $320 |\n| Rent | $1200 |\n| Dining | $410 |\n\n**Total** $1,930',
  },
};

export const LongDocument = {
  args: {
    text: '# Monthly Report\n\n## Summary\nYour net worth **increased** by $1,234 this month.\n\n### Details\nLorem ipsum dolor sit amet. [Learn more](https://example.com)\n\n```js\nconst x = 42;\n```\n\nInline `code` and **bold** text.',
  },
};
