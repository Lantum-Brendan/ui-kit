import CalendarTab from './CalendarTab.vue';

export default {
  title: 'Components/CalendarTab',
  component: CalendarTab,
  tags: ['autodocs'],
};

const buckets = Array.from({ length: 30 }, (_, i) => ({
  date: `2026-08-${String(i + 1).padStart(2, '0')}`,
  income: i % 5 === 0 ? 100 : 0,
  expense: Math.round(Math.random() * 80),
  net: 0,
}));

export const Default = { args: { buckets, currency: 'USD', formatter: (n) => `$${Math.round(n)}` } };
export const Empty = { args: { buckets: [], currency: 'USD' } };
export const SingleSpend = { args: { buckets: [{ date: '2026-08-15', income: 0, expense: 120, net: -120 }], currency: 'USD' } };
