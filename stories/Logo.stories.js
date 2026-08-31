import Logo from '../components/Logo.vue';

export default {
  title: 'Primitives/Logo',
  component: Logo,
  argTypes: {
    alt: { control: 'text' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
};

const Template = (args) => ({
  components: { Logo },
  setup() {
    return { args };
  },
  template: `<Logo v-bind="args" />`
});

export const Medium = Template.bind({});
Medium.args = { alt: 'Trakli Logo', size: 'medium' };

export const Small = Template.bind({});
Small.args = { alt: 'Trakli Logo', size: 'small' };

export const Large = Template.bind({});
Large.args = { alt: 'Trakli Logo', size: 'large' };
