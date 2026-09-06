import TInput from './TInput.vue';
import { Mail, Eye } from 'lucide-vue-next';

export default {
  title: 'Primitives/TInput',
  component: TInput,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: { control: 'text' }
  }
};

export const Default = {
  args: {
    placeholder: 'Enter text...'
  }
};

export const WithPrefix = {
  render: (args) => ({
    components: { TInput, Mail },
    setup() { return { args }; },
    template: `
      <TInput v-bind="args" placeholder="you@example.com">
        <template #prefix>
          <Mail :size="16" />
        </template>
      </TInput>
    `
  })
};

export const WithSuffix = {
  render: (args) => ({
    components: { TInput, Eye },
    setup() { return { args }; },
    template: `
      <TInput v-bind="args" placeholder="Password" type="password">
        <template #suffix>
          <Eye :size="16" style="cursor: pointer;" />
        </template>
      </TInput>
    `
  })
};

export const ErrorState = {
  args: {
    placeholder: 'Invalid entry',
    error: true,
    modelValue: 'invalid-email'
  }
};

export const Disabled = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    modelValue: 'Cannot edit'
  }
};
