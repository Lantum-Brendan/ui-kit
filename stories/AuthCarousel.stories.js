import AuthCarousel from '../components/AuthCarousel.vue';

export default {
  title: 'Components/AuthCarousel',
  component: AuthCarousel,
  tags: ['autodocs'],
};

const slides = [
  { title: 'Track every penny', text: 'See where your money goes with beautiful charts.' },
  { title: 'Plan ahead', text: 'Set budgets and hit your goals every month.' },
  { title: 'Smart insights', text: 'AI-powered tips tailored to your habits.' },
];

export const Default = { args: { slides } };
export const Single = { args: { slides: [slides[0]] } };
export const Empty = { args: { slides: [] } };
