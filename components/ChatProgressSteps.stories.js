import ChatProgressSteps from './ChatProgressSteps.vue';

export default {
  title: 'Components/ChatProgressSteps',
  component: ChatProgressSteps,
  tags: ['autodocs'],
};

export const Default = { args: { steps: ['Analyzing your query', 'Fetching transactions', 'Generating response'] } };
export const SingleStep = { args: { steps: ['Processing'] } };
export const ManySteps = { args: { steps: ['Step 1: Validate', 'Step 2: Query DB', 'Step 3: Rank', 'Step 4: Summarize', 'Step 5: Done'] } };
