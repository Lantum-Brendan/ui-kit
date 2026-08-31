import MonthInReviewFooter from './MonthInReviewFooter.vue';

export default {
  title: 'Components/MonthInReviewFooter',
  component: MonthInReviewFooter,
  tags: ['autodocs'],
};

const slides = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const Default = {
  args: {
    currentIndex: 0,
    slides,
    paused: false,
    labels: { prev: 'Prev', next: 'Next', previousSlide: 'Previous slide', nextSlide: 'Next slide', pause: 'Pause', resume: 'Resume' },
  },
};

export const Paused = {
  args: {
    currentIndex: 1,
    slides,
    paused: true,
    labels: { prev: 'Prev', next: 'Next', previousSlide: 'Previous slide', nextSlide: 'Next slide', pause: 'Pause', resume: 'Resume' },
  },
};

export const LastSlide = {
  args: {
    currentIndex: 2,
    slides,
    paused: false,
    labels: { prev: 'Previous', next: 'Next', previousSlide: 'Prev', nextSlide: 'Next', pause: 'Pause', resume: 'Resume' },
  },
};
