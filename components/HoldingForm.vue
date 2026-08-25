<template>
  <Transition name="modal">
    <div v-if="open" class="modal-root" @click.self="$emit('close')">
      <div class="modal-panel" role="dialog" aria-modal="true">
        <header class="modal-head">
          <h2 class="modal-title">{{ editing ? labels.editHolding : labels.addHolding }}</h2>
          <button class="icon-btn" :aria-label="labels.close" @click="$emit('close')">
            <X :size="18" />
          </button>
        </header>

        <div class="field">
          <label>{{ labels.priceSource }}</label>
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
        </div>

        <div v-if="form.price_source === 'auto'" class="field">
          <label>{{ labels.coin }}</label>
          <input
            v-model="coinQuery"
            type="text"
            :placeholder="labels.searchCoin"
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
        </div>

        <div class="field">
          <label>{{ labels.name }}</label>
          <input
            v-model="form.name"
            type="text"
            :placeholder="labels.namePlaceholder"
          />
        </div>

        <div class="field-row">
          <div class="field">
            <label
              >{{ labels.symbol }} <span class="opt">({{ labels.optional }})</span></label
            >
            <input v-model="form.symbol" type="text" placeholder="BTC" />
          </div>
          <div class="field">
            <label>{{ labels.quantity }}</label>
            <input v-model.number="form.quantity" type="number" step="any" min="0" />
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label>{{ labels.currency }}</label>
            <select v-model="form.currency">
              <option v-for="c in currencies" :key="c.code || c" :value="c.code || c">{{ c.code || c }}</option>
            </select>
          </div>
          <div v-if="form.price_source === 'manual'" class="field">
            <label>{{ labels.pricePerUnit }}</label>
            <input v-model.number="form.unit_price" type="number" step="any" min="0" />
          </div>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="button" class="submit" :disabled="submitting" @click="submit">
          {{ editing ? labels.saveChanges : labels.addHolding }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { X, Pencil, Zap } from 'lucide-vue-next';

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
  background: $bg-white;
  border-radius: 20px 20px 0 0;
  padding: $spacing-5;
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  box-shadow: $elevation-5;

  @media (min-width: $breakpoint-md) {
    border-radius: 20px;
  }
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: $font-size-lg;
  font-weight: $font-bold;
  color: $text-primary;
}

.icon-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: $bg-light;
  color: $text-secondary;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  label {
    font-size: $font-size-sm;
    font-weight: $font-medium;
    color: $text-primary;
  }

  .opt {
    color: $text-muted;
    font-weight: $font-normal;
  }

  input,
  select {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    height: 46px;
    padding: 0 12px;
    border: 1px solid $border-color;
    border-radius: $radius-lg;
    background: $bg-white;
    color: $text-primary;
    font-size: 15px;

    &:focus {
      outline: none;
      border-color: $primary;
    }
  }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-3;
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

.form-error {
  margin: 0;
  color: var(--color-expense, #dc2626);
  font-size: $font-size-sm;
}

.submit {
  height: 48px;
  border: none;
  border-radius: $radius-lg;
  background: $primary;
  color: #fff;
  font-weight: $font-semibold;
  font-size: 15px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
