import DescriptorRenderer from '../components/DescriptorRenderer.vue';

export default {
  title: 'Components/DescriptorRenderer',
  component: DescriptorRenderer,
  tags: ['autodocs'],
};

const baseContribution = {
  key: 'bank-sync',
  slot: 'dashboard.widgets',
  integration: {
    key: 'bank-sync',
    name: 'Bank Sync',
    description: 'Sync transactions from your bank automatically.',
    icon: 'Landmark',
    configured: false,
  },
  ui: {
    slots: ['dashboard.widgets'],
    card: { title: 'Bank Sync', description: 'Connect your bank in 2 minutes', cta: 'Connect', href: '/integrations/bank-sync' },
    onboarding: null,
    component: null,
    show_when_unconfigured: true,
  },
  configured: false,
};

export const CardDefault = {
  args: {
    contribution: baseContribution,
    needsSetupLabel: 'Setup needed',
  },
};

export const SidebarNav = {
  args: {
    contribution: {
      ...baseContribution,
      slot: 'sidebar.nav',
      ui: { ...baseContribution.ui, card: { title: 'Bank Sync', href: '/integrations/bank-sync' } },
    },
  },
};

export const OnboardingStep = {
  args: {
    contribution: {
      ...baseContribution,
      slot: 'onboarding.steps',
      ui: {
        ...baseContribution.ui,
        card: { title: 'Connect Bank', description: 'Link your bank to auto-import.' },
        onboarding: { step: 'bank', title: 'Connect your bank', description: 'Import transactions automatically.' },
      },
    },
  },
};

export const Configured = {
  args: {
    contribution: {
      ...baseContribution,
      configured: true,
      integration: { ...baseContribution.integration, configured: true },
    },
  },
};
