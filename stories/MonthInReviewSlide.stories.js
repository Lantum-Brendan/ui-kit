import MonthInReviewSlide from '../components/MonthInReviewSlide.vue';

export default {
  title: 'Components/MonthInReviewSlide',
  component: MonthInReviewSlide,
  tags: ['autodocs'],
};

const slides = [{ id: 1, title: 'Slide 1' }, { id: 2, title: 'Slide 2' }];

export const Default = {
  args: {
    currentSlide: slides[0],
    slides,
    animatedValue: 1234,
    currency: 'USD',
    formatter: (n) => new Intl.NumberFormat('en-US').format(Math.round(n)),
    labels: { noDataForLatestMonth: 'No data for latest month' },
    confettiDots: [],
    currentIndex: 0,
    data: null,
  },
};

export const WithConfetti = {
  args: {
    currentSlide: slides[1],
    slides,
    animatedValue: 5678,
    currency: 'EUR',
    formatter: (n) => `${Math.round(n)} EUR`,
    labels: { noDataForLatestMonth: 'No data' },
    confettiDots: [{ x: 10, y: 20, color: '#ff0' }],
    currentIndex: 1,
    data: { total: 1000 },
  },
};

export const Empty = {
  args: {
    currentSlide: null,
    slides: [],
    animatedValue: 0,
    currency: 'USD',
    formatter: (n) => String(n),
    labels: { noDataForLatestMonth: 'No data available for this month' },
    confettiDots: [],
    currentIndex: 0,
    data: null,
  },
};
