<template>
  <div class="usage">
    <header class="usage__head">
      <div class="usage__badge">Vue 3 · Nuxt layer</div>
      <h1 class="usage__title">@trakli/ui-kit</h1>
      <p class="usage__tagline">
        A Vue 3 + Nuxt component library for building personal-finance and
        budgeting apps — accounts, transactions, budgets, charts, and the
        surrounding UI, ready to drop in.
      </p>
    </header>

    <div class="usage__keypoints">
      <div class="keypoint keypoint--primary">
        <span class="keypoint__k">101 components</span>
        <span class="keypoint__v">buttons, cards, tables, charts, forms &amp; modals — all live-previewable from the sidebar.</span>
      </div>
      <div class="keypoint">
        <span class="keypoint__k">Drop-in layer</span>
        <span class="keypoint__v">extends your Nuxt config — components &amp; tokens auto-import, no manual wiring.</span>
      </div>
      <div class="keypoint">
        <span class="keypoint__k">The explorer is the docs</span>
        <span class="keypoint__v">click any component to see it rendered with correct sample data &amp; props.</span>
      </div>
    </div>

    <section class="usage__block">
      <h2>What's inside</h2>
      <p>
        {{ total }} components across {{ categories.length }} areas. Every one is
        live-previewable from the sidebar — click any name to see it rendered
        with realistic sample data.
      </p>
      <div class="usage__cats">
        <button
          v-for="cat in categories"
          :key="cat.label"
          class="usage__cat"
          type="button"
          @click="$emit('select-category', cat.label)"
        >
          <h3>{{ cat.label }}</h3>
          <ul>
            <li v-for="item in cat.items" :key="item">{{ item }}</li>
          </ul>
          <span class="usage__cat-go">{{ cat.items.length }} →</span>
        </button>
      </div>
    </section>

    <section class="usage__block">
      <h2>Install</h2>
      <pre class="usage__code"><code># npm
npm install @trakli/ui-kit

# pnpm
pnpm add @trakli/ui-kit</code></pre>
    </section>

    <section class="usage__block">
      <h2>Register the layer</h2>
      <p>
        The kit ships as a Nuxt <strong>layer</strong>, so it brings its own
        components, composables, and design tokens. Add it to your project's
        <code>extends</code>:
      </p>
      <pre class="usage__code"><code>// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@trakli/ui-kit']
});</code></pre>
    </section>

    <section class="usage__block">
      <h2>Use a component</h2>
      <p>
        Components are auto-imported — no <code>import</code> statements needed.
        Most accept a plain object (e.g. a <code>wallet</code>, <code>budget</code>,
        or <code>party</code>) plus an optional <code>labels</code> object for
        copy:
      </p>
      <pre class="usage__code"><code>&lt;template&gt;
  &lt;TButton text="Get started" variant="primary" /&gt;
  &lt;TContainer&gt;
    &lt;TCard title="Balance"&gt;$1,240.00&lt;/TCard&gt;
  &lt;/TContainer&gt;
&lt;/template&gt;</code></pre>
    </section>

    <section class="usage__block">
      <h2>Theme &amp; tokens</h2>
      <p>
        Styling is driven by CSS custom properties and SCSS tokens
        (<code>$primary</code>, <code>$border-light</code>, …). Override the
        tokens in your own stylesheet to re-skin the kit — no component edits
        required.
      </p>
    </section>

    <section class="usage__callout">
      <span class="usage__callout-tag">Don't skip this</span>
      <div>
        <strong>Components need data.</strong>
        Many (tables, cards, charts) require a specific object shape — dropping
        them in empty will throw. The sidebar explorer renders every component
        with correct sample data, so it doubles as living documentation: use it
        to discover the exact props each one expects.
      </div>
    </section>

    <p class="usage__hint">Pick a component from the sidebar to preview it →</p>
  </div>
</template>

<script setup>
import { components, categories } from '../registry';

defineOptions({ name: 'UsageLanding' });

const emit = defineEmits(['select-category']);

const total = components.length;
</script>

<style scoped>
.usage {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 3rem 3rem;
  color: #06402a;
}

.usage__head {
  margin-bottom: 1.75rem;
}

.usage__badge {
  display: inline-block;
  background: #047844;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  margin-bottom: 0.9rem;
}

.usage__title {
  font-size: 2.6rem;
  font-weight: 800;
  margin: 0;
  color: #047844;
  letter-spacing: -0.02em;
}

.usage__tagline {
  font-size: 1.15rem;
  color: #2f5a48;
  margin: 0.6rem 0 0;
  line-height: 1.55;
  max-width: 60ch;
}

.usage__keypoints {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 2.25rem;
}

.keypoint {
  background: #ffffff;
  border: 1px solid #cfe5da;
  border-radius: 0.7rem;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.keypoint--primary {
  background: #047844;
  border-color: #047844;
}

.keypoint--primary .keypoint__k,
.keypoint--primary .keypoint__v {
  color: #ffffff;
}

.keypoint__k {
  font-size: 0.95rem;
  font-weight: 700;
  color: #047844;
}

.keypoint__v {
  font-size: 0.85rem;
  color: #2f5a48;
  line-height: 1.45;
}

.usage__block {
  margin-bottom: 1.75rem;
}

.usage__block h2 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
  color: #047844;
}

.usage__block p {
  color: #2f5a48;
  line-height: 1.5;
  margin: 0 0 0.6rem;
}

.usage__block code {
  background: #eef6f1;
  padding: 0.1rem 0.35rem;
  border-radius: 0.3rem;
  font-size: 0.875em;
}

.usage__code {
  background: #ffffff;
  color: #0c2a1e;
  border: 1px solid #cfe5da;
  padding: 1rem 1.25rem;
  border-radius: 0.6rem;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.55;
}

.usage__cats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem 1.5rem;
  margin-top: 0.75rem;
}

.usage__cat {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: #ffffff;
  border: 1px solid #cfe5da;
  border-radius: 0.6rem;
  padding: 0.85rem 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}

.usage__cat:hover {
  border-color: #047844;
  box-shadow: 0 2px 10px rgba(4, 120, 68, 0.12);
  transform: translateY(-1px);
}

.usage__cat h3 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #047844;
  margin: 0;
}

.usage__cat ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.usage__cat li {
  font-size: 0.78rem;
  color: #2f5a48;
  padding: 0.08rem 0;
}

.usage__cat-go {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #047844;
}

.usage__callout {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #fff6e6;
  border: 1px solid #f3d28a;
  border-left: 5px solid #d99a18;
  border-radius: 0.6rem;
  padding: 1rem 1.25rem;
  color: #5c4310;
  font-size: 0.92rem;
  line-height: 1.55;
  margin: 1.75rem 0;
}

.usage__callout-tag {
  flex-shrink: 0;
  background: #d99a18;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
}

.usage__callout strong {
  color: #7a4f00;
}

.usage__hint {
  margin-top: 1.5rem;
  color: #4a7a64;
  font-size: 0.9rem;
}
</style>
