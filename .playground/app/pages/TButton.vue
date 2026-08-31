<template>
  <div class="page">
    <h1>TButton</h1>
    <p>Button primitive with multiple variants and states.</p>

    <section>
      <h2>Variants</h2>
      <div class="demo-row">
        <TButton text="Primary" variant="primary" />
        <TButton text="Secondary" variant="secondary" />
        <TButton text="Ghost" variant="ghost" />
        <TButton text="Danger" variant="danger" />
      </div>
    </section>

    <section>
      <h2>Sizes</h2>
      <div class="demo-row">
        <TButton text="Small" size="sm" />
        <TButton text="Medium (default)" />
        <TButton text="Large" size="lg" />
      </div>
    </section>

    <section>
      <h2>With Icons</h2>
      <div class="demo-row">
        <TButton text="With Icon" icon="plus" variant="primary" />
        <TButton text="Icon Right" icon="arrow-right" icon-position="right" variant="secondary" />
      </div>
    </section>

    <section>
      <h2>States</h2>
      <div class="demo-row">
        <TButton text="Loading" :loading="true" variant="primary" />
        <TButton text="Disabled" :disabled="true" variant="primary" />
        <TButton text="Full Width" full-width variant="primary" />
      </div>
    </section>

    <section>
      <h2>Interactive Demo</h2>
      <div class="demo-row">
        <TButton text="Click me" variant="primary" @click="handleClick" />
        <p v-if="clickCount > 0">Clicked {{ clickCount }} times</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const clickCount = ref(0);

const handleClick = () => {
  clickCount.value++;
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
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}
</style>
