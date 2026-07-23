<script setup>
import { computed, ref, h, onErrorCaptured, markRaw } from 'vue';
import { components, getDemo, slottedComponents } from '../registry';
import UsageLanding from './UsageLanding.vue';

const props = defineProps({
  selected: { type: String, default: '' }
});

defineEmits(['select-category']);

const meta = computed(() => components.find((c) => c.name === props.selected) || null);
const isSlotted = computed(() => meta.value && slottedComponents.has(meta.value.name));
const demo = computed(() => (meta.value ? getDemo(meta.value.name) : { props: {} }));

// Per-render error boundary: a single component that throws during render
// must not take down the whole dashboard (which forced a manual refresh).
const renderError = ref(null);

onErrorCaptured((err) => {
  renderError.value = err && err.message ? err.message : String(err);
  return false;
});

// Reset any prior error whenever the selection changes.
const selectedKey = computed(() => props.selected);
import { watch } from 'vue';
watch(selectedKey, () => { renderError.value = null; });
</script>

<template>
  <div v-if="!meta" class="usage-wrap">
    <UsageLanding @select-category="$emit('select-category', $event)" />
  </div>

  <div v-else-if="renderError" class="error-hint">
    <h3>This component could not be previewed</h3>
    <p>{{ meta.name }} threw during render:</p>
    <pre>{{ renderError }}</pre>
    <p class="error-hint__note">
      It likely needs a data shape (e.g. a <code>budget</code>/<code>party</code>/<code>wallet</code>
      object) not yet provided in the playground registry.
    </p>
  </div>

  <!-- Slotted / composite demos need real template fragments -->
  <div v-else-if="isSlotted" class="demo">
    <div v-if="meta.name === 'TButton'" class="btn-row">
      <TButton text="Primary" variant="primary" :full-width="false" />
      <TButton text="Secondary" variant="secondary" :full-width="false" />
      <TButton text="Outline" variant="outline" :full-width="false" />
      <TButton text="Loading" loading :full-width="false" />
      <TButton text="Disabled" disabled :full-width="false" />
    </div>

    <TCard v-else-if="meta.name === 'TCard'" title="Card title">Card body content</TCard>

    <TInfoButton v-else-if="meta.name === 'TInfoButton'" text="Info" :full-width="false" />

    <TContainer v-else-if="meta.name === 'TContainer'">
      <TStack>
        <TCard title="Stacked">One</TCard>
        <TCard title="Stacked">Two</TCard>
      </TStack>
    </TContainer>

    <TStack v-else-if="meta.name === 'TStack'">
      <TCard title="Stacked">One</TCard>
      <TCard title="Stacked">Two</TCard>
    </TStack>

    <TGrid v-else-if="meta.name === 'TGrid'">
      <TCard title="Grid">A</TCard>
      <TCard title="Grid">B</TCard>
    </TGrid>

    <TSplit v-else-if="meta.name === 'TSplit'">
      <template #master><TCard title="Master">M</TCard></template>
      <template #detail><TCard title="Detail">D</TCard></template>
    </TSplit>

    <TPanel v-else-if="meta.name === 'TPanel'" title="Panel">Panel content</TPanel>

    <TPageShell v-else-if="meta.name === 'TPageShell'" title="Page shell">
      <TCard title="Inside">Shell body</TCard>
    </TPageShell>

    <TDropdown v-else-if="meta.name === 'TDropdown'" text="Menu" :full-width="false">
      <TDropdownItem text="Action one" />
      <TDropdownItem text="Action two" />
    </TDropdown>

    <TTabs v-else-if="meta.name === 'TTabs'" v-bind="demo.props">
      <template #first><TCard title="First">First panel</TCard></template>
      <template #second><TCard title="Second">Second panel</TCard></template>
    </TTabs>

    <CollapsibleSection v-else-if="meta.name === 'CollapsibleSection'" title="Section">
      Collapsible content
    </CollapsibleSection>
  </div>

  <!-- Generic: render with demo props -->
  <div v-else class="demo">
    <component :is="meta.component" v-bind="demo.props" />
  </div>
</template>

<style scoped>
.demo {
  padding: 2rem;
}
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.usage-wrap {
  padding: 1rem 0;
}
.error-hint {
  padding: 2rem;
  color: var(--color-error-dark);
}
.error-hint h3 {
  margin-top: 0;
}
.error-hint pre {
  background: rgba(var(--color-error-rgb), 0.08);
  border: 1px solid rgba(var(--color-error-rgb), 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  overflow-x: auto;
  font-size: 0.8rem;
  white-space: pre-wrap;
}
.error-hint__note {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
</style>
