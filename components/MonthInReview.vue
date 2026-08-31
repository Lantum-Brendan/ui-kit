<template>
  <Transition name="story-root">
    <div v-if="open" ref="rootRef" class="story-root" role="dialog" aria-modal="true" tabindex="-1">
      <div class="story-frame" :class="`tone--${currentSlide?.tone || 'opening'}`">
        <MonthInReviewHeader
          :slides="slides"
          :current-index="currentIndex"
          :current-slide="currentSlide"
          :labels="labels"
          :paused="paused"
          :month-label="data?.monthLabel || ''"
          @close="$emit('close')"
          @next="next"
          @prev="prev"
          @toggle-pause="togglePause"
        />
        <button class="tap-zone tap-zone--prev" :aria-label="labels.previous" @click="prev">
          <span class="tap-hint tap-hint--left">
            <ChevronLeft :size="20" />
            <span class="tap-hint-label">{{ labels.prev }}</span>
          </span>
        </button>
        <button class="tap-zone tap-zone--next" :aria-label="labels.next" @click="next">
          <span class="tap-hint tap-hint--right">
            <span class="tap-hint-label">{{ labels.next }}</span>
            <ChevronRight :size="20" />
          </span>
        </button>
        <button
          class="tap-zone tap-zone--pause"
          :aria-label="paused ? labels.resume : labels.pause"
          @click="togglePause"
        />
        <Transition name="slide-swap" mode="out-in">
          <MonthInReviewSlide
            :key="data ? currentIndex : 'empty'"
            :current-slide="currentSlide"
            :slides="slides"
            :animated-value="animatedValue"
            :currency="currency"
            :formatter="formatter"
            :labels="labels"
            :confetti-dots="confettiDots"
            :current-index="currentIndex"
            :data="data"
            @next="next"
            @prev="prev"
          />
        </Transition>
        <MonthInReviewFooter
          v-if="data"
          :current-index="currentIndex"
          :slides="slides"
          :paused="paused"
          :labels="labels"
          @prev="prev"
          @next="next"
          @toggle-pause="togglePause"
        />
        <Transition name="hint-fade">
          <div v-if="data && showFirstHint" class="first-hint">
            <Keyboard :size="14" />
            <span>{{ labels.clickSides }}</span>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { fill } from '../utils/fill';
import MonthInReviewHeader from './MonthInReviewHeader.vue';
import MonthInReviewFooter from './MonthInReviewFooter.vue';
import MonthInReviewSlide from './MonthInReviewSlide.vue';
import { ChevronLeft, ChevronRight, TrendingUp, ShoppingBag, Award, Heart, Flame, PartyPopper, Keyboard } from 'lucide-vue-next';
const props = defineProps({
  open: { type: Boolean, default: false },
  data: { type: Object, default: null },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` },
  labels: {
    type: Object,
    default: () => ({
      monthInReview: 'Month in review',
      close: 'Close',
      previous: 'Previous',
      prev: 'Prev',
      next: 'Next',
      pause: 'Pause',
      resume: 'Resume',
      noDataForLatestMonth: 'No data for the latest month yet.',
      previousSlide: 'Previous slide',
      nextSlide: 'Next slide',
      clickSides: 'Click sides, use arrow keys, or use the controls below.',
      hereIsRecap: 'Here is your recap.',
      cashIn: 'Cash in',
      moneyBroughtHome: 'Money you brought home this month.',
      noIncomeRecorded: 'No income recorded.',
      cashOut: 'Cash out',
      whereSpendingWent: 'Where your spending went.',
      topCategory: 'Top category',
      yourFavourite: 'Your favourite',
      totalSpentWithParty: 'Total spent with this party.',
      biggestSingleExpense: 'Biggest single expense',
      theRecap: 'The recap',
      transactionsLogged: '{count} transactions logged.',
      transactionsLoggedRoughly: '{count} transactions logged. Roughly one every {days} days.',
      stellarMonth: 'A stellar month.',
      healthyMonth: 'A healthy month.',
      steadyMonth: 'A steady month.',
      brokeEven: 'You broke even.',
      heavyMonth: 'A heavy month.',
      keptPer100: 'You kept {n} of every $100 earned.',
      setAside: 'You set aside about 1 in {n} dollars.',
      incomeSpendingCancelled: 'Income and spending nearly cancelled out.',
      spentMoreThanEarned: 'You spent more than you earned this month.',
      noIncome: 'No income recorded.',
      topCategoryLed: '{name} led the way.',
      ofYourSpending: '{n}% of your spending.',
      inName: 'in {name}'
    })
  }
});
const emit = defineEmits(['close']);
const currentIndex = ref(0);
const paused = ref(false);
const rootRef = ref(null);
const animatedValue = ref(0);
const showFirstHint = ref(false);
let hintTimer = null;
const monthDescriptor = (rate) => {
  if (rate >= 0.3) return props.labels.stellarMonth;
  if (rate >= 0.2) return props.labels.healthyMonth;
  if (rate >= 0.1) return props.labels.steadyMonth;
  if (rate >= 0) return props.labels.brokeEven;
  return props.labels.heavyMonth;
};

const closingHeadline = (rate) => {
  if (rate >= 0.2)
    return fill(props.labels.keptPer100, { n: `$${Math.round(rate * 100)}` });
  if (rate >= 0.1)
    return fill(props.labels.setAside, { n: Math.round(1 / Math.max(rate, 0.01)) });
  if (rate >= 0) return props.labels.incomeSpendingCancelled;
  return props.labels.spentMoreThanEarned;
};

const slides = computed(() => {
  const d = props.data;
  if (!d) return [];
  const out = [];
  const cadence =
    d.transactionCount > 0 ? Math.max(1, Math.round(d.daysInMonth / d.transactionCount)) : 0;

  out.push({
    kind: 'opening',
    tone: 'opening',
    align: 'center',
    eyebrow: d.monthLabel,
    headline: monthDescriptor(d.savingsRate),
    detail: props.labels.hereIsRecap
  });

  out.push({
    kind: 'income',
    tone: 'income',
    align: 'left',
    eyebrow: props.labels.cashIn,
    icon: TrendingUp,
    value: d.income,
    detail: d.income > 0 ? props.labels.moneyBroughtHome : props.labels.noIncomeRecorded
  });

  if (d.expense > 0) {
    out.push({
      kind: 'spending',
      tone: 'spending',
      align: 'left',
      eyebrow: props.labels.cashOut,
      icon: ShoppingBag,
      value: d.expense,
      detail: props.labels.whereSpendingWent,
      footnote: d.topCategory ? fill(props.labels.topCategoryLed, { name: d.topCategory.name }) : ''
    });
  }

  if (d.topCategory) {
    out.push({
      kind: 'topCategory',
      tone: 'topCategory',
      align: 'center',
      eyebrow: props.labels.topCategory,
      icon: Award,
      headline: d.topCategory.name,
      detail: props.formatter(d.topCategory.amount, props.currency),
      footnote:
        d.expense > 0
          ? fill(props.labels.ofYourSpending, {
              n: Math.round((d.topCategory.amount / d.expense) * 100)
            })
          : ''
    });
  }

  if (d.topPayee) {
    out.push({
      kind: 'topPayee',
      tone: 'topPayee',
      align: 'center',
      eyebrow: props.labels.yourFavourite,
      icon: Heart,
      headline: d.topPayee.name,
      detail: props.formatter(d.topPayee.amount, props.currency),
      footnote: props.labels.totalSpentWithParty
    });
  }

  if (d.biggestExpense) {
    out.push({
      kind: 'biggest',
      tone: 'biggest',
      align: 'center',
      eyebrow: props.labels.biggestSingleExpense,
      icon: Flame,
      value: d.biggestExpense.amount,
      detail: d.biggestExpense.party,
      footnote: d.biggestExpense.category ? fill(props.labels.inName, { name: d.biggestExpense.category }) : ''
    });
  }

  out.push({
    kind: 'closing',
    tone: 'closing',
    align: 'center',
    eyebrow: props.labels.theRecap,
    icon: PartyPopper,
    headline: closingHeadline(d.savingsRate),
    detail: cadence
      ? fill(props.labels.transactionsLoggedRoughly, {
          count: d.transactionCount,
          days: cadence
        })
      : fill(props.labels.transactionsLogged, { count: d.transactionCount })
  });

  return out;
});

const currentSlide = computed(() => slides.value[currentIndex.value]);

const confettiDots = computed(() => {
  const rng = (seed) => {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  };
  const r = rng(11);
  const palette = ['var(--slide-accent)', 'var(--slide-deep)'];
  return Array.from({ length: 28 }, (_, i) => ({
    x: 30 + r() * 540,
    y: 30 + r() * 540,
    r: 5 + r() * 9,
    fill: palette[i % 2],
    o: 0.45 + r() * 0.45
  }));
});

let raf = null;
const animateValue = (target) => {
  cancelAnimationFrame(raf);
  if (target == null) {
    animatedValue.value = 0;
    return;
  }
  if (paused.value) {
    animatedValue.value = target;
    return;
  }
  const start = performance.now();
  const duration = 900;
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const tick = (now) => {
    const t2 = Math.min(1, (now - start) / duration);
    animatedValue.value = target * ease(t2);
    if (t2 < 1) raf = requestAnimationFrame(tick);
    else animatedValue.value = target;
  };
  raf = requestAnimationFrame(tick);
};

watch(currentSlide, (s) => {
  animateValue(s?.value ?? null);
});

watch(
  () => props.open,
  async (o) => {
    if (o) {
      currentIndex.value = 0;
      paused.value = false;
      showFirstHint.value = true;
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => {
        showFirstHint.value = false;
      }, 4200);
      await nextTick();
      rootRef.value?.focus?.();
      animateValue(currentSlide.value?.value ?? null);
    } else {
      cancelAnimationFrame(raf);
      clearTimeout(hintTimer);
      showFirstHint.value = false;
    }
  }
);

watch(currentIndex, () => {
  if (showFirstHint.value) {
    showFirstHint.value = false;
    clearTimeout(hintTimer);
  }
});

const next = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value += 1;
  } else {
    emit('close');
  }
};
const prev = () => {
  if (currentIndex.value > 0) currentIndex.value -= 1;
};
const togglePause = () => {
  paused.value = !paused.value;
};

const onKey = (e) => {
  if (!props.open) return;
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  } else if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    emit('close');
  } else if (e.key === 'p' || e.key === 'P') {
    togglePause();
  }
};

onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => {
  window.removeEventListener('keydown', onKey);
  cancelAnimationFrame(raf);
  clearTimeout(hintTimer);
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.story-root {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  z-index: $z-index-modal;
  outline: none;

  @media (min-width: $breakpoint-md) {
    padding: $spacing-4;
  }
}

.story-frame {
  position: relative;
  background: var(--slide-bg, #fef9f4);
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: $elevation-5;
  color: var(--slide-ink, #1b1f2c);
  transition:
    background $duration-slow $easing-emphasized,
    color $duration-slow $easing-emphasized;

  @media (min-width: $breakpoint-md) {
    width: 100%;
    max-width: 1080px;
    aspect-ratio: 16 / 10;
    height: auto;
    max-height: 88vh;
    border-radius: 28px;
  }

  &.tone--opening {
    --slide-bg: #fdf6ec;
    --slide-ink: #2d1c08;
    --slide-accent: #f59e0b;
    --slide-deep: #b45309;
  }
  &.tone--income {
    --slide-bg: #ecfdf5;
    --slide-ink: #052e1c;
    --slide-accent: #34d399;
    --slide-deep: #047857;
  }
  &.tone--spending {
    --slide-bg: #fff7ed;
    --slide-ink: #2c1503;
    --slide-accent: #fb923c;
    --slide-deep: #c2410c;
  }
  &.tone--topCategory {
    --slide-bg: #f5f3ff;
    --slide-ink: #1e1146;
    --slide-accent: #a78bfa;
    --slide-deep: #6d28d9;
  }
  &.tone--topPayee {
    --slide-bg: #ecfeff;
    --slide-ink: #0c2e34;
    --slide-accent: #22d3ee;
    --slide-deep: #0e7490;
  }
  &.tone--biggest {
    --slide-bg: #fff1f2;
    --slide-ink: #2d0a13;
    --slide-accent: #fb7185;
    --slide-deep: #be123c;
  }
  &.tone--closing {
    --slide-bg: #eef2ff;
    --slide-ink: #161a45;
    --slide-accent: #818cf8;
    --slide-deep: #3730a3;
  }
}

.tap-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 35%;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 3;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;

  &--prev {
    left: 0;
    justify-content: flex-start;
  }
  &--next {
    right: 0;
    justify-content: flex-end;
  }
  &--pause {
    left: 35%;
    width: 30%;
  }

  &:focus {
    outline: none;
  }

  &:hover .tap-hint,
  &:focus-visible .tap-hint {
    opacity: 1;
    transform: translateX(0);
  }
}

.tap-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0 18px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.85);
  color: var(--slide-deep);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  font-size: 12px;
  font-weight: $font-bold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity $duration-fast $easing-standard,
    transform $duration-fast $easing-emphasized;

  &--left {
    transform: translateX(-8px);
  }
  &--right {
    transform: translateX(8px);
  }
}

.tap-hint-label {
  @media (max-width: $breakpoint-sm) {
    display: none;
  }
}


.first-hint {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(15, 23, 42, 0.85);
  color: white;
  border-radius: 999px;
  font-size: 12px;
  font-weight: $font-medium;
  letter-spacing: -0.005em;
  z-index: 8;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.25);
  max-width: calc(100% - $spacing-6);

  @media (max-width: $breakpoint-sm) {
    bottom: 64px;
    font-size: 11px;
    padding: 7px 12px;
    white-space: normal;
    max-width: 88%;
    text-align: center;
  }
}

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition:
    opacity $duration-base $easing-standard,
    transform $duration-base $easing-emphasized;
}
.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

.story-root-enter-active,
.story-root-leave-active {
  transition: opacity $duration-base $easing-standard;
}
.story-root-enter-active .story-frame,
.story-root-leave-active .story-frame {
  transition: transform $duration-base $easing-emphasized;
}
.story-root-enter-from {
  opacity: 0;
}
.story-root-leave-to {
  opacity: 0;
}
.story-root-enter-from .story-frame,
.story-root-leave-to .story-frame {
  transform: scale(0.96);
}

.slide-swap-enter-active,
.slide-swap-leave-active {
  transition: opacity $duration-base $easing-standard;
}
.slide-swap-enter-from,
.slide-swap-leave-to {
  opacity: 0;
}
</style>
