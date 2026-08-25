<template>
  <div>
    <div class="section-grid">
      <div class="form-group">
        <label class="form-label">{{ labels.defaultWallet }}</label>
        <select v-if="isEditMode" v-model="localWalletId" class="form-select">
          <option v-for="w in wallets" :key="w.id" :value="w.id">
            {{ w.name }}
            <template v-if="w.currency"> ({{ w.currency }})</template>
          </option>
        </select>
        <div v-else class="wallet-display">
          <p class="text-display">{{ walletLabel || '—' }}</p>
          <span v-if="walletLabel" class="wallet-badge">{{ labels.currentlySelected }}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ labels.defaultGroup }}</label>
        <select v-if="isEditMode" v-model="localGroupId" class="form-select">
          <option :value="null">{{ labels.none }}</option>
          <option v-for="g in groups" :key="g.id" :value="g.id">
            {{ g.name }}
          </option>
        </select>
        <p v-else class="text-display">{{ groupLabel || '—' }}</p>
      </div>
    </div>

    <div class="toggle-item">
      <div class="toggle-info">
        <div>
          <p class="toggle-label">{{ labels.allowNegativeBalances }}</p>
          <p class="toggle-desc">
            {{ labels.allowNegativeDesc }}
          </p>
        </div>
      </div>
      <label class="toggle-switch">
        <input v-model="localAllowNegative" type="checkbox" :disabled="!isEditMode" />
        <span class="slider"></span>
      </label>
    </div>

    <div v-if="isEditMode" class="actions">
      <button type="button" class="submit-btn" @click="handleSave">
        <Save class="inline-icon" />
        <span>{{ labels.updateWalletsAndGroups }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Save } from 'lucide-vue-next';

const props = defineProps({
  isEditMode: { type: Boolean, default: false },
  wallets: { type: Array, default: () => [] },
  groups: { type: Array, default: () => [] },
  defaultWalletId: { type: [String, Number], default: null },
  defaultGroupId: { type: [String, Number], default: null },
  allowNegativeBalance: { type: Boolean, default: false },
  labels: {
    type: Object,
    default: () => ({
      defaultWallet: 'Default Wallet',
      currentlySelected: 'Currently Selected',
      defaultGroup: 'Default Group',
      none: 'None',
      allowNegativeBalances: 'Allow Negative Balances',
      allowNegativeDesc: 'Permit wallet balances to go below zero when spending or transferring.',
      updateWalletsAndGroups: 'Update Wallets & Groups'
    })
  }
});

const emit = defineEmits(['save']);

const localWalletId = ref(props.defaultWalletId);
const localGroupId = ref(props.defaultGroupId);
const localAllowNegative = ref(props.allowNegativeBalance);

watch(
  () => props.defaultWalletId,
  (val) => {
    localWalletId.value = val;
  }
);

watch(
  () => props.defaultGroupId,
  (val) => {
    localGroupId.value = val;
  }
);

watch(
  () => props.allowNegativeBalance,
  (val) => {
    localAllowNegative.value = val;
  }
);

const walletLabel = computed(() => {
  if (!localWalletId.value) return '';
  const w = props.wallets.find((x) => x.id === localWalletId.value);
  return w ? w.name : '';
});

const groupLabel = computed(() => {
  if (!localGroupId.value) return '';
  const g = props.groups.find((x) => x.id === localGroupId.value);
  return g ? g.name : '';
});

const handleSave = () => {
  emit('save', {
    walletId: localWalletId.value,
    groupId: localGroupId.value,
    allowNegativeBalance: localAllowNegative.value
  });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.section-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.text-display {
  padding: 0.75rem 1rem;
  border-radius: $radius-lg;
  background: $bg-gray;
  color: $text-primary;
  font-weight: $font-medium;
}

.wallet-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .text-display {
    margin: 0;
  }

  .wallet-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--color-primary-rgb), 0.1);
    color: $primary;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    width: fit-content;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border: 1px solid $primary;
  }
}

.inline-icon {
  width: 18px;
  height: 18px;
}

.actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  background: $bg-gray;
  border-radius: $radius-lg;
}

.toggle-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toggle-label {
  font-weight: $font-medium;
  color: $text-primary;
  margin: 0;
}

.toggle-desc {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: $primary;
    }

    &:checked + .slider:before {
      transform: translateX(24px);
    }

    &:disabled + .slider {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $border-color;
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }
}
</style>
