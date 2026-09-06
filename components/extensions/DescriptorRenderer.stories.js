import { h } from 'vue';
import DescriptorRenderer from './DescriptorRenderer.vue';
import { useExtensionSlots } from '../../composables/useExtensionSlots';

export default {
  title: 'Primitives/DescriptorRenderer',
  component: DescriptorRenderer,
};

const baseContribution = {
  key: 'plaid',
  slot: 'settings.integrations',
  integration: {
    key: 'plaid',
    name: 'Plaid Bank Sync',
    description: 'Automatically import bank balances and transactions.',
    icon: 'Building2',
    configured: true,
    entitled: true,
    ui: {
      slots: ['settings.integrations'],
      card: { title: 'Plaid Bank Sync', description: 'Connect external bank accounts.', cta: 'Manage Accounts' }
    }
  },
  ui: {
    slots: ['settings.integrations'],
    card: { title: 'Plaid Bank Sync', description: 'Connect external bank accounts.', cta: 'Manage Accounts' }
  },
  order: 10,
  configured: true
};

export const CardIntegration = {
  args: { contribution: baseContribution }
};

export const SidebarNav = {
  args: {
    contribution: {
      ...baseContribution,
      slot: 'sidebar.nav',
      ui: {
        ...baseContribution.ui,
        card: { title: 'Bank Feeds', href: '/banks' }
      }
    }
  }
};

export const OnboardingStep = {
  args: {
    contribution: {
      ...baseContribution,
      slot: 'onboarding.steps',
      ui: {
        ...baseContribution.ui,
        onboarding: {
          title: 'Connect your accounts',
          description: 'Link your checking, savings, or credit card accounts.',
          href: '/connect'
        }
      }
    }
  }
};

export const CustomPluginEscapeHatch = {
  render: () => ({
    components: { DescriptorRenderer },
    setup() {
      const { registerComponent } = useExtensionSlots();
      // Register custom component via plugin escape hatch
      registerComponent('custom-widget', {
        props: ['contribution'],
        render() {
          return h(
            'div',
            { style: 'padding: 1rem; background: #e0f2fe; border: 1px solid #0284c7; border-radius: 8px;' },
            'Custom Plugin Registered Component: ' + this.contribution.integration.name
          );
        }
      });

      const contribution = {
        ...baseContribution,
        ui: {
          ...baseContribution.ui,
          component: 'custom-widget'
        }
      };

      return { contribution };
    },
    template: '<DescriptorRenderer :contribution="contribution" />'
  })
};
