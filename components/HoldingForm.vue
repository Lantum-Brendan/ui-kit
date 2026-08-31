<template>
  <Transition name="modal">
    <div v-if="open" class="modal-root" @click.self="$emit('close')">
      <TForm
        class="modal-panel"
        :title="editing ? labels.editHolding : labels.addHolding"
        :api-error="error"
        :is-submitting="submitting"
        :submit-label="editing ? labels.saveChanges : labels.addHolding"
        :cancel-label="labels.cancel || 'Cancel'"
        :show-close="true"
        :show-cancel="true"
        @submit="submit"
        @close="$emit('close')"
      >
        <TFormField :label="labels.priceSource" field-id="holding-price-source" required>
          <div class="seg">
            <button
              type="button"
              class="seg-btn"
              :class="{ 'seg-btn--active': form.price_source === 'auto' }"
              @click="form.price_source = 'auto'"
            >
              <Zap :size="14" /> {{ labels.live }}
            </button>
            <button
              type="button"
              class="seg-btn"
              :class="{ 'seg-btn--active': form.price_source === 'manual' }"
              @click="form.price_source = 'manual'"
            >
              <Pencil :size="14" /> {{ labels.manual }}
            </button>
          </div>
        </TFormField>

        <TFormField
          v-if="form.price_source === 'auto'"
          :label="labels.coin"
          field-id="holding-coin"
          :error="form.price_source === 'auto' && !form.external_ref && error ? labels.coinRequired : ''"
        >
          <TFormInput
            id="holding-coin"
            v-model="coinQuery"
            type="text"
            :placeholder="labels.searchCoin"
            :error="!!(form.price_source === 'auto' && !form.external_ref && error)"
            @input="onSearch"
          />
          <ul v-if="searchResults.length" class="coin-results">
            <li v-for="c in searchResults" :key="c.id">
              <button type="button" class="coin-option" @click="pickCoin(c)">
                <span class="coin-symbol">{{ c.symbol }}</span> {{ c.name }}
              </button>
            </li>
          </ul>
          <p v-if="form.external_ref" class="coin-picked">
            {{ labels.pricedAutomatically }} ({{ form.external_ref }})
          </p>
        </TFormField>

        <TFormField :label="labels.name" field-id="holding-name" required :error="error && !form.name.trim() ? labels.nameRequired : ''">
          <TFormInput
            id="holding-name"
            v-model="form.name"
            type="text"
            :placeholder="labels.namePlaceholder"
            :error="!!(error && !form.name.trim())"
          />
        </TFormField>

        <TFormRow :cols="2">
          <TFormField :label="`${labels.symbol} (${labels.optional})`" field-id="holding-symbol">
            <TFormInput id="holding-symbol" v-model="form.symbol" type="text" placeholder="BTC" />
          </TFormField>
          <TFormField :label="labels.quantity" field-id="holding-quantity" required :error="error && (!form.quantity || form.quantity <= 0) ? labels.quantityRequired : ''">
            <TFormInput
              id="holding-quantity"
              v-model.number="form.quantity"
              type="number"
              step="any"
              min="0"
              :error="!!(error && (!form.quantity || form.quantity <= 0))"
            />
          </TFormField>
        </TFormRow>

        <TFormRow :cols="2">
          <TFormField :label="labels.currency" field-id="holding-currency" required>
            <TFormSelect
              id="holding-currency"
              v-model="form.currency"
              :options="currencyOptions"
            />
          </TFormField>
          <TFormField v-if="form.price_source === 'manual'" :label="labels.pricePerUnit" field-id="holding-price">
            <TFormInput
              id="holding-price"
              v-model.number="form.unit_price"
              type="number"
              step="any"
              min="0"
            />
          </TFormField>
        </TFormRow>
      </TForm>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { Pencil, Zap } from 'lucide-vue-next';
import TForm from './TForm.vue';
import TFormField from './TFormField.vue';
import TFormInput from './TFormInput.vue';
import TFormSelect from './TFormSelect.vue';
import TFormRow from './TFormRow.vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  editing: { type: Object, default: null },
  submitting: { type: Boolean, default: false },
  defaultCurrency: { type: String, default: 'USD' },
  currencies: {
    type: Array,
    default: () => [
      { code: 'USD' }, { code: 'EUR' }, { code: 'GBP' }, { code: 'CAD' }, { code: 'AUD' }
    ]
  },
  searchResults: { type: Array, default: () => [] },
  labels: {
    type: Object,
    default: () => ({
      editHolding: 'Edit holding',
      addHolding: 'Add holding',
      close: 'Close',
      cancel: 'Cancel',
      priceSource: 'Price source',
      live: 'Live',
      manual: 'Manual',
      coin: 'Coin',
      searchCoin: 'Search Bitcoin, Ethereum...',
      pricedAutomatically: 'Priced automatically from provider',
      name: 'Name',
      namePlaceholder: 'Bitcoin, Apple, Rental flat...',
      symbol: 'Symbol',
      optional: 'optional',
      quantity: 'Quantity',
      currency: 'Currency',
      pricePerUnit: 'Price per unit',
      saveChanges: 'Save changes',
      nameRequired: 'Name is required.',
      quantityRequired: 'Enter a quantity greater than 0.',
      coinRequired: 'Pick a coin to price it automatically.'
    })
  }
});

const emit = defineEmits(['submit', 'close', 'search']);

const blank = () => ({
  name: '',
  symbol: '',
  quantity: 0,
  currency: props.defaultCurrency || 'USD',
  unit_price: 0,
  price_source: 'manual',
  provider: null,
  external_ref: null
});

const form = reactive(blank());
const coinQuery = ref('');
const error = ref('');

const currencyOptions = computed(() =>
  props.currencies.map((c) => ({ label: c.code || c, value: c.code || c }))
);

watch(
  () => props.open,
  (open) => {
    if (!open) return;
    error.value = '';
    if (props.editing) {
      Object.assign(form, {
        name: props.editing.name,
        symbol: props.editing.symbol ?? '',
        quantity: props.editing.quantity,
        currency: props.editing.currency,
        unit_price: props.editing.unit_price,
        price_source: props.editing.price_source,
        provider: props.editing.provider ?? null,
        external_ref: props.editing.external_ref ?? null
      });
      coinQuery.value = props.editing.external_ref ?? '';
    } else {
      Object.assign(form, blank());
      coinQuery.value = '';
    }
  }
);

function onSearch() {
  form.provider = null;
  form.external_ref = null;
  const q = coinQuery.value.trim();
  emit('search', q);
}

function pickCoin(c) {
  form.provider = 'coingecko';
  form.external_ref = c.id;
  form.symbol = c.symbol;
  if (!form.name) form.name = c.name;
  coinQuery.value = c.name;
}

function submit() {
  error.value = '';
  if (!form.name.trim()) {
    error.value = props.labels.nameRequired;
    return;
  }
  if (!form.quantity || form.quantity <= 0) {
    error.value = props.labels.quantityRequired;
    return;
  }
  if (form.price_source === 'auto' && !form.external_ref) {
    error.value = props.labels.coinRequired;
    return;
  }
  emit('submit', { ...form });
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.modal-root {
  position: fixed;
  inset: 0;
  z-index: $z-index-modal;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;

  @media (min-width: $breakpoint-md) {
    align-items: center;
    padding: $spacing-6;
  }
}

.modal-panel {
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  // TForm provides its own background/border, override modal-panel defaults when using TForm
  :deep(.t-form) {
    margin: 0;
    width: 100%;
  }

  @media (min-width: $breakpoint-md) {
    border-radius: 20px;
  }
}

.seg {
  display: flex;
  gap: 6px;
  padding: 4px;
  background: $bg-light;
  border-radius: 12px;
}

.seg-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  cursor: pointer;
}

.seg-btn--active {
  background: $bg-white;
  color: $text-primary;
  box-shadow: $elevation-1;
}

.coin-results {
  list-style: none;
  margin: 0;
  padding: 4px;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  max-height: 200px;
  overflow-y: auto;
}

.coin-option {
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: $font-size-sm;
  color: $text-primary;

  &:hover {
    background: $bg-light;
  }
}

.coin-symbol {
  font-weight: $font-bold;
  margin-right: 6px;
}

.coin-picked {
  margin: 0;
  font-size: 11px;
  color: $text-muted;
}
</style>
