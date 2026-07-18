import SparkLine from './SparkLine.vue';

export default {
  title: 'Reports/SparkLine',
  component: SparkLine,
  argTypes: {
    values: { control: 'object' },
    color: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' }
  }
};

const Template = (args) => ({
  components: { SparkLine },
  setup() {
    return { args };
  },
  template: `
    <div style="width: 240px; height: 72px;">
      <SparkLine v-bind="args" />
    </div>
  `
});

export const UpTrend = Template.bind({});
UpTrend.args = {
  values: [3, 5, 4, 7, 6, 9, 11],
  color: '#10b981',
  width: 120,
  height: 36
};

export const DownTrend = Template.bind({});
DownTrend.args = {
  values: [11, 9, 10, 6, 7, 4, 2],
  color: '#ef4444',
  width: 120,
  height: 36
};

export const Flat = Template.bind({});
Flat.args = {
  values: [5, 5, 5, 5, 5],
  color: '#3b82f6',
  width: 120,
  height: 36
};
