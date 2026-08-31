<template>
  <div ref="triggerEl" class="wallet-selector" @click="toggleDropdown">
    <Wallet class="wallet-icon" :size="15" />
    <span class="wallet-name">{{ selectedWalletName }}</span>
    <ChevronDown class="chevron" :class="{ rotated: showDropdown }" :size="16" />
  </div>

  <Teleport to="body">
    <div v-if="showDropdown" class="wallet-dropdown" :style="menuStyle">
      <div
        v-for="wallet in availableWallets"
        :key="wallet.id || 'all'"
        class="wallet-option"
        :class="{ selected: selectedWalletId === wallet.id }"
        @click.stop="selectWallet(wallet.id)"
      >
        {{ wallet.name }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { ChevronDown, Wallet } from 'lucide-vue-next';

interface WalletOption {
  id: number | null;
  name: string;
}

const props = defineProps<{
  /** Currently selected wallet id (null = all). Use v-model. */
  selectedWalletId: number | null;
  /** Wallets to list in the dropdown. */
  wallets: WalletOption[];
  /** Label shown when no wallet is selected. */
  allWalletsLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedWalletId', id: number | null): void;
  (e: 'select', id: number | null): void;
}>();

const showDropdown = ref(false);
const triggerEl = ref<HTMLElement | null>(null);
const menuStyle = ref<Record<string, string>>({});

const allLabel = computed(() => props.allWalletsLabel ?? 'All Wallets');

const availableWallets = computed<WalletOption[]>(() => [
  { id: null, name: allLabel.value },
  ...props.wallets
]);

const selectedWalletName = computed(() => {
  if (props.selectedWalletId === null) return allLabel.value;
  const wallet = props.wallets.find((w) => w.id === props.selectedWalletId);
  return wallet ? wallet.name : allLabel.value;
});

const positionMenu = () => {
  const el = triggerEl.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  menuStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 6}px`,
    right: `${window.innerWidth - rect.right}px`,
    minWidth: `${Math.max(rect.width, 180)}px`
  };
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) positionMenu();
};

const selectWallet = (walletId: number | null) => {
  emit('update:selectedWalletId', walletId);
  emit('select', walletId);
  closeDropdown();
};

const handleClickOutside = (event: MouseEvent) => {
  if (!triggerEl.value?.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', closeDropdown, true);
  window.addEventListener('resize', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', closeDropdown, true);
  window.removeEventListener('resize', closeDropdown);
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.wallet-selector {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-3;
  background: var(--glass-bg);
  border-radius: 999px;
  border: 1px solid $border-light;
  backdrop-filter: blur(10px);
  box-shadow: $elevation-1;
  cursor: pointer;
  user-select: none;
  width: fit-content;

  &:hover {
    background: var(--hover-overlay);
  }
}

.wallet-icon {
  color: var(--surface-deep, var(--color-primary-dark));
  flex-shrink: 0;
}

.wallet-name {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: var(--surface-ink, var(--color-text-primary));
  white-space: nowrap;
}

.chevron {
  color: var(--surface-deep, var(--color-primary-dark));
  transition: transform 0.2s;

  &.rotated {
    transform: rotate(180deg);
  }
}

.wallet-dropdown {
  min-width: 180px;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  z-index: 1200;
  overflow: hidden;
}

.wallet-option {
  padding: $spacing-2 $spacing-3;
  font-size: $font-size-sm;
  color: $text-primary;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background: $bg-light;
  }

  &.selected {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: $primary;
    font-weight: $font-medium;
  }
}
</style>
