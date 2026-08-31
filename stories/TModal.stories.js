import TModal from '../components/TModal.vue';

export default {
  title: 'Components/TModal',
  component: TModal,
  tags: ['autodocs'],
};

export const Closed = {
  args: { modelValue: false, size: 'md' },
};
export const OpenMedium = {
  args: { modelValue: true, size: 'md' },
  render: (args) => ({
    components: { TModal },
    setup() { return { args }; },
    template: `<TModal v-bind="args"><div style="padding:24px">Modal body content — medium size.</div></TModal>`,
  }),
};
export const OpenLarge = {
  args: { modelValue: true, size: 'lg' },
  render: (args) => ({
    components: { TModal },
    setup() { return { args }; },
    template: `<TModal v-bind="args"><div style="padding:24px"><h3 style="margin:0 0 8px">Large modal</h3><p>Used for forms or detail views.</p></div></TModal>`,
  }),
};

