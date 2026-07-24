<template>
  <TForm
    :title="isEditing ? labels.editWallet : labels.createWallet"
    :api-error="props.apiError"
    :is-submitting="props.isSubmitting"
    :submit-label="isEditing ? labels.updateWallet : labels.createWallet"
    :cancel-label="labels.cancel"
    @submit="handleSubmit"
    @close="handleFormClose"
  >
    <TFormField
      :label="labels.walletName"
      field-id="wallet-name"
      :error="nameError ? labels.walletNameRequired : ''"
      required
    >
      <div class="name-icon-row">
        <TFormInput
          id="wallet-name"
          v-model="form.name"
          :placeholder="labels.walletNamePlaceholder"
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

    <TFormRow :cols="2">
      <TFormField
        :label="labels.walletType"
        field-id="wallet-type"
        :error="typeError ? labels.walletTypeRequired : ''"
        required
      >
        <TFormSelect
          id="wallet-type"
          v-model="form.type"
          :options="walletTypeOptions"
          :error="typeError"
        />
      </TFormField>

      <TFormField
        :label="labels.currency"
        field-id="wallet-currency"
        :error="currencyError ? labels.currencyRequired : ''"
        required
      >
        <TFormSelect
          id="wallet-currency"
          v-model="form.currency"
          :options="currencySelectOptions"
          :error="currencyError"
        />
      </TFormField>
    </TFormRow>

    <TFormField :label="labels.initialBalance" field-id="wallet-balance">
      <TFormInput
        id="wallet-balance"
        v-model.number="form.balance"
        type="number"
        placeholder="0.00"
      />
    </TFormField>

    <TFormField
      :label="labels.walletDescription"
      field-id="wallet-description"
      :error="descriptionError ? labels.walletDescriptionRequired : ''"
      required
    >
      <TFormTextarea
        id="wallet-description"
        v-model="form.description"
        :placeholder="labels.walletDescriptionPlaceholder"
        :rows="4"
        :error="descriptionError"
      />
    </TFormField>
  </TForm>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import TForm from './TForm.vue';
import TFormField from './TFormField.vue';
import TFormRow from './TFormRow.vue';
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

const selectedIconComponent = useLucideIcon(computed(() => form.value.icon));
const isEditing = computed(() => !!props.editingItem);

const walletTypeOptions = computed(() => [
  { label: props.labels.selectWalletType, value: '' },
  { label: props.labels.bankAccount, value: 'bank' },
  { label: props.labels.cash, value: 'cash' },
  { label: props.labels.creditCard, value: 'credit_card' },
  { label: props.labels.mobileMoney, value: 'mobile' }
]);

const currencySelectOptions = computed(() => [
  { label: props.labels.selectCurrency, value: '' },
  { label: `XAF - ${props.labels.centralAfricanFranc}`, value: 'XAF' },
  { label: `USD - ${props.labels.usDollar}`, value: 'USD' },
  { label: `EUR - ${props.labels.euro}`, value: 'EUR' },
  { label: `GBP - ${props.labels.britishPound}`, value: 'GBP' },
  { label: `JPY - ${props.labels.japaneseYen}`, value: 'JPY' },
  { label: `CAD - ${props.labels.canadianDollar}`, value: 'CAD' },
  { label: `AUD - ${props.labels.australianDollar}`, value: 'AUD' },
  { label: `CHF - ${props.labels.swissFranc}`, value: 'CHF' },
  { label: `CNY - ${props.labels.chineseYuan}`, value: 'CNY' }
]);

onMounted(() => {
  if (!isEditing.value && (!form.value.currency || form.value.currency.trim() === '')) {
    form.value.currency = props.defaultCurrency;
  }
});

watch(
  () => props.editingItem,
  (newItem) => {
    if (newItem) {
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
  nameError.value = false;
  typeError.value = false;
  currencyError.value = false;
  descriptionError.value = false;

  if (!form.value.name || form.value.name.trim() === '') {
    nameError.value = true;
    isValid = false;
  }

  if (!form.value.type || form.value.type.trim() === '') {
    typeError.value = true;
    isValid = false;
  }

  if (!form.value.currency || form.value.currency.trim() === '') {
    currencyError.value = true;
    isValid = false;
  }

  if (!form.value.description || form.value.description.trim() === '') {
    descriptionError.value = true;
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (props.isSubmitting) return;

  if (!form.value.currency || form.value.currency.trim() === '') {
    form.value.currency = props.defaultCurrency;
  }

  if (!validateForm()) return;

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
    emit('updated', {
      id: props.editingItem.id,
      ...formData
    });
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
