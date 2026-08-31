import ImportAnalyzing from './ImportAnalyzing.vue';

export default {
  title: 'Components/ImportAnalyzing',
  component: ImportAnalyzing,
  tags: ['autodocs'],
};

export const Default = { args: {
  fileName: 'statement.pdf',
  status: 'analyzing'
} };
export const Extracting = { args: {
  fileName: '',
  status: ''
} };
export const Ready = { args: {
  fileName: 'statement.pdf',
  status: 'ready'
} };
