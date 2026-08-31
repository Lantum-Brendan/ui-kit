<template>
  <div class="page">
    <h1>TCard</h1>
    <p>Card surface primitive for containing content.</p>

    <section>
      <h2>Basic Card</h2>
      <TCard>
        <h3>Card Title</h3>
        <p>This is a basic card with some content inside.</p>
      </TCard>
    </section>

    <section>
      <h2>Card with Padding Variants</h2>
      <div class="demo-grid">
        <TCard padding="none">
          <div style="padding: 1rem; background: #f3f4f6;">
            <p>No padding (custom padding applied)</p>
          </div>
        </TCard>
        <TCard padding="sm">
          <p>Small padding</p>
        </TCard>
        <TCard>
          <p>Default padding</p>
        </TCard>
        <TCard padding="lg">
          <p>Large padding</p>
        </TCard>
      </div>
    </section>

    <section>
      <h2>Elevated Cards</h2>
      <div class="demo-grid">
        <TCard elevation="0">
          <p>No shadow</p>
        </TCard>
        <TCard elevation="1">
          <p>Elevation 1</p>
        </TCard>
        <TCard elevation="2">
          <p>Elevation 2</p>
        </TCard>
        <TCard elevation="3">
          <p>Elevation 3</p>
        </TCard>
      </div>
    </section>

    <section>
      <h2>Interactive Card</h2>
      <TCard hoverable @click="handleCardClick">
        <h3>Clickable Card</h3>
        <p>Click me! I have hover effects.</p>
        <p v-if="cardClicked">✓ Card clicked!</p>
      </TCard>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cardClicked = ref(false);

const handleCardClick = () => {
  cardClicked.value = true;
  setTimeout(() => {
    cardClicked.value = false;
  }, 2000);
};
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin: 2rem 0;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
