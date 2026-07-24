<template>
  <TForm
    :title="isEditing ? labels.editGroup : labels.createGroup"
    :api-error="props.apiError"
    :is-submitting="props.isSubmitting"
    :submit-label="isEditing ? labels.updateGroup : labels.createGroup"
    :cancel-label="labels.cancel"
    @submit="handleSubmit"
    @close="handleClose"
  >
    <TFormField
      :label="labels.groupName"
      field-id="group-name"
      :error="nameError ? labels.groupNameRequired : ''"
      required
    >
      <div class="name-icon-row">
        <TFormInput
          id="group-name"
          v-model="form.name"
          :placeholder="labels.enterGroupName"
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
      :label="labels.groupDescription"
      field-id="group-description"
      :error="descriptionError ? labels.groupDescriptionRequired : ''"
      required
    >
      <TFormTextarea
        id="group-description"
        v-model="form.description"
        :placeholder="labels.typeGroupDescription"
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
import TFormTextarea from './TFormTextarea.vue';
import IconPicker from './IconPicker.vue';
import { useLucideIcon } from '../composables/useLucideIcon';
import { ImagePlus } from 'lucide-vue-next';

const props = defineProps({
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
      editGroup: 'Edit Group',
      createGroup: 'Create Group',
      groupName: 'Group Name',
      enterGroupName: 'Enter group name',
      groupNameRequired: 'Group name is required.',
      chooseIcon: 'Choose icon',
      groupDescription: 'Group Description',
      typeGroupDescription: 'Type group description here...',
      groupDescriptionRequired: 'Group description is required.',
      cancel: 'Cancel',
      updating: 'Updating...',
      creating: 'Creating...',
      updateGroup: 'Update Group'
    })
  }
});

const emit = defineEmits(['created', 'updated', 'close']);

const form = ref({
  name: '',
  description: '',
  icon: ''
});

const nameError = ref(false);
const descriptionError = ref(false);
const showIconPicker = ref(false);

const selectedIconComponent = useLucideIcon(computed(() => form.value.icon));
const isEditing = computed(() => !!props.editingItem);

watch(
  () => props.editingItem,
  (newItem) => {
    if (newItem) {
      const iconValue = newItem.icon?.content || newItem.icon || '';
      form.value = {
        name: newItem.name || '',
        description: newItem.description || '',
        icon: iconValue
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.value = { name: '', description: '', icon: '' };
  nameError.value = false;
  descriptionError.value = false;
  showIconPicker.value = false;
}

function validateForm() {
  let isValid = true;
  nameError.value = false;
  descriptionError.value = false;

  if (!form.value.name || form.value.name.trim() === '') {
    nameError.value = true;
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
    description: form.value.description.trim()
  };
  if (form.value.icon && form.value.icon.trim() !== '') {
    formData.icon = form.value.icon;
    formData.icon_type = 'image';
  }

  if (isEditing.value && props.editingItem) {
    emit('updated', { id: props.editingItem.id, ...formData });
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
