<template>
  <div class="sidebar-sub">
    <ul class="sub-list">
      <li v-for="sub in subItems" :key="sub.label">
        <button
          type="button"
          class="sub-link"
          :class="{ selected: isSubActive(sub) }"
          @click="handleSelect(sub)"
        >
          <span class="dot" :class="`dot--${sub.tone}`" />
          <span>{{ labels[sub.labelKey] || sub.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  subItems: { type: Array, required: true },
  activeId: { type: String, default: '' },
  labels: { type: Object, default: () => ({}) },
  parentTo: { type: String, default: '' }
});

const emit = defineEmits(['select', 'close']);

const isSubActive = (sub) => {
  if (sub.to) return props.activeId === sub.to;
  return props.activeId === props.parentTo;
};

const handleSelect = (sub) => {
  emit('select', sub.to || props.parentTo);
  emit('close');
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.sidebar-sub {
  width: 100%;
}

.sub-list {
  list-style: none;
  margin: 4px 10px 8px 46px;
  padding: 0 0 0 10px;
  border-left: 2px solid $border-color;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sub-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  color: $text-secondary;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background-color 0.15s ease;

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;

    &--success {
      background: var(--color-success);
    }
    &--error {
      background: var(--color-error);
    }
    &--info {
      background: var(--color-info);
    }
    &--muted {
      background: $text-muted;
      opacity: 0.4;
    }
    &--neutral {
      background: $primary-muted;
    }
  }

  &:hover:not(.selected) {
    background-color: rgba(var(--color-primary-rgb), 0.08);
    color: $primary;
  }

  &.selected {
    background-color: $bg-white;
    color: $primary;
    font-weight: $font-semibold;
    box-shadow: var(--shadow-sm);
  }
}
</style>
