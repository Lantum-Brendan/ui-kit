<template>
  <TFormRow :cols="2">
    <TFormField :label="labels.group" field-id="txn-group" :error="categoryError ? labels.groupError : ''">
      <SearchableDropdown
        :model-value="groupSearchQuery"
        :label="labels.group"
        :placeholder="labels.searchGroup"
        :options="groups"
        :error="categoryError ? labels.groupError : ''"
        @update:modelValue="$emit('update:groupSearchQuery', $event)"
        @select="handleGroupSelect"
        @clear="$emit('clear:group')"
      />
      <span v-if="isGroupDefault" class="group-default-indicator" :title="labels.defaultGroup">{{ labels.default }}</span>
    </TFormField>
    <TFormField :label="labels.categories" field-id="txn-cats">
      <SearchableDropdown
        :model-value="categorySearchQuery"
        :label="labels.categories"
        :placeholder="labels.searchCategories"
        :options="categories"
        :multiple="true"
        :selected="selectedAdditionalCategoryIds"
        @update:modelValue="$emit('update:categorySearchQuery', $event)"
        @select="handleCategorySelect"
      />
    </TFormField>
  </TFormRow>
</template>

<script setup>
import TFormRow from './TFormRow.vue';
import TFormField from './TFormField.vue';
import SearchableDropdown from './SearchableDropdown.vue';

const props = defineProps({
  groups: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  groupSearchQuery: { type: String, default: '' },
  categorySearchQuery: { type: String, default: '' },
  selectedGroupId: { type: [Number, String], default: null },
  selectedAdditionalCategoryIds: { type: Array, default: () => [] },
  labels: { type: Object, default: () => ({}) },
  categoryError: { type: [Boolean, String], default: false },
  isGroupDefault: { type: Boolean, default: false }
});

const emit = defineEmits(['update:groupSearchQuery', 'update:categorySearchQuery', 'update:selectedGroupId', 'update:selectedAdditionalCategoryIds', 'select:group', 'select:category', 'clear:group', 'selectGroup', 'selectCategory']);

function handleGroupSelect(group) {
  emit('update:selectedGroupId', group.id);
  emit('select:group', group);
  emit('selectGroup', group);
}

function handleCategorySelect(ids) {
  emit('update:selectedAdditionalCategoryIds', ids);
  emit('select:category', ids);
  emit('selectCategory', ids);
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.group-default-indicator {
  position: absolute;
  top: 0;
  right: 0;
  font-size: $font-size-xs;
  color: $primary;
  font-weight: $font-medium;
  background: $primary-light;
  padding: 2px 6px;
  border-radius: $radius-sm;
}
</style>
