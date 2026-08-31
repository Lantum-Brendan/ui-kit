<template>
  <div>
    <label class="recurring-toggle"><input :checked="modelValue" type="checkbox" @change="$emit('update:modelValue', $event.target.checked)" /> <span>{{ labels.makeRecurring }}</span></label>
    <div v-if="modelValue" class="recurring-fields">
      <div class="form-transaction">
        <div class="transaction-date"><span>{{ labels.recurrencePeriod }}</span><select :value="period" class="recurring-select" @change="$emit('update:period', $event.target.value)"><option value="daily">{{ labels.daily }}</option><option value="weekly">{{ labels.weekly }}</option><option value="monthly">{{ labels.monthly }}</option><option value="yearly">{{ labels.yearly }}</option></select></div>
        <div class="transaction-date"><span>{{ labels.repeatEvery }}</span><input :value="interval" type="number" min="1" @input="$emit('update:interval', Number($event.target.value))" /></div>
      </div>
      <div class="transaction-date"><span>{{ labels.endDate }} <span class="optional-label">({{ labels.optional }})</span></span><input :value="endsAt" type="date" @input="$emit('update:endsAt', $event.target.value)" /></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  period: { type: String, required: true },
  interval: { type: Number, required: true },
  endsAt: { type: String, required: true },
  labels: { type: Object, required: true }
});
defineEmits(['update:modelValue', 'update:period', 'update:interval', 'update:endsAt']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.recurring-toggle{display:flex;align-items:center;gap:$spacing-2;cursor:pointer;font-size:$font-size-sm;font-weight:$font-medium;color:$text-secondary}
.recurring-fields{display:flex;flex-direction:column;gap:$spacing-3;padding-left:$spacing-5}
.recurring-select{padding:$spacing-2 $spacing-3;border:1px solid $border-color;border-radius:$radius-md;background:$input-bg;color:$text-primary;font-size:$font-size-sm}
.form-transaction{display:grid;grid-template-columns:1fr 1fr;gap:$spacing-3;@media(max-width:$breakpoint-sm){grid-template-columns:1fr}}
.transaction-date{display:flex;flex-direction:column;gap:$spacing-1;> span:first-child{font-size:$font-size-sm;font-weight:$font-medium;color:$text-secondary}input,select{padding:$spacing-2 $spacing-3;border:1px solid $border-color;border-radius:$radius-md;background:$input-bg;color:$text-primary;font-family:inherit;font-size:$font-size-sm;&:focus{outline:none;border-color:$primary}}}
.optional-label{color:$text-muted;font-size:$font-size-xs}
</style>
