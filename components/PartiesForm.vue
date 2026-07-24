<template>
  <TForm
    :title="isEditing ? labels.editParty : labels.createParty"
    :api-error="props.apiError"
    :is-submitting="props.isSubmitting"
    :submit-label="isEditing ? labels.updateParty : labels.createParty"
    :cancel-label="labels.cancel"
    @submit="handleSubmit"
    @close="handleClose"
  >
    <TFormField
      :label="labels.partyName"
      field-id="party-name"
      :error="nameError ? labels.partyNameRequired : ''"
      required
    >
      <div class="name-icon-row">
        <TFormInput
          id="party-name"
          v-model="form.name"
          :placeholder="labels.enterPartyName"
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
      :label="labels.partyType"
      field-id="party-type"
      :error="partyTypeError ? labels.pleaseSelectPartyType : ''"
      required
    >
      <TFormSelect
        id="party-type"
        v-model="form.type"
        :options="partyTypeOptions"
        :error="partyTypeError"
      />
    </TFormField>

    <TFormField
      :label="labels.partyDescription"
      field-id="party-description"
      :error="descriptionError ? labels.partyDescriptionRequired : ''"
      required
    >
      <TFormTextarea
        id="party-description"
        v-model="form.description"
        :placeholder="labels.typePartyDescription"
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
      editParty: 'Edit Party',
      createParty: 'Create Party',
      partyName: 'Party Name',
      enterPartyName: 'Enter party name',
      partyNameRequired: 'Party name is required.',
      chooseIcon: 'Choose icon',
      partyType: 'Party Type',
      selectPartyType: 'Select party type',
      individual: 'Individual',
      organization: 'Organization',
      business: 'Business',
      partnership: 'Partnership',
      nonProfit: 'Non-Profit',
      governmentAgency: 'Government Agency',
      educationalInstitution: 'Educational Institution',
      healthcareProvider: 'Healthcare Provider',
      pleaseSelectPartyType: 'Please select a party type.',
      partyDescription: 'Party Description',
      typePartyDescription: 'Type party description here...',
      partyDescriptionRequired: 'Party description is required.',
      cancel: 'Cancel',
      updateParty: 'Update Party'
    })
  }
});

const emit = defineEmits(['created', 'updated', 'close']);

const form = ref({
  name: '',
  type: '',
  icon: '',
  description: ''
});

const nameError = ref(false);
const partyTypeError = ref(false);
const descriptionError = ref(false);
const showIconPicker = ref(false);

const selectedIconComponent = useLucideIcon(computed(() => form.value.icon));
const isEditing = computed(() => !!props.editingItem);

const partyTypeOptions = computed(() => [
  { label: props.labels.selectPartyType, value: '' },
  { label: props.labels.individual, value: 'individual' },
  { label: props.labels.organization, value: 'organization' },
  { label: props.labels.business, value: 'business' },
  { label: props.labels.partnership, value: 'partnership' },
  { label: props.labels.nonProfit, value: 'non_profit' },
  { label: props.labels.governmentAgency, value: 'government_agency' },
  { label: props.labels.educationalInstitution, value: 'educational_institution' },
  { label: props.labels.healthcareProvider, value: 'healthcare_provider' }
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
        type: newEditingItem.type || '',
        icon: iconValue,
        description: newEditingItem.description || ''
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.value = {
    name: '',
    type: '',
    icon: '',
    description: ''
  };
  nameError.value = false;
  partyTypeError.value = false;
  descriptionError.value = false;
  showIconPicker.value = false;
}

function validateForm() {
  let isValid = true;
  nameError.value = false;
  partyTypeError.value = false;
  descriptionError.value = false;

  if (!form.value.name || form.value.name.trim() === '') {
    nameError.value = true;
    isValid = false;
  }

  if (!form.value.type) {
    partyTypeError.value = true;
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
    type: form.value.type,
    description: form.value.description.trim()
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
