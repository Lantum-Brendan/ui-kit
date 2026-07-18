<template>
  <form class="card-form" @submit.prevent="handleSubmit">
    <div class="form-header">
      <h2>{{ isEditing ? labels.editWallet : labels.createWallet }}</h2>
      <button type="button" class="close-btn" @click="handleFormClose">
        <X />
      </button>
    </div>

    <div class="form-group">
      <label for="wallet-name" class="form-label">{{ labels.walletName }}</label>
      <div class="name-icon-row">
        <div class="name-col">
          <input
            id="wallet-name"
            v-model="form.name"
            type="text"
            class="form-input"
            :class="{ error: nameError || props.apiError }"
            :placeholder="labels.walletNamePlaceholder"
            required
          />
          <div v-if="nameError" class="error-text">{{ labels.walletNameRequired }}</div>
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

    <div class="two-col-row">
      <div class="form-group">
        <label for="wallet-type" class="form-label">{{ labels.walletType }}</label>
        <select
          id="wallet-type"
          v-model="form.type"
          class="form-select"
          :class="{ error: typeError }"
          required
        >
          <option value="">{{ labels.selectWalletType }}</option>
          <option value="bank">{{ labels.bankAccount }}</option>
          <option value="cash">{{ labels.cash }}</option>
          <option value="credit_card">{{ labels.creditCard }}</option>
          <option value="mobile">{{ labels.mobileMoney }}</option>
        </select>
        <div v-if="typeError" class="error-text">{{ labels.walletTypeRequired }}</div>
      </div>

      <div class="form-group">
        <label for="wallet-currency" class="form-label">{{ labels.currency }}</label>
        <select
          id="wallet-currency"
          v-model="form.currency"
          class="form-select"
          :class="{ error: currencyError }"
          required
        >
          <option value="">{{ labels.selectCurrency }}</option>
          <option value="XAF">XAF - {{ labels.centralAfricanFranc }}</option>
          <option value="USD">USD - {{ labels.usDollar }}</option>
          <option value="EUR">EUR - {{ labels.euro }}</option>
          <option value="GBP">GBP - {{ labels.britishPound }}</option>
          <option value="JPY">JPY - {{ labels.japaneseYen }}</option>
          <option value="CAD">CAD - {{ labels.canadianDollar }}</option>
          <option value="AUD">AUD - {{ labels.australianDollar }}</option>
          <option value="CHF">CHF - {{ labels.swissFranc }}</option>
          <option value="CNY">CNY - {{ labels.chineseYuan }}</option>
        </select>
        <div v-if="currencyError" class="error-text">{{ labels.currencyRequired }}</div>
      </div>
    </div>

    <div class="form-group">
      <label for="wallet-balance" class="form-label">{{ labels.initialBalance }}</label>
      <input
        id="wallet-balance"
        v-model.number="form.balance"
        type="number"
        step="0.01"
        class="form-input"
        placeholder="0.00"
      />
    </div>

    <div class="form-group">
      <label for="wallet-description" class="form-label">{{ labels.walletDescription }}</label>
      <textarea
        id="wallet-description"
        v-model="form.description"
        class="form-textarea"
        :class="{ error: descriptionError }"
        :placeholder="labels.walletDescriptionPlaceholder"
        rows="5"
        required
      />
      <div v-if="descriptionError" class="error-text">
        {{ labels.walletDescriptionRequired }}
      </div>
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="handleFormClose">
        {{ labels.cancel }}
      </button>
      <button type="submit" class="btn btn-primary" :disabled="props.isSubmitting">
        {{ isEditing ? labels.updateWallet : labels.createWallet }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import IconPicker from './IconPicker.vue';
import * as lucideIcons from 'lucide-vue-next';
import { ImagePlus, X } from 'lucide-vue-next';

const props = defineProps({
  editingItem: {
    type: Object,
    default: null
  },
  defaultCurrency: {
    type: String,
    default: 'USD'
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
      editWallet: 'Edit Wallet',
      createWallet: 'Create Wallet',
      walletName: 'Wallet Name',
      walletNamePlaceholder: 'Enter wallet name',
      walletNameRequired: 'Wallet name is required.',
      chooseIcon: 'Choose icon',
      selectWalletType: 'Select wallet type',
      bankAccount: 'Bank Account',
      cash: 'Cash',
      creditCard: 'Credit Card',
      mobileMoney: 'Mobile Money',
      walletTypeRequired: 'Please select a wallet type.',
      currency: 'Currency',
      selectCurrency: 'Select currency',
      centralAfricanFranc: 'Central African Franc',
      usDollar: 'US Dollar',
      euro: 'Euro',
      britishPound: 'British Pound',
      japaneseYen: 'Japanese Yen',
      canadianDollar: 'Canadian Dollar',
      australianDollar: 'Australian Dollar',
      swissFranc: 'Swiss Franc',
      chineseYuan: 'Chinese Yuan',
      currencyRequired: 'Please select a currency.',
      initialBalance: 'Initial Balance',
      walletDescription: 'Wallet Description',
      walletDescriptionPlaceholder: 'Type wallet description here...',
      walletDescriptionRequired: 'Wallet description is required.',
      cancel: 'Cancel',
      updateWallet: 'Update Wallet'
    })
  }
});

const emit = defineEmits(['created', 'updated', 'close']);


const form = ref({
  name: '',
  icon: '',
  type: '',
  currency: '',
  balance: 0,
  description: ''
});

const nameError = ref(false);
const typeError = ref(false);
const currencyError = ref(false);
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

onMounted(() => {
  if (!isEditing.value && (!form.value.currency || form.value.currency.trim() === '')) {
    form.value.currency = props.defaultCurrency;
  }
});

// Populate form when editing
watch(
  () => props.editingItem,
  (newItem) => {
    if (newItem) {
      // Extract icon value - could be from icon.path, icon.content, or direct icon value
      let iconValue = '';
      if (newItem.icon) {
        if (typeof newItem.icon === 'string') {
          iconValue = newItem.icon;
        } else if (newItem.icon.path) {
          iconValue = newItem.icon.path;
        } else if (newItem.icon.content) {
          iconValue = newItem.icon.content;
        }
      }

      console.log('Editing wallet:', newItem);
      console.log('Extracted icon value:', iconValue);

      form.value = {
        name: newItem.name || '',
        icon: iconValue,
        type: newItem.type || '',
        currency: newItem.currency || '',
        balance: newItem.balance || 0,
        description: newItem.description || ''
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
    icon: '',
    type: '',
    currency: props.defaultCurrency,
    balance: 0,
    description: ''
  };
  nameError.value = false;
  typeError.value = false;
  currencyError.value = false;
  descriptionError.value = false;
  showIconPicker.value = false;
}

function validateForm() {
  let isValid = true;

  // Reset errors
  nameError.value = false;
  typeError.value = false;
  currencyError.value = false;
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

  // Validate currency
  if (!form.value.currency || form.value.currency.trim() === '') {
    currencyError.value = true;
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

  if (!form.value.currency || form.value.currency.trim() === '') {
    form.value.currency = props.defaultCurrency;
  }

  // Validate all fields
  if (!validateForm()) {
    return;
  }

  const formData = {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    type: form.value.type.trim(),
    currency: form.value.currency,
    balance: form.value.balance || 0
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

function handleFormClose() {
  emit('close');
  resetForm();
}

function onIconSelected() {
  showIconPicker.value = false;
}
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;
</style>
