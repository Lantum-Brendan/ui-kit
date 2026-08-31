import TModalBody from './TModalBody.vue';

export default {
  title: 'Components/TModalBody',
  component: TModalBody,
  tags: ['autodocs'],
};

export const Default = {
  render: () => ({
    components: { TModalBody },
    template: `<TModalBody><p style="margin:0">Modal body holds the main content. Scrollable when long.</p></TModalBody>`,
  }),
};
export const LongContent = {
  render: () => ({
    components: { TModalBody },
    template: `<TModalBody><p v-for="i in 6" :key="i" style="margin:0 0 8px">Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></TModalBody>`,
  }),
};
export const Empty = {
  render: () => ({
    components: { TModalBody },
    template: `<TModalBody><p style="margin:0;color:#888">Empty body state.</p></TModalBody>`,
  }),
};

