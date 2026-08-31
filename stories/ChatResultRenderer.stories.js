import ChatResultRenderer from '../components/ChatResultRenderer.vue';

export default {
  title: 'Components/ChatResultRenderer',
  component: ChatResultRenderer,
  tags: ['autodocs'],
};

export const Scalar = { args: { result: { format_type: 'scalar', rows: [{ total: 1245.5 }] } } };
export const Table = { args: { result: { format_type: 'table', rows: [{ name: 'Food', amount: 320 }, { name: 'Rent', amount: 1200 }] } } };
export const PairList = { args: { result: { format_type: 'pair_list', rows: [{ k: 'Income', v: 3000 }, { k: 'Expense', v: 1960 }] } } };
