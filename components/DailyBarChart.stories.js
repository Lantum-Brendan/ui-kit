import DailyBarChart from './DailyBarChart.vue';

export default {
  title: 'Components/DailyBarChart',
  component: DailyBarChart,
  tags: ['autodocs'],
};

const data = [
  { date: '2026-08-01', expense: 45, txCount: 3 },
  { date: '2026-08-02', expense: 80, txCount: 5 },
  { date: '2026-08-03', expense: 20, txCount: 1 },
  { date: '2026-08-04', expense: 60, txCount: 4 },
  { date: '2026-08-05', expense: 100, txCount: 6 },
];

export const Default = { args: { data, currency: 'USD' } };
export const Single = { args: { data: [{ date: '2026-08-10', expense: 50, txCount: 2 }], currency: 'USD' } };
export const Flat = { args: { data: data.map((d) => ({ ...d, expense: 10 })), currency: 'USD' } };
