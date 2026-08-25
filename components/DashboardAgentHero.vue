<template>
  <section v-if="!dismissed" class="agent-hero surface surface--brand">
    <div class="hero-ambient" aria-hidden="true">
      <Wallet class="amb a1" :size="108" :stroke-width="1" />
      <PieChart class="amb a2" :size="88" :stroke-width="1" />
      <Coins class="amb a3" :size="76" :stroke-width="1" />
      <Receipt class="amb a4" :size="96" :stroke-width="1" />
      <PiggyBank class="amb a5" :size="84" :stroke-width="1" />
      <TrendingUp class="amb a6" :size="80" :stroke-width="1" />
      <CreditCard class="amb a7" :size="72" :stroke-width="1" />
    </div>

    <button class="hero-dismiss" :aria-label="labels.dismiss" @click="dismiss">
      <X :size="16" />
    </button>

    <div class="hero-grid">
      <div class="hero-greet">
        <span class="greet-icon"><Bot :size="28" /></span>
        <div class="greet-text">
          <h1 class="hero-title">{{ fill(labels.greeting, { name: name || labels.defaultName }) }}</h1>
          <p class="hero-sub">{{ labels.subtitle }}</p>
        </div>
      </div>

      <div class="hero-main">
        <form class="hero-ask" @submit.prevent="askFreeform">
          <input
            v-model="askText"
            type="text"
            class="hero-input"
            :placeholder="labels.placeholder"
          />
          <button
            type="submit"
            class="hero-send"
            :disabled="!askText.trim()"
            :aria-label="labels.send"
          >
            <ArrowUp :size="18" />
          </button>
        </form>

        <div class="hero-actions">
          <button
            v-for="a in actions"
            :key="a.key"
            type="button"
            class="agent-chip"
            @click="$emit('action', a.key)"
          >
            <component :is="a.icon" :size="15" />
            <span>{{ labels[a.labelKey] || a.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import {
  Bot,
  ArrowUp,
  X,
  PlusCircle,
  FileBarChart,
  ArrowLeftRight,
  FileUp,
  Wallet,
  PieChart,
  Coins,
  Receipt,
  PiggyBank,
  TrendingUp,
  CreditCard
} from 'lucide-vue-next';

const props = defineProps({
  name: { type: String, default: '' },
  labels: {
    type: Object,
    default: () => ({
      dismiss: 'Dismiss',
      greeting: 'Hey {name}',
      defaultName: 'there',
      subtitle: "Tell me what you want and I'll do it.",
      placeholder: 'e.g. log 12 for lunch, or build me a report',
      send: 'Send',
      logTransaction: 'Log a transaction',
      transferMoney: 'Transfer money',
      buildReport: 'Build a report',
      importDocument: 'Import a document'
    })
  }
});

const emit = defineEmits(['ask', 'action']);

const fill = (template, params) =>
  template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '');

const askText = ref('');
const dismissed = ref(false);

const actions = [
  { key: 'log', icon: PlusCircle, label: 'Log a transaction', labelKey: 'logTransaction' },
  { key: 'transfer', icon: ArrowLeftRight, label: 'Transfer money', labelKey: 'transferMoney' },
  { key: 'report', icon: FileBarChart, label: 'Build a report', labelKey: 'buildReport' },
  { key: 'import', icon: FileUp, label: 'Import a document', labelKey: 'importDocument' }
];

const askFreeform = () => {
  const text = askText.value.trim();
  if (!text) return;
  emit('ask', text);
  askText.value = '';
};

const dismiss = () => {
  dismissed.value = true;
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.agent-hero {
  position: relative;
  width: 100%;
  border-radius: 18px;
  padding: $spacing-3 $spacing-4;
  overflow: hidden;
  border: 1px solid $border-light;
  box-shadow: $elevation-1;
}

.hero-ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  .amb {
    position: absolute;
    color: var(--surface-deep);
    opacity: 0.07;
  }
  .a1 { top: 8%; left: 2%; transform: rotate(-12deg); }
  .a2 { top: 12%; right: 8%; transform: rotate(10deg); }
  .a3 { bottom: 10%; left: 26%; transform: rotate(8deg); }
  .a4 { bottom: 6%; right: 4%; transform: rotate(-8deg); }
  .a5 { top: 40%; left: 40%; transform: rotate(6deg); }
  .a6 { top: 48%; right: 30%; transform: rotate(-6deg); }
  .a7 { top: 4%; left: 48%; transform: rotate(12deg); }
}

.hero-dismiss {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--surface-deep);
  cursor: pointer;
  opacity: 0.7;
  transition: $transition-base;

  &:hover {
    opacity: 1;
    background: var(--hover-overlay);
  }
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: $spacing-4;
  align-items: center;
  padding-right: $spacing-6;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.hero-greet {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  min-width: 0;
}

.greet-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  color: var(--surface-deep);
  flex-shrink: 0;
  backdrop-filter: blur(8px);
}

.greet-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.hero-title {
  margin: 0;
  color: var(--surface-ink);
  font-size: $font-size-2xl;
  font-weight: $font-bold;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-xl;
  }
}

.hero-sub {
  margin: 0;
  color: var(--surface-ink);
  opacity: 0.8;
  font-size: $font-size-base;
}

.hero-main {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  min-width: 0;
}

.hero-ask {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: 5px 5px 5px $spacing-3;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: 12px;
  box-shadow: $elevation-1;

  &:focus-within {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.12);
  }
}

.hero-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: $text-primary;
  font-size: $font-size-base;
  font-family: inherit;

  &:focus {
    outline: none;
  }
}

.hero-send {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 9px;
  background: $primary;
  color: $text-inverse;
  cursor: pointer;
  flex-shrink: 0;
  transition: $transition-base;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-2;
}

.agent-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px $spacing-3;
  border: 1px solid $border-light;
  background: var(--glass-bg);
  color: var(--surface-ink);
  border-radius: 999px;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: $transition-base;

  &:hover {
    background: var(--hover-overlay);
    transform: translateY(-1px);
  }
}
</style>
