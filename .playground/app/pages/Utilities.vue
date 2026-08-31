<template>
  <div class="page">
    <h1>Utility Components</h1>
    <p>Utility primitives for common UI patterns.</p>

    <section>
      <h2>LoadingSkeleton</h2>
      <p>Loading placeholder animations</p>
      <TCard>
        <LoadingSkeleton type="text" />
        <LoadingSkeleton type="text" width="80%" />
        <LoadingSkeleton type="rect" height="200px" />
        <LoadingSkeleton type="circle" size="60px" />
      </TCard>
    </section>

    <section>
      <h2>SearchInput</h2>
      <p>Search input with icon</p>
      <TCard>
        <SearchInput
          v-model="searchQuery"
          placeholder="Search anything..."
          @update:model-value="handleSearch"
        />
        <p v-if="searchQuery">Searching for: {{ searchQuery }}</p>
      </TCard>
    </section>

    <section>
      <h2>ThemeToggleButton</h2>
      <p>Toggle between light and dark themes</p>
      <TCard>
        <ThemeToggleButton />
        <p>Click to toggle theme</p>
      </TCard>
    </section>

    <section>
      <h2>ThemeSelector</h2>
      <p>Dropdown theme selector</p>
      <TCard>
        <ThemeSelector />
      </TCard>
    </section>

    <section>
      <h2>TypingDots</h2>
      <p>Animated typing indicator</p>
      <TCard>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span>Someone is typing</span>
          <TypingDots />
        </div>
      </TCard>
    </section>

    <section>
      <h2>ViewToggle</h2>
      <p>Toggle between list and grid views</p>
      <TCard>
        <ViewToggle v-model="viewMode" />
        <p>Current view: {{ viewMode }}</p>
        <div v-if="viewMode === 'grid'" class="demo-grid">
          <div class="demo-item">Grid 1</div>
          <div class="demo-item">Grid 2</div>
          <div class="demo-item">Grid 3</div>
          <div class="demo-item">Grid 4</div>
        </div>
        <div v-else class="demo-list">
          <div class="demo-item">List Item 1</div>
          <div class="demo-item">List Item 2</div>
          <div class="demo-item">List Item 3</div>
          <div class="demo-item">List Item 4</div>
        </div>
      </TCard>
    </section>

    <section>
      <h2>HamburgerMenu</h2>
      <p>Animated hamburger menu icon</p>
      <TCard>
        <HamburgerMenu :is-open="menuOpen" @toggle="menuOpen = !menuOpen" />
        <p>Menu is {{ menuOpen ? 'open' : 'closed' }}</p>
      </TCard>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const viewMode = ref('grid');
const menuOpen = ref(false);

const handleSearch = (value) => {
  searchQuery.value = value;
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.demo-item {
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 6px;
  text-align: center;
}
</style>
