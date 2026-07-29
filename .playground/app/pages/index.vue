<template>
  <div class="dashboard">
    <TPanel variant="flat" :padding="0" class="sidebar">
      <div class="sidebar__head">
        <TButton text="ui-kit" variant="text" :full-width="false" :class="{ 'is-active': !selected }" @click="selected = ''" />
        <SearchInput v-model="search" placeholder="Filter components…" :debounce="0" />
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
              <TButton
                v-for="name in group.items"
                :key="name"
                :text="name"
                variant="text"
                :full-width="false"
                :class="{ 'is-active': name === selected }"
                @click="selected = name"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <TButton
            v-for="c in filtered"
            :key="c.name"
            :text="c.name"
            variant="text"
            :full-width="false"
            :class="{ 'is-active': c.name === selected }"
            @click="selected = c.name"
          />
          <p v-if="filtered.length === 0" class="sidebar__empty">No matches</p>
        </template>
      </nav>
    </TPanel>

    <main class="content">
      <header v-if="selected" class="content__bar">
        <div class="content__bar-left">
          <TButton text="← Usage" variant="outline" size="small" :full-width="false" @click="selected = ''" />
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
  border-right: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar__head {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  color: var(--color-text-muted);
  cursor: pointer;
  font-family: inherit;
}

.sidebar__group-head:hover {
  background: var(--color-hover-overlay);
  color: var(--color-text-primary);
}

.sidebar__group-head.is-flash {
  background: var(--color-primary-lighter);
  color: var(--color-primary-dark);
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
  background: var(--color-bg-gray);
  color: var(--color-text-muted);
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

.sidebar__empty {
  padding: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-x: hidden;
  background: var(--color-primary-light);
}

.content__bar {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-white);
}

.content__bar-left {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.content__bar h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

.content__count {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
</style>
