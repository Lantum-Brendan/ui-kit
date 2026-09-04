<template>
  <TCard class="kpi-card">
    <div class="kpi-label">{{ label }}</div>
    <div class="kpi-value" :class="valueClass">{{ value }}</div>
  </TCard>
</template>

<script setup>
import TCard from '../TCard.vue';

const { label, value, valueClass } = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  valueClass: { type: [String, Array, Object], default: '' }
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

// TCard already provides background, border-radius, box-shadow and padding.
// We only add the internal layout styles here.
.kpi-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: fit-content;
}

.kpi-label {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: $text-muted;
}

.kpi-value {
  font-size: 2.25rem;
  font-weight: $font-bold;
  color: $text-primary;
  margin-top: 0.5rem;

  &.is-positive {
    color: $primary;
  }
  &.is-negative {
    color: $error-color;
  }
}
</style>
