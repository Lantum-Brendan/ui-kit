<template>
  <div class="login-sidebar">
    <div class="sidebar-content">
      <div class="carousel-slide">
        <div class="slide-image-wrapper">
          <div class="carousel-image" />
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
    background: url('/floating-docs-man.svg') no-repeat center;
    background-size: contain;
    opacity: 0.9;
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
