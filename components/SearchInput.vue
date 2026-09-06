<template>
  <div class="search-container">
    <TInput
      :model-value="internalValue"
      :placeholder="placeholder"
      size="small"
      class="search-input-field"
      @update:model-value="handleInput"
    >
      <template #prefix>
        <LucideSearch class="search-icon" />
      </template>
    </TInput>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Search as LucideSearch } from 'lucide-vue-next';
import TInput from './TInput.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  debounce: {
    type: Number,
    default: 300
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);
let debounceTimeout;

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const handleInput = (val) => {
  internalValue.value = val;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    emit('update:modelValue', val);
  }, props.debounce);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  color: $text-muted;
  width: 14px;
  height: 14px;
  pointer-events: none;
}

.search-input-field {
  width: 160px;
  transition: width 0.2s ease, border-color 0.2s ease;

  &:focus-within {
    width: 200px;
  }

  @media (max-width: $breakpoint-sm) {
    width: 100%;

    &:focus-within {
      width: 100%;
    }
  }
}
</style>
