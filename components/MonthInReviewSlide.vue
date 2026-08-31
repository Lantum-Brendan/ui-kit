<template>
  <div v-if="!currentSlide" class="slide slide--empty">
    <CalendarOff :size="48" />
    <p class="slide-msg">{{ labels.noDataForLatestMonth }}</p>
  </div>
  <div
    v-else
    class="slide"
    :class="{ 'slide--flip': isFlipped }"
  >
    <div class="illustration-panel">
      <MonthInReviewIllustration :kind="currentSlide?.kind" :confetti-dots="confettiDots" />
    </div>
    <div class="slide-body" :class="`align--${currentSlide?.align || 'center'}`">
      <span class="slide-eyebrow">{{ currentSlide?.eyebrow }}</span>
      <component
        :is="currentSlide.icon"
        v-if="currentSlide?.icon"
        :size="28"
        class="slide-icon"
      />
      <h2 class="slide-headline">
        <template v-if="currentSlide?.value != null">
          {{ formatter(animatedValue, currency) }}
        </template>
        <template v-else>
          {{ currentSlide?.headline }}
        </template>
      </h2>
      <p v-if="currentSlide?.detail" class="slide-detail">{{ currentSlide.detail }}</p>
      <p v-if="currentSlide?.footnote" class="slide-footnote">
        {{ currentSlide.footnote }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { CalendarOff } from 'lucide-vue-next';
import MonthInReviewIllustration from './MonthInReviewIllustration.vue';

const props = defineProps({
  currentSlide: { type: Object, default: null },
  slides: { type: Array, default: () => [] },
  animatedValue: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` },
  labels: { type: Object, default: () => ({}) },
  confettiDots: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 },
  data: { type: Object, default: null }
});

defineEmits(['next', 'prev']);

const isFlipped = computed(() => {
  if (typeof props.currentIndex === 'number') return props.currentIndex % 2 === 1;
  if (props.currentSlide && props.slides.length) {
    const idx = props.slides.indexOf(props.currentSlide);
    return idx % 2 === 1;
  }
  return false;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.slide {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  color: var(--slide-ink);
  overflow: hidden;

  @media (min-width: $breakpoint-md) {
    display: grid;
    grid-template-columns: 5fr 6fr;
    align-items: stretch;
  }

  &--flip {
    @media (min-width: $breakpoint-md) {
      grid-template-columns: 6fr 5fr;

      .illustration-panel {
        order: 2;
      }
      .slide-body {
        order: 1;
      }
    }
  }

  &--empty {
    color: $text-muted;
    background: $bg-white;
    align-items: center;
    justify-content: center;
    gap: $spacing-3;
    padding: $spacing-8;
    display: flex;
  }

  .slide-msg {
    font-size: $font-size-sm;
    margin: 0;
  }
}

.illustration-panel {
  position: relative;
  width: 100%;
  min-height: 50%;
  z-index: 0;

  @media (min-width: $breakpoint-md) {
    min-height: 100%;
  }
}

.illustration {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: illEnter $duration-deliberate $easing-emphasized both;
}

@keyframes illEnter {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.slide-body {
  position: relative;
  z-index: 2;
  padding: $spacing-6 $spacing-6 80px;
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  justify-content: flex-end;

  @media (min-width: $breakpoint-md) {
    padding: $spacing-8 $spacing-6 80px;
    justify-content: center;
    gap: $spacing-3;
  }

  &.align--center {
    text-align: center;
    align-items: center;

    @media (min-width: $breakpoint-md) {
      text-align: left;
      align-items: flex-start;
    }
  }
  &.align--left {
    text-align: left;
    align-items: flex-start;
  }
}

.slide-eyebrow {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: $font-bold;
  color: var(--slide-deep);
}

.slide-icon {
  color: var(--slide-deep);
  margin-bottom: $spacing-1;
}

.slide-headline {
  font-size: 2.4rem;
  font-weight: $font-bold;
  margin: 0;
  letter-spacing: -0.025em;
  line-height: 1.05;
  font-variant-numeric: tabular-nums;
  word-break: break-word;
  color: var(--slide-ink);

  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
  @media (min-width: $breakpoint-md) {
    font-size: 3.4rem;
    line-height: 1;
  }
  @media (min-width: $breakpoint-lg) {
    font-size: 4rem;
  }
}

.slide-detail {
  font-size: $font-size-base;
  color: var(--slide-ink);
  opacity: 0.78;
  margin: 0;
  max-width: 30ch;
  line-height: 1.4;

  @media (min-width: $breakpoint-md) {
    font-size: 1.05rem;
    max-width: 36ch;
  }
}

.slide-detail:has(+ .slide-footnote) {
  margin-bottom: $spacing-1;
}

.slide-footnote {
  font-size: $font-size-sm;
  color: var(--slide-deep);
  font-weight: $font-semibold;
  margin: 0;
  letter-spacing: -0.005em;
}
</style>
