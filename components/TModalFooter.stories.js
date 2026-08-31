import TModalFooter from './TModalFooter.vue';

export default {
  title: 'Components/TModalFooter',
  component: TModalFooter,
  tags: ['autodocs'],
};

export const RightAligned = {
  args: { align: 'right' },
  render: (args) => ({
    components: { TModalFooter },
    setup() { return { args }; },
    template: `<TModalFooter v-bind="args"><button style="padding:6px 12px">Cancel</button><button style="padding:6px 12px;background:#4f46e5;color:white;border:none;border-radius:6px">Save</button></TModalFooter>`,
  }),
};
export const LeftAligned = {
  args: { align: 'left' },
  render: (args) => ({
    components: { TModalFooter },
    setup() { return { args }; },
    template: `<TModalFooter v-bind="args"><button style="padding:6px 12px">Back</button><button style="padding:6px 12px">Next</button></TModalFooter>`,
  }),
};
export const Between = {
  args: { align: 'between' },
  render: (args) => ({
    components: { TModalFooter },
    setup() { return { args }; },
    template: `<TModalFooter v-bind="args"><span style="font-size:12px;color:#888">2 of 3 steps</span><button style="padding:6px 12px;background:#4f46e5;color:white;border:none;border-radius:6px">Continue</button></TModalFooter>`,
  }),
};

