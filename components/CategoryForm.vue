<template>
  <form class="card-form" @submit.prevent="handleSubmit">
    <div class="form-header">
      <h2>{{ isEditing ? labels.editCategory : labels.createCategory }}</h2>
      <button type="button" class="close-btn" @click="handleClose">
        <X />
      </button>
    </div>

    <div class="form-group">
      <label for="category-name" class="form-label">{{ labels.categoryName }}</label>
      <div class="name-icon-row">
        <div class="name-col">
          <input
            id="category-name"
            v-model="form.name"
            type="text"
            class="form-input"
            :class="{ error: nameError || props.apiError }"
            :placeholder="labels.enterCategoryName"
            required
          />
          <div v-if="nameError" class="error-text">{{ labels.categoryNameRequired }}</div>
          <div v-if="props.apiError" class="error-text">{{ props.apiError }}</div>
        </div>
        <div class="icon-col">
          <button
            type="button"
            class="icon-trigger"
            :aria-expanded="showIconPicker"
            :aria-label="labels.chooseIcon"
            @click="showIconPicker = !showIconPicker"
          >
            <component
              :is="selectedIconComponent"
              v-if="selectedIconComponent"
              class="icon-trigger__icon"
            />
            <ImagePlus v-else class="icon-trigger__icon" />
          </button>
        </div>
      </div>

      <div v-if="showIconPicker" class="icon-popover">
        <IconPicker v-model="form.icon" @update:model-value="onIconSelected" />
      </div>
    </div>

    <div class="form-group">
      <label for="category-type" class="form-label">{{ labels.categoryType }}</label>
      <select
        id="category-type"
        v-model="form.type"
        class="form-select"
        :class="{ error: typeError }"
        required
      >
        <option value="">{{ labels.selectType }}</option>
        <option value="income">{{ labels.income }}</option>
        <option value="expense">{{ labels.expense }}</option>
      </select>
      <div v-if="typeError" class="error-text">{{ labels.pleaseSelectType }}</div>
    </div>

    <div class="form-group">
      <label for="category-description" class="form-label">{{ labels.categoryDescription }}</label>
      <textarea
        id="category-description"
        v-model="form.description"
        class="form-textarea"
        :class="{ error: descriptionError }"
        :placeholder="labels.typeCategoryDescription"
        rows="5"
        required
      />
      <div v-if="descriptionError" class="error-text">
        {{ labels.categoryDescriptionRequired }}
      </div>
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="handleClose">
        {{ labels.cancel }}
      </button>
      <button type="submit" class="btn btn-primary" :disabled="props.isSubmitting">
        {{ isEditing ? labels.updateCategory : labels.createCategory }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import IconPicker from './IconPicker.vue';
import * as lucideIcons from 'lucide-vue-next';
import { ImagePlus, X } from 'lucide-vue-next';

const props = defineProps({
  pageName: {
    type: String,
    required: true
  },
  editingItem: {
    type: Object,
    default: null
  },
  apiError: {
    type: String,
    default: ''
  },
  isSubmitting: {
    type: Boolean,
    default: false
  },
  labels: {
    type: Object,
    default: () => ({
      editCategory: 'Edit Category',
      createCategory: 'Create Category',
      categoryName: 'Category Name',
      enterCategoryName: 'Enter category name',
      categoryNameRequired: 'Category name is required.',
      chooseIcon: 'Choose icon',
      categoryType: 'Category Type',
      selectType: 'Select type',
      income: 'Income',
      expense: 'Expense',
      pleaseSelectType: 'Please select a category type.',
      categoryDescription: 'Category Description',
      typeCategoryDescription: 'Type category description here...',
      categoryDescriptionRequired: 'Category description is required.',
      cancel: 'Cancel',
      updateCategory: 'Update Category'
    })
  }
});

const emit = defineEmits(['created', 'updated', 'close']);

const form = ref({
  name: '',
  icon: '',
  type: '',
  description: ''
});

const nameError = ref(false);
const typeError = ref(false);
const descriptionError = ref(false);
const showIconPicker = ref(false);

const selectedIconComponent = computed(() => {
  const key = form.value.icon;
  if (key && typeof lucideIcons[key] === 'function') {
    return lucideIcons[key];
  }
  return null;
});

const isEditing = computed(() => !!props.editingItem);

// Watch for editing item changes and populate form
watch(
  () => props.editingItem,
  (newEditingItem) => {
    if (newEditingItem) {
      // Extract icon value - could be from icon.path, icon.content, or direct icon value
      let iconValue = '';
      if (newEditingItem.icon) {
        if (typeof newEditingItem.icon === 'string') {
          iconValue = newEditingItem.icon;
        } else if (newEditingItem.icon.path) {
          iconValue = newEditingItem.icon.path;
        } else if (newEditingItem.icon.content) {
          iconValue = newEditingItem.icon.content;
        }
      }

      form.value = {
        name: newEditingItem.name || '',
        icon: iconValue,
        type: newEditingItem.type || '',
        description: newEditingItem.description || ''
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.value = { name: '', icon: '', type: '', description: '' };
  nameError.value = false;
  typeError.value = false;
  descriptionError.value = false;
  showIconPicker.value = false;
}

function validateForm() {
  let isValid = true;

  // Reset errors
  nameError.value = false;
  typeError.value = false;
  descriptionError.value = false;

  // Validate name
  if (!form.value.name || form.value.name.trim() === '') {
    nameError.value = true;
    isValid = false;
  }

  // Validate type
  if (!form.value.type || form.value.type.trim() === '') {
    typeError.value = true;
    isValid = false;
  }

  // Validate description
  if (!form.value.description || form.value.description.trim() === '') {
    descriptionError.value = true;
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (props.isSubmitting) {
    return;
  }

  // Validate all fields
  if (!validateForm()) {
    return;
  }

  const formData = {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    type: form.value.type
  };
  if (form.value.icon && form.value.icon.trim() !== '') {
    formData.icon = form.value.icon;
    formData.icon_type = 'image';
  }

  if (isEditing.value) {
    const updatedItem = {
      id: props.editingItem.id,
      ...formData
    };
    emit('updated', updatedItem);
    return;
  }

  emit('created', formData);
}

function onIconSelected() {
  showIconPicker.value = false;
}

function handleClose() {
  emit('close');
  resetForm();
}
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;
</style>
