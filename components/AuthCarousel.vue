<template>
  <div class="login-sidebar">
    <div class="sidebar-content">
      <div class="carousel-slide">
        <div
          class="slide-image-wrapper"
          :class="{ 'slide-image-wrapper--art': currentSlideData.image }"
        >
          <transition name="fade" mode="out-in">
            <img
              v-if="currentSlideData.image"
              :key="`art-${currentSlide}`"
              :src="currentSlideData.image"
              class="slide-art"
              alt=""
            />
            <component
              v-else-if="currentSlideData.icon"
              :is="currentSlideData.icon"
              :key="currentSlide"
              class="slide-icon"
            />
          </transition>
        </div>
        <div class="sidebar-text">
          <transition name="fade" mode="out-in">
            <div :key="currentSlide" class="text-content">
              <h2>{{ currentSlideData.title }}</h2>
              <p>{{ currentSlideData.text }}</p>
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
  slides: {
    type: Array,
    default: () => []
  }
});

const currentSlide = ref(0);

const currentSlideData = computed(() => props.slides[currentSlide.value] || { title: '', text: '' });

let slideInterval;

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length;
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
  align-items: center;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px -24px rgba(0, 0, 0, 0.4);

  &--art {
    background: radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.16), transparent 65%);
    border: none;
    box-shadow: none;
    width: 280px;
    height: 240px;
  }
}

.slide-icon {
  width: 120px;
  height: 120px;
  color: #fff;
}

.slide-art {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: 50% 90%;
  animation: funky-bob 3.6s ease-in-out infinite;
}

@keyframes funky-bob {
  0% {
    transform: translateY(0) rotate(-4deg) scale(1);
  }
  30% {
    transform: translateY(-16px) rotate(3deg) scale(1.03);
  }
  55% {
    transform: translateY(-6px) rotate(-2deg) scale(1);
  }
  80% {
    transform: translateY(-12px) rotate(4deg) scale(1.02);
  }
  100% {
    transform: translateY(0) rotate(-4deg) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide-art {
    animation: none;
  }
}

.sidebar-text {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 200px;
  text-align: center;

  .text-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 90%;

    h2 {
      font-size: 2.75rem;
      font-weight: 700;
      color: $primary;
      margin: 0;
      line-height: 1.1;
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
    background-color: $primary;
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
