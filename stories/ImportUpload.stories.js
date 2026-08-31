import ImportUpload from '../components/ImportUpload.vue';

export default {
  title: 'Components/ImportUpload',
  component: ImportUpload,
  tags: ['autodocs'],
};

export const Default = { args: {
  isAnalyzing: false
} };
export const Extracting = { args: {
  isAnalyzing: false
} };
export const Ready = { args: {
  isAnalyzing: true
} };
