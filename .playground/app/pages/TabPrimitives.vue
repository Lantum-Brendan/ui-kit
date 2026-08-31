<template>
  <div class="page">
    <h1>Tab Primitives</h1>
    <p>Tab components with multiple variants and features.</p>

    <section>
      <h2>TTabList with TTabPanel (Pill Variant)</h2>
      <TCard>
        <TTabList v-model="activeTab1" :tabs="basicTabs" variant="pill" />
        <TTabPanel value="tab1" :active-value="activeTab1">
          <div class="panel-content">
            <h3>Tab 1 Content</h3>
            <p>This is the content for the first tab.</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab2" :active-value="activeTab1">
          <div class="panel-content">
            <h3>Tab 2 Content</h3>
            <p>This is the content for the second tab.</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab3" :active-value="activeTab1">
          <div class="panel-content">
            <h3>Tab 3 Content</h3>
            <p>This is the content for the third tab.</p>
          </div>
        </TTabPanel>
      </TCard>
    </section>

    <section>
      <h2>Underline Variant</h2>
      <TCard>
        <TTabList v-model="activeTab2" :tabs="basicTabs" variant="underline" />
        <TTabPanel value="tab1" :active-value="activeTab2">
          <div class="panel-content">
            <p>Underline style content 1</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab2" :active-value="activeTab2">
          <div class="panel-content">
            <p>Underline style content 2</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab3" :active-value="activeTab2">
          <div class="panel-content">
            <p>Underline style content 3</p>
          </div>
        </TTabPanel>
      </TCard>
    </section>

    <section>
      <h2>Indicator Variant</h2>
      <TCard>
        <TTabList v-model="activeTab3" :tabs="basicTabs" variant="indicator" />
        <TTabPanel value="tab1" :active-value="activeTab3">
          <div class="panel-content">
            <p>Indicator style content 1</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab2" :active-value="activeTab3">
          <div class="panel-content">
            <p>Indicator style content 2</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab3" :active-value="activeTab3">
          <div class="panel-content">
            <p>Indicator style content 3</p>
          </div>
        </TTabPanel>
      </TCard>
    </section>

    <section>
      <h2>Tabs with Icons</h2>
      <TCard>
        <TTabList v-model="activeTab4" :tabs="iconTabs" variant="pill" />
        <TTabPanel value="home" :active-value="activeTab4">
          <div class="panel-content">
            <h3>🏠 Home</h3>
            <p>Welcome home!</p>
          </div>
        </TTabPanel>
        <TTabPanel value="profile" :active-value="activeTab4">
          <div class="panel-content">
            <h3>👤 Profile</h3>
            <p>Your profile information</p>
          </div>
        </TTabPanel>
        <TTabPanel value="settings" :active-value="activeTab4">
          <div class="panel-content">
            <h3>⚙️ Settings</h3>
            <p>Adjust your settings</p>
          </div>
        </TTabPanel>
      </TCard>
    </section>

    <section>
      <h2>Tabs with Count Badges</h2>
      <TCard>
        <TTabList v-model="activeTab5" :tabs="countTabs" variant="pill" />
        <TTabPanel value="all" :active-value="activeTab5">
          <div class="panel-content">
            <p>All items ({{ countTabs[0].count }})</p>
          </div>
        </TTabPanel>
        <TTabPanel value="active" :active-value="activeTab5">
          <div class="panel-content">
            <p>Active items ({{ countTabs[1].count }})</p>
          </div>
        </TTabPanel>
        <TTabPanel value="completed" :active-value="activeTab5">
          <div class="panel-content">
            <p>Completed items ({{ countTabs[2].count }})</p>
          </div>
        </TTabPanel>
      </TCard>
    </section>

    <section>
      <h2>Keyboard Navigation</h2>
      <TCard>
        <p class="hint">Use arrow keys to navigate between tabs</p>
        <TTabList v-model="activeTab6" :tabs="basicTabs" variant="pill" />
        <TTabPanel value="tab1" :active-value="activeTab6">
          <div class="panel-content">
            <p>Use ← → arrow keys to navigate</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab2" :active-value="activeTab6">
          <div class="panel-content">
            <p>Press Home to go to first tab</p>
          </div>
        </TTabPanel>
        <TTabPanel value="tab3" :active-value="activeTab6">
          <div class="panel-content">
            <p>Press End to go to last tab</p>
          </div>
        </TTabPanel>
      </TCard>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab1 = ref('tab1');
const activeTab2 = ref('tab1');
const activeTab3 = ref('tab1');
const activeTab4 = ref('home');
const activeTab5 = ref('all');
const activeTab6 = ref('tab1');

const basicTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' }
];

const iconTabs = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' }
];

const countTabs = [
  { id: 'all', label: 'All', count: 42 },
  { id: 'active', label: 'Active', count: 15 },
  { id: 'completed', label: 'Completed', count: 27 }
];
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

.panel-content {
  padding: 1.5rem 0;
}

.hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}
</style>
