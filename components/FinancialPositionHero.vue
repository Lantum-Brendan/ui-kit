<template>
  <section class="fp-hero surface" :class="netSurface">
    <div class="fp-hero-headline">
      <span class="eyebrow">{{ labels.netWorthChange }}</span>
      <div class="fp-hero-value-row">
        <p class="fp-hero-value">{{ signedMoney(position.net_worth_delta) }}</p>
        <span class="fp-hero-pill">
          <component :is="position.net_worth_delta >= 0 ? TrendingUp : TrendingDown" :size="14" />
          {{ position.net_worth_delta >= 0 ? labels.building : labels.shrinking }}
        </span>
      </div>
      <p class="fp-hero-sub">{{ labels.heroSub }}</p>
    </div>
    <div class="fp-hero-scales">
      <div class="fp-scale"><span class="fp-scale-label">{{ labels.moneyIn }}</span><span class="fp-scale-value fp-up">{{ money(totalIn) }}</span></div>
      <span class="fp-scale-arrow"><ArrowRight :size="18" /></span>
      <div class="fp-scale"><span class="fp-scale-label">{{ labels.moneyOut }}</span><span class="fp-scale-value fp-down">{{ money(totalOut) }}</span></div>
    </div>
  </section>
  <div class="fp-worth surface tone-card" @click="$emit('open-worth')">
    <div class="fp-worth-main"><span class="eyebrow">{{ labels.totalNetWorthNow }}</span><p class="fp-worth-value">{{ money(position.total_net_worth) }}</p></div>
    <div class="fp-worth-split">
      <div class="fp-worth-part"><Wallet :size="15" /><span class="fp-worth-part-label">{{ labels.cash }}</span><span class="fp-worth-part-value">{{ money(position.cash_balance) }}</span></div>
      <div class="fp-worth-part"><Coins :size="15" /><span class="fp-worth-part-label">{{ labels.holdings }}</span><span class="fp-worth-part-value">{{ money(position.holdings_value) }}</span></div>
      <ChevronRight :size="16" class="fp-worth-go" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Wallet, Coins, TrendingUp, TrendingDown, ChevronRight, ArrowRight } from 'lucide-vue-next';

const props = defineProps({
  position: { type: Object, required: true },
  currency: { type: String, default: 'USD' },
  labels: { type: Object, required: true },
  totalIn: { type: Number, required: true },
  totalOut: { type: Number, required: true }
});
defineEmits(['open-worth']);

const money = (n) => {
  const rounded = Math.round((n || 0) * 100) / 100;
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(rounded) + ` ${props.currency}`;
};
const signedMoney = (n) => (n > 0 ? '+' : '') + money(n);
const netSurface = computed(() => (props.position?.net_worth_delta ?? 0) >= 0 ? 'surface--income' : 'surface--expense');
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.fp-hero{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:$spacing-5;padding:$spacing-5 $spacing-6;background:var(--surface-bg, var(--color-bg-white));border:1px solid var(--color-border-light);border-radius:20px;box-shadow:$elevation-1}
.fp-hero-headline{display:flex;flex-direction:column;gap:6px;min-width:240px;flex:1}
.fp-hero-value-row{display:flex;align-items:baseline;gap:$spacing-2;flex-wrap:wrap}
.fp-hero-value{margin:0;font-size:2.4rem;font-weight:$font-bold;font-variant-numeric:tabular-nums;letter-spacing:-0.02em;line-height:1.02;color:var(--surface-deep, var(--color-primary-dark));@media(max-width:$breakpoint-sm){font-size:1.8rem}}
.fp-hero-pill{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:$font-bold;text-transform:uppercase;letter-spacing:0.05em;padding:4px 10px;border-radius:999px;background:var(--glass-bg-strong);color:var(--surface-deep, var(--color-primary-dark))}
.fp-hero-sub{margin:2px 0 0;font-size:$font-size-sm;color:$text-secondary;max-width:46ch}
.fp-hero-scales{display:flex;align-items:center;gap:$spacing-4;padding:$spacing-3 $spacing-4;border-radius:16px;background:var(--glass-bg-strong)}
.fp-scale{display:flex;flex-direction:column;gap:2px}
.fp-scale-label{font-size:10px;font-weight:$font-bold;text-transform:uppercase;letter-spacing:0.08em;color:$text-muted}
.fp-scale-value{font-size:$font-size-lg;font-weight:$font-bold;font-variant-numeric:tabular-nums}
.fp-scale-arrow{color:$text-muted}
.fp-worth{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:$spacing-4;padding:$spacing-4 $spacing-5;text-decoration:none;color:inherit;cursor:pointer}
.fp-worth-main{display:flex;flex-direction:column;gap:2px}
.fp-worth-value{margin:0;font-size:1.6rem;font-weight:$font-bold;font-variant-numeric:tabular-nums;color:$text-primary}
.fp-worth-split{display:flex;align-items:center;gap:$spacing-4;color:$text-secondary}
.fp-worth-part{display:inline-flex;align-items:center;gap:6px;font-size:$font-size-sm}
.fp-worth-part-label{color:$text-muted}
.fp-worth-part-value{font-weight:$font-semibold;font-variant-numeric:tabular-nums;color:$text-primary}
.fp-worth-go{color:$text-muted}
.fp-up{color:var(--color-income)}.fp-down{color:var(--color-expense)}
</style>
