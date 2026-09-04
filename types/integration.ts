export type ExtensionSlot =
  | 'settings.integrations'
  | 'settings.tabs'
  | 'onboarding.steps'
  | 'dashboard.widgets'
  | 'sidebar.nav';

export interface IntegrationCardDescriptor {
  title: string;
  cta?: string;
  description?: string;
  href?: string;
}

export interface IntegrationUiDescriptor {
  slots: ExtensionSlot[];
  card?: IntegrationCardDescriptor | null;
  onboarding?: { title?: string; description?: string; href?: string; order?: number } | null;
  component?: string | null;
  show_when_unconfigured?: boolean;
}

export interface Integration {
  key: string;
  name: string;
  description: string | null;
  icon: string | null;
  configured: boolean;
  entitled: boolean;
  ui: IntegrationUiDescriptor | null;
}

export interface SlotContribution {
  key: string;
  slot: ExtensionSlot;
  integration: Integration;
  ui: IntegrationUiDescriptor;
  order: number;
  configured: boolean;
}
