<template>
  <div>
    <div class="section-grid">
      <div class="form-group">
        <label class="form-label">{{ labels.defaultLanguage }}</label>
        <select v-if="isEditMode" v-model="languageCode" class="form-select">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.code.toUpperCase() }} - {{ lang.label }}
          </option>
        </select>
        <p v-else class="text-display">{{ languageLabel }}</p>
      </div>

      <div class="form-group">
        <label class="form-label">{{ labels.currentCurrency }}</label>
        <select v-if="isEditMode" v-model="currencyCode" class="form-select">
          <option v-for="c in currencies" :key="c.code" :value="c.code">
            {{ c.code }} - {{ c.label }}
          </option>
        </select>
        <p v-else class="text-display">{{ currencyLabel }}</p>
      </div>
    </div>

    <div v-if="isEditMode" class="actions">
      <button type="button" class="submit-btn" @click="handleSave">
        <Save class="inline-icon" />
        <span>{{ labels.updateGeneralSettings }}</span>
      </button>
      <p v-if="message" class="success-text">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { Save } from 'lucide-vue-next';

const props = defineProps({
  isEditMode: { type: Boolean, default: false },
  initialLanguage: { type: String, default: 'en' },
  initialCurrency: { type: String, default: 'USD' },
  languages: {
    type: Array,
    default: () => [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
      { code: 'fr', label: 'Français' },
      { code: 'de', label: 'Deutsch' },
      { code: 'pt', label: 'Português' },
      { code: 'it', label: 'Italiano' }
    ]
  },
  currencies: {
    type: Array,
    default: () => [
      { code: 'USD', label: 'US Dollar' },
      { code: 'EUR', label: 'Euro' },
      { code: 'GBP', label: 'British Pound' },
      { code: 'CAD', label: 'Canadian Dollar' },
      { code: 'AUD', label: 'Australian Dollar' }
    ]
  },
  message: { type: String, default: '' },
  labels: {
    type: Object,
    default: () => ({
      defaultLanguage: 'Default Language',
      currentCurrency: 'Current Currency',
      updateGeneralSettings: 'Update General Settings'
    })
  }
});

const emit = defineEmits(['save']);

const languageCode = ref(props.initialLanguage);
const currencyCode = ref(props.initialCurrency);

watch(
  () => props.initialLanguage,
  (val) => {
    languageCode.value = val;
  }
);

watch(
  () => props.initialCurrency,
  (val) => {
    currencyCode.value = val;
  }
);

const languageLabel = computed(() => {
  const found = props.languages.find((l) => l.code === languageCode.value);
  return found ? found.label : languageCode.value;
});

const currencyLabel = computed(() => {
  const found = props.currencies.find((c) => c.code === currencyCode.value);
  return found ? found.label : currencyCode.value;
});

const handleSave = () => {
  emit('save', {
    language: languageCode.value,
    currency: currencyCode.value
  });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.section-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.text-display {
  padding: 0.75rem 1rem;
  border-radius: $radius-lg;
  background: $bg-gray;
  color: $text-primary;
  font-weight: $font-medium;
}

.inline-icon {
  width: 18px;
  height: 18px;
}

.actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-text {
  margin-top: 0.75rem;
  color: $primary;
  font-weight: $font-semibold;
}
</style>
