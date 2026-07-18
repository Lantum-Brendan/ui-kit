<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="sidebar__head">
        <button class="sidebar__brand" :class="{ 'is-active': !selected }" @click="selected = ''">
          ui-kit
        </button>
        <input
          v-model="search"
          class="sidebar__search"
          type="search"
          placeholder="Filter components…"
        />
      </div>
      <nav class="sidebar__list">
        <template v-if="!search">
          <div v-for="group in groups" :key="group.label" class="sidebar__group">
            <button class="sidebar__group-head" @click="toggle(group.label)">
              <span class="sidebar__caret" :class="{ 'is-open': open.has(group.label) }">▸</span>
              {{ group.label }}
              <span class="sidebar__group-count">{{ group.items.length }}</span>
            </button>
            <div v-show="open.has(group.label)" class="sidebar__group-items">
              <button
                v-for="name in group.items"
                :key="name"
                class="sidebar__item"
                :class="{ 'is-active': name === selected }"
                @click="selected = name"
              >
                {{ name }}
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <button
            v-for="c in filtered"
            :key="c.name"
            class="sidebar__item"
            :class="{ 'is-active': c.name === selected }"
            @click="selected = c.name"
          >
            {{ c.name }}
          </button>
          <p v-if="filtered.length === 0" class="sidebar__empty">No matches</p>
        </template>
      </nav>
    </aside>

    <main class="content">
      <header v-if="selected" class="content__bar">
        <div class="content__bar-left">
          <button class="content__back" @click="selected = ''">← Usage</button>
          <h2>{{ selected }}</h2>
        </div>
        <span class="content__count">{{ components.length }} components</span>
      </header>
      <DashboardMain :selected="selected" @select-category="focusCategory" />
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { components, categories } from '../registry';
import DashboardMain from '../components/DashboardMain.vue';

const selected = ref('');
const search = ref('');

// All groups expanded by default.
const open = ref(new Set(categories.map((c) => c.label)));
const toggle = (label) => {
  const next = new Set(open.value);
  next.has(label) ? next.delete(label) : next.add(label);
  open.value = next;
};

// Jump from a usage-landing category card to its sidebar group.
const focusCategory = (label) => {
  search.value = '';
  open.value = new Set([...open.value, label]);
  selected.value = '';
  requestAnimationFrame(() => {
    const head = Array.from(document.querySelectorAll('.sidebar__group-head'))
      .find((h) => h.textContent.includes(label));
    if (head) {
      head.scrollIntoView({ behavior: 'smooth', block: 'center' });
      head.classList.add('is-flash');
      setTimeout(() => head.classList.remove('is-flash'), 1200);
    }
  });
};

const groups = categories;

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return components;
  return components.filter((c) => c.name.toLowerCase().includes(q));
});
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.sidebar {
  border-right: 1px solid #1f5e42;
  background: #047844;
  background: linear-gradient(180deg, #05824c 0%, #047844 60%, #036a3c 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  color: #eafaf2;
}

.sidebar__head {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar__brand {
  text-align: left;
  border: none;
  background: transparent;
  padding: 0.4rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  letter-spacing: 0.02em;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar__brand:hover {
  background: rgba(122, 196, 165, 0.22);
}

.sidebar__brand.is-active {
  background: #a7e8c9;
  color: #06402a;
}

.sidebar__search {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-family: inherit;
}

.sidebar__search::placeholder {
  color: rgba(234, 250, 242, 0.7);
}

.sidebar__search:focus {
  outline: none;
  border-color: #7ac4a5;
  background: rgba(255, 255, 255, 0.2);
}

.sidebar__list {
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__group {
  display: flex;
  flex-direction: column;
}

.sidebar__group-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 0.5rem 0.6rem;
  border-radius: 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #a7e8c9;
  cursor: pointer;
  font-family: inherit;
}

.sidebar__group-head:hover {
  background: rgba(122, 196, 165, 0.18);
  color: #ffffff;
}

.sidebar__group-head.is-flash {
  background: #a7e8c9;
  color: #06402a;
  transition: background 0.2s ease;
}

.sidebar__caret {
  display: inline-block;
  transition: transform 0.15s ease;
  font-size: 0.7rem;
}

.sidebar__caret.is-open {
  transform: rotate(90deg);
}

.sidebar__group-count {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.16);
  color: #eafaf2;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
}

.sidebar__group-items {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px 0 6px;
}

.sidebar__item {
  text-align: left;
  border: none;
  background: transparent;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #d7f2e6;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar__item:hover {
  background: rgba(122, 196, 165, 0.22);
  color: #ffffff;
}

.sidebar__item.is-active {
  background: #a7e8c9;
  color: #06402a;
  font-weight: 600;
}

.sidebar__empty {
  padding: 0.75rem;
  font-size: 0.875rem;
  color: rgba(234, 250, 242, 0.7);
}

.content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #f1f8f4;
}

.content__bar {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid #d4e9df;
  background: #ffffff;
}

.content__bar-left {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.content__back {
  border: 1px solid #047844;
  background: transparent;
  color: #047844;
  border-radius: 0.45rem;
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.content__back:hover {
  background: #f1f8f4;
}

.content__bar h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #047844;
}

.content__count {
  font-size: 0.8rem;
  color: #4a7a64;
}
</style>
