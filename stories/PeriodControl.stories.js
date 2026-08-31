import PeriodControl from '../components/PeriodControl.vue';

export default {
  title: 'Components/PeriodControl',
  component: PeriodControl,
  tags: ['autodocs'],
};

export const Default = { args: {
  periods: [{ id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }, { id: 'year', label: 'Year' }],
  selectedPeriod: 'month',
  compareEnabled: false,
  customRange: null
} };
export const CompareEnabled = { args: {
  periods: [],
  selectedPeriod: '',
  compareEnabled: false,
  customRange: null
} };
export const CustomRange = { args: {
  periods: [{ id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }, { id: 'year', label: 'Year' }],
  selectedPeriod: 'week',
  compareEnabled: true,
  customRange: null
} };
