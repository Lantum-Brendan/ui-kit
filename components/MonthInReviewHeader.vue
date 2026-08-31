<template>
  <div v-if="slides.length" class="bars">
    <span
      v-for="(_, i) in slides"
      :key="i"
      class="bar"
      :class="{
        'bar--filled': i < currentIndex,
        'bar--active': i === currentIndex
      }"
    >
      <span
        v-if="i === currentIndex"
        class="bar-fill"
        :class="{ 'bar-fill--paused': paused }"
        :style="{ animationDuration: `${SLIDE_MS}ms` }"
        @animationend="$emit('next')"
      />
    </span>
  </div>

  <header class="story-head">
    <div class="story-id">
      <Calendar :size="14" class="story-dot-icon" />
      <span class="story-month">{{ monthLabel || labels.monthInReview }}</span>
    </div>
    <button class="story-close" :aria-label="labels.close" @click="$emit('close')">
      <X :size="20" />
    </button>
  </header>
</template>

<script setup>
import { X, Calendar } from 'lucide-vue-next';

const SLIDE_MS = 5200;

defineProps({
  slides: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 },
  currentSlide: { type: Object, default: null },
  labels: { type: Object, default: () => ({}) },
  paused: { type: Boolean, default: false },
  monthLabel: { type: String, default: '' }
});

defineEmits(['close', 'prev', 'next', 'togglePause']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.bars {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  gap: 4px;
  z-index: 6;
}

.bar {
  flex: 1;
  height: 3px;
  background: rgba(0, 0, 0, 0.12);
  border-radius: 999px;
  overflow: hidden;
  position: relative;

  &--filled {
    background: var(--slide-deep);
    opacity: 0.85;
  }
}

.bar-fill {
  display: block;
  height: 100%;
  background: var(--slide-deep);
  border-radius: 999px;
  animation: barFill linear forwards;

  &--paused {
    animation-play-state: paused;
  }
}

@keyframes barFill {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.story-head {
  position: absolute;
  top: 30px;
  left: 18px;
  right: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 6;
}

.story-id {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--slide-deep);
}

.story-dot-icon {
  opacity: 0.9;
}

.story-month {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  letter-spacing: -0.005em;
}

.story-close {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: var(--slide-ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: $transition-fast;

  &:hover {
    background: white;
    transform: scale(1.04);
  }
}
</style>
