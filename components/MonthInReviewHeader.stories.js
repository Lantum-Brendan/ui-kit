import MonthInReviewHeader from './MonthInReviewHeader.vue';

export default {
  title: 'Components/MonthInReviewHeader',
  component: MonthInReviewHeader,
  tags: ['autodocs'],
};

const slides = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const Default = {
  args: {
    slides,
    currentIndex: 0,
    currentSlide: slides[0],
    labels: { monthInReview: 'Month in Review', close: 'Close' },
    paused: false,
    monthLabel: 'April 2026',
  },
};

export const Mid = {
  args: {
    slides,
    currentIndex: 1,
    currentSlide: slides[1],
    labels: { monthInReview: 'Month in Review', close: 'Close' },
    paused: false,
    monthLabel: 'April 2026',
  },
};

export const Paused = {
  args: {
    slides,
    currentIndex: 2,
    currentSlide: slides[2],
    labels: { monthInReview: 'Month in Review', close: 'Close' },
    paused: true,
    monthLabel: 'March 2026',
  },
};
