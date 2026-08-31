<template>
  <footer class="story-foot">
    <button
      class="foot-btn foot-btn--text"
      :class="{ 'foot-btn--disabled': currentIndex === 0 }"
      :aria-label="labels.previousSlide"
      @click="$emit('prev')"
    >
      <ChevronLeft :size="18" />
      <span>{{ labels.prev }}</span>
    </button>
    <span class="counter">{{ currentIndex + 1 }} / {{ slides.length }}</span>
    <button
      class="foot-btn"
      :aria-label="paused ? labels.resume : labels.pause"
      @click="$emit('togglePause')"
    >
      <Pause v-if="!paused" :size="14" />
      <Play v-else :size="14" />
    </button>
    <button
      class="foot-btn foot-btn--text foot-btn--cta"
      :aria-label="labels.nextSlide"
      @click="$emit('next')"
    >
      <span>{{ labels.next }}</span>
      <ChevronRight :size="18" />
    </button>
  </footer>
</template>

<script setup>
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-vue-next';

defineProps({
  currentIndex: { type: Number, default: 0 },
  slides: { type: Array, default: () => [] },
  paused: { type: Boolean, default: false },
  labels: { type: Object, default: () => ({}) }
});

defineEmits(['prev', 'next', 'togglePause']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.story-foot {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  z-index: 7;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
}

.counter {
  font-size: 11px;
  color: var(--slide-deep);
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  font-weight: $font-bold;
  letter-spacing: 0.05em;
  padding: 0 $spacing-2;
  min-width: 36px;
  text-align: center;
}

.foot-btn {
  height: 34px;
  min-width: 34px;
  padding: 0;
  border-radius: 999px;
  background: transparent;
  border: none;
  color: var(--slide-deep);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  font-weight: $font-bold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition:
    background $duration-fast $easing-standard,
    transform $duration-fast $easing-standard;

  &--text {
    padding: 0 12px;
  }
  &--cta {
    background: var(--slide-deep);
    color: var(--slide-bg);

    &:hover {
      background: var(--slide-deep);
      filter: brightness(1.1);
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.96);
  }
  &--disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
