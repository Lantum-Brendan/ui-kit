<template>
  <TDropdown class="language-selector">
    <template #trigger>
      <button
        class="icon-button"
        :aria-label="currentLanguage.name"
        :title="currentLanguage.name"
      >
        <img :src="currentLanguage.flagUrl" :alt="currentLanguage.name" class="flag-icon" />
      </button>
    </template>

    <div class="language-dropdown-inner">
      <div class="dropdown-header">
        <h3>{{ t('Language') }}</h3>
      </div>
      <div class="language-list">
        <TDropdownItem
          v-for="lang in languages"
          :key="lang.code"
          class="language-item"
          :class="{ active: locale === lang.code }"
          @click="selectLanguage(lang.code)"
        >
          <img :src="lang.flagUrl" :alt="lang.name" class="flag-icon" />
          <span class="language-name">{{ lang.name }}</span>
          <Check v-if="locale === lang.code" class="check-icon" />
        </TDropdownItem>
      </div>
    </div>
  </TDropdown>
</template>

<script setup>
import { computed } from 'vue';
import { Check } from 'lucide-vue-next';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';

const { t, locale, setLocale } = useI18n();

const languages = [
  { code: 'en', name: 'English', flagUrl: '/flags/gb.svg' },
  { code: 'fr', name: 'Français', flagUrl: '/flags/fr.svg' },
  { code: 'de', name: 'Deutsch', flagUrl: '/flags/de.svg' },
  { code: 'es', name: 'Español', flagUrl: '/flags/es.svg' },
  { code: 'pt', name: 'Português', flagUrl: '/flags/pt.svg' },
  { code: 'it', name: 'Italiano', flagUrl: '/flags/it.svg' }
];

const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) || languages[0];
});

const selectLanguage = (code) => {
  setLocale(code);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.language-selector {
  display: inline-block;
}

.flag-icon {
  width: 20px;
  height: 15px;
  border-radius: 2px;
  object-fit: cover;
}

.language-dropdown-inner {
  width: 240px;

  @media (max-width: $breakpoint-sm) {
    width: calc(100vw - 32px);
  }
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid $border-color;

  h3 {
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-semibold;
    color: $text-primary;
  }
}

.language-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 0.25rem 0;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &.active {
    background: rgba(var(--color-primary-rgb), 0.08);
    color: $primary;
    font-weight: $font-semibold;
  }

  .language-name {
    flex: 1;
    text-align: left;
    font-size: $font-size-sm;
  }

  .check-icon {
    width: 16px;
    height: 16px;
    color: $primary;
  }
}
</style>
