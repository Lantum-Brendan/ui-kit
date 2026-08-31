import MonthInReviewIllustration from '../components/MonthInReviewIllustration.vue';

export default {
  title: 'Components/MonthInReviewIllustration',
  component: MonthInReviewIllustration,
  tags: ['autodocs'],
};

export const Default = { args: {
  kind: 'savings',
  confettiDots: []
} };
export const Empty = { args: {
  kind: '',
  confettiDots: []
} };
export const Alternative = { args: {
  kind: 'success',
  confettiDots: []
} };
