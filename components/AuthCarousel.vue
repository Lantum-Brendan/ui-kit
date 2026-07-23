<template>
  <div class="login-sidebar">
    <div class="sidebar-content">
      <div class="carousel-slide">
        <div class="slide-image-wrapper">
          <slot name="image" class="carousel-image">
            <div class="carousel-image">
              <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="20" width="240" height="240" rx="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <path d="M80 180L130 130L170 170L220 100L280 160" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="130" cy="130" r="6" fill="rgba(255,255,255,0.6)"/>
                <circle cx="170" cy="170" r="6" fill="rgba(255,255,255,0.6)"/>
                <circle cx="220" cy="100" r="6" fill="rgba(255,255,255,0.6)"/>
                <circle cx="280" cy="160" r="6" fill="rgba(255,255,255,0.6)"/>
                <rect x="60" y="40" width="80" height="8" rx="4" fill="rgba(255,255,255,0.15)"/>
                <rect x="60" y="56" width="120" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
              </svg>
            </div>
          </slot>
        </div>
        <div class="sidebar-text">
          <transition name="fade" mode="out-in">
            <div v-if="slides[currentSlide]" :key="currentSlide" class="text-content">
              <h2>{{ slides[currentSlide].title }}</h2>
              <p>{{ slides[currentSlide].text }}</p>
            </div>
          </transition>
        </div>
        <div class="carousel-dots">
          <span
            v-for="(slide, index) in slides"
            :key="index"
            :class="['dot', { active: currentSlide === index }]"
            @click="currentSlide = index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  labels: {
    type: Object,
    default: () => ({
      simple: { title: 'Simple money tracking', text: 'Track your income and expenses in one place with zero fuss.' },
      automated: { title: 'Automated insights', text: 'Let Trakli categorize and summarize your finances for you.' },
      opensource: { title: 'Open source', text: 'Your financial data stays yours. Built in the open.' }
    })
  }
});

const currentSlide = ref(0);

const slides = computed(() => [
  {
    title: props.labels.simple.title,
    text: props.labels.simple.text
  },
  {
    title: props.labels.automated.title,
    text: props.labels.automated.text
  },
  {
    title: props.labels.opensource.title,
    text: props.labels.opensource.text
  }
]);

let slideInterval;

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }, 5000);
};

onMounted(startSlideShow);
onBeforeUnmount(() => clearInterval(slideInterval));
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;

.login-sidebar {
  flex: 1;
  display: flex;
  align-items: center; // ✅ Center horizontally
  justify-content: center; // ✅ Center vertically
  padding: 2rem 3rem;
  min-width: 480px;
  color: white;
}

.sidebar-content {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.slide-image-wrapper {
  width: 65%;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 16/15;

  .carousel-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

.sidebar-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  overflow: hidden;
  text-align: center;

  .text-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 80%;

    h2 {
      font-size: 3.5rem;
      font-weight: 700;
      color: $accent-color;
      margin: 0;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;

  &.active {
    background-color: $accent-color;
  }
}

// Fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
