import CalendarHeatmap from '../components/CalendarHeatmap.vue';

export default {
  title: 'Components/CalendarHeatmap',
  component: CalendarHeatmap,
  tags: ['autodocs'],
};

const buckets = [
  { date: '2026-08-01', income: 0, expense: 12, net: -12 },
  { date: '2026-08-02', income: 100, expense: 45, net: 55 },
  { date: '2026-08-03', income: 0, expense: 0, net: 0 },
  { date: '2026-08-04', income: 0, expense: 80, net: -80 },
  { date: '2026-08-15', income: 200, expense: 20, net: 180 },
];
export const Default = { args: { buckets, currency: 'USD' } };
export const SingleDay = { args: { buckets: [{ date: '2026-08-10', income: 0, expense: 50, net: -50 }], currency: 'USD' } };
export const Empty = { args: { buckets: [], currency: 'USD' } };

