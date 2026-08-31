/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ['../components/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    // Ensure the Vue SFC plugin handles .vue files. Add it only if the
    // framework has not already provided it, to avoid double transforms.
    const plugins = (config.plugins || []).flat(Infinity);
    const hasVue = plugins.some((p) => p && p.name === 'vite:vue');
    if (!hasVue) {
      const vue = (await import('@vitejs/plugin-vue')).default;
      config.plugins = [...(config.plugins || []), vue()];
    }
    return config;
  },
};
