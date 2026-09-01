import ThemeToggleButton from './ThemeToggleButton.vue';

export default {
  title: 'Primitives/ThemeToggleButton',
  component: ThemeToggleButton,
  argTypes: {
    titleLight: { control: 'text' },
    titleDark: { control: 'text' },
  },
};

export const Default = {};
export const CustomLabels = {
  args: { titleLight: 'Switch to light', titleDark: 'Switch to dark' },
};
export const Interactive = {
  render: (args) => ({
    components: { ThemeToggleButton },
    setup() { return { args }; },
    template: `
      <div style="display:flex; gap:16px; align-items:center;">
        <ThemeToggleButton v-bind="args" />
        <span style="font-size:14px; color:var(--color-text-muted);">Click to toggle — check :root.dark on html</span>
      </div>`,
  }),
};
