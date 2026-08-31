<template>
  <div class="intent-pills" role="radiogroup" :aria-label="label">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="intent-pill"
      :class="{ 'intent-pill--active': modelValue === opt.value }"
      role="radio"
      :aria-checked="modelValue === opt.value"
      @click="$emit('update:modelValue', opt.value)"
    >
      <component :is="icons[opt.value]" class="intent-pill-icon" />
      <span>{{ labels?.intentLabels?.[opt.value] || opt.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { Circle, HandCoins, Banknote, Scale, Handshake, TrendingUp, PiggyBank, Gift } from 'lucide-vue-next';
defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true },
  label: { type: String, default: 'Intent' },
  labels: { type: Object, default: () => ({ intentLabels: {} }) }
});
defineEmits(['update:modelValue']);
const icons = { regular: Circle, loan_received: HandCoins, loan_repayment: Banknote, debt_owed: Scale, debt_settled: Handshake, investment_buy: TrendingUp, investment_return: PiggyBank, gift: Gift };
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.intent-pills{display:flex;flex-wrap:wrap;gap:$spacing-2}
.intent-pill{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border:1px solid $border-color;border-radius:999px;background:transparent;color:$text-secondary;font-size:$font-size-xs;cursor:pointer;transition:all 0.15s;.intent-pill-icon{width:12px;height:12px}&--active{border-color:$primary;background:$primary-light;color:$primary}}
</style>
