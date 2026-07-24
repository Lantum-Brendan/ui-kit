<template>
  <TForm
    :title="isEditing ? labels.editCategory : labels.createCategory"
    :api-error="props.apiError"
    :is-submitting="props.isSubmitting"
    :submit-label="isEditing ? labels.updateCategory : labels.createCategory"
    :cancel-label="labels.cancel"
    @submit="handleSubmit"
    @close="handleClose"
  >
    <TFormField
      :label="labels.categoryName"
      field-id="category-name"
      :error="nameError ? labels.categoryNameRequired : ''"
      required
    >
      <div class="name-icon-row">
        <TFormInput
          id="category-name"
          v-model="form.name"
          :placeholder="labels.enterCategoryName"
          :error="nameError || !!props.apiError"
        />
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
    </TFormField>

    <TFormField
      :label="labels.categoryType"
      field-id="category-type"
      :error="typeError ? labels.pleaseSelectType : ''"
      required
    >
      <TFormSelect
        id="category-type"
        v-model="form.type"
        :options="typeOptions"
        :error="typeError"
      />
    </TFormField>

    <TFormField
      :label="labels.categoryDescription"
      field-id="category-description"
      :error="descriptionError ? labels.categoryDescriptionRequired : ''"
      required
    >
      <TFormTextarea
        id="category-description"
        v-model="form.description"
        :placeholder="labels.typeCategoryDescription"
        :rows="4"
        :error="descriptionError"
      />
    </TFormField>
  </TForm>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TForm from './TForm.vue';
import TFormField from './TFormField.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import TFormTextarea from './TFormTextarea.vue';
import IconPicker from './IconPicker.vue';
import { useLucideIcon } from '../composables/useLucideIcon';
import { ImagePlus } from 'lucide-vue-next';

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

const selectedIconComponent = useLucideIcon(computed(() => form.value.icon));
const isEditing = computed(() => !!props.editingItem);

const typeOptions = computed(() => [
  { label: props.labels.selectType, value: '' },
  { label: props.labels.income, value: 'income' },
  { label: props.labels.expense, value: 'expense' }
]);

watch(
  () => props.editingItem,
  (newEditingItem) => {
    if (newEditingItem) {
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
  nameError.value = false;
  typeError.value = false;
  descriptionError.value = false;

  if (!form.value.name || form.value.name.trim() === '') {
    nameError.value = true;
    isValid = false;
  }

  if (!form.value.type || form.value.type.trim() === '') {
    typeError.value = true;
    isValid = false;
  }

  if (!form.value.description || form.value.description.trim() === '') {
    descriptionError.value = true;
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (props.isSubmitting || !validateForm()) return;

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
    emit('updated', {
      id: props.editingItem.id,
      ...formData
    });
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

.name-icon-row {
  display: flex;
  gap: $spacing-2;
  align-items: center;
}

.icon-col {
  flex-shrink: 0;
}

.icon-trigger {
  width: 42px;
  height: 42px;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  background-color: $input-bg;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $text-primary;

  &:hover {
    border-color: $primary;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }
}

.icon-popover {
  margin-top: $spacing-2;
}
</style>
