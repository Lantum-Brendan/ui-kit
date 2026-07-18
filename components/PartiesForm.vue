<template>
  <form class="card-form" @submit.prevent="handleSubmit">
    <div class="form-header">
      <h2>{{ isEditing ? labels.editParty : labels.createParty }}</h2>
      <button type="button" class="close-btn" @click="handleClose">
        <X />
      </button>
    </div>

    <div class="form-group">
      <label for="party-name" class="form-label">{{ labels.partyName }}</label>
      <div class="name-icon-row">
        <div class="name-col">
          <input
            id="party-name"
            v-model="form.name"
            type="text"
            class="form-input"
            :class="{ error: nameError || props.apiError }"
            :placeholder="labels.enterPartyName"
          />
          <div v-if="nameError" class="error-text">{{ labels.partyNameRequired }}</div>
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
      <label for="party-type" class="form-label">{{ labels.partyType }}</label>
      <select
        id="party-type"
        v-model="form.type"
        class="form-select"
        :class="{ error: partyTypeError }"
        required
      >
        <option value="">{{ labels.selectPartyType }}</option>
        <option value="individual">{{ labels.individual }}</option>
        <option value="organization">{{ labels.organization }}</option>
        <option value="business">{{ labels.business }}</option>
        <option value="partnership">{{ labels.partnership }}</option>
        <option value="non_profit">{{ labels.nonProfit }}</option>
        <option value="government_agency">{{ labels.governmentAgency }}</option>
        <option value="educational_institution">{{ labels.educationalInstitution }}</option>
        <option value="healthcare_provider">{{ labels.healthcareProvider }}</option>
      </select>
      <div v-if="partyTypeError" class="error-text">{{ labels.pleaseSelectPartyType }}</div>
    </div>

    <div class="form-group">
      <label for="party-description" class="form-label">{{ labels.partyDescription }}</label>
      <textarea
        id="party-description"
        v-model="form.description"
        class="form-textarea"
        :class="{ error: descriptionError }"
        :placeholder="labels.typePartyDescription"
        rows="5"
        required
      />
      <div v-if="descriptionError" class="error-text">
        {{ labels.partyDescriptionRequired }}
      </div>
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="handleClose">
        {{ labels.cancel }}
      </button>
      <button type="submit" class="btn btn-primary" :disabled="props.isSubmitting">
        {{ isEditing ? labels.updateParty : labels.createParty }}
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
  type: '', // Empty default for dropdown
  icon: '',
  description: ''
});

const nameError = ref(false);
const partyTypeError = ref(false);
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

      console.log('Editing party:', newEditingItem);
      console.log('Extracted icon value:', iconValue);

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

  // Reset errors
  nameError.value = false;
  partyTypeError.value = false;
  descriptionError.value = false;

  // Validate name
  if (!form.value.name || form.value.name.trim() === '') {
    nameError.value = true;
    isValid = false;
  }

  // Validate party type
  if (!form.value.type) {
    partyTypeError.value = true;
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
    type: form.value.type,
    description: form.value.description.trim()
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
