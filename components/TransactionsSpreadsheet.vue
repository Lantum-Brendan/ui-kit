<template>
  <Teleport to="body">
    <div class="spreadsheet-overlay" role="dialog" aria-modal="true">
      <TransactionsSpreadsheetToolbar
        :labels="labels"
        :row-count="filteredRows.length"
        :is-streaming="isStreaming"
        :search-value="searchInput"
        :has-selection="hasSelection"
        :export-disabled="!filteredRows.length"
        @update:search-value="searchInput = $event"
        @export="exportCsv"
        @close="$emit('close')"
        @add-row="handleAddRow"
        @delete-selected="handleDeleteSelected"
      />

      <div v-if="isLoading" class="state">
        <div class="spinner" />
        <p>{{ labels.loadingTransactions }}</p>
      </div>

      <div v-else-if="error" class="state">
        <p class="error">{{ error }}</p>
      </div>

      <div v-else class="sheet-wrap">
        <table class="sheet">
          <thead>
            <tr>
              <th class="col-idx">#</th>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="[col.cls, 'sortable']"
                :aria-sort="
                  sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'
                "
                @click="toggleSort(col.key)"
              >
                <span class="th-inner">
                  {{ col.label }}
                  <ChevronUpIcon
                    v-if="sortKey === col.key && sortDir === 'asc'"
                    class="sort-icon"
                  />
                  <ChevronDownIcon
                    v-else-if="sortKey === col.key && sortDir === 'desc'"
                    class="sort-icon"
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in sortedRows"
              :key="row.id"
              :class="`row--${row.type}`"
              @dblclick="editingRow = { ...row }"
            >
              <td class="col-idx">{{ i + 1 }}</td>
              <td class="col-date">{{ formatDate(row.datetime) }}</td>
              <td class="col-type">
                <span class="type-dot" :class="`type-dot--${row.type}`" />
                {{ row.type }}
                <span v-if="row.is_refund" class="refund-tag" :title="labels.markedAsRefund">
                  {{ labels.refund }}
                </span>
              </td>
              <td class="col-amount" :class="`amt--${row.type}`">
                {{ formatAmount(row.amount) }}
              </td>
              <td class="col-currency">{{ row.wallet?.currency ?? '' }}</td>
              <td class="col-desc">{{ row.description || '—' }}</td>
              <td class="col-cat">{{ categoriesText(row) }}</td>
              <td class="col-wallet">{{ row.wallet?.name ?? '' }}</td>
              <td class="col-party">{{ row.party?.name ?? '' }}</td>
            </tr>
            <TransactionsSpreadsheetEditor
              v-if="editingRow"
              :editing-row="editingRow"
              :labels="labels"
              :currencies="availableCurrencies"
              @save="handleEditorSave"
              @cancel="editingRow = null"
            />
          </tbody>
          <tfoot>
            <tr class="totals">
              <td colspan="3">{{ labels.totals }}</td>
              <td>{{ formatAmount(totalAmount) }}</td>
              <td colspan="5">
                <span class="muted">{{ labels.income }}</span>
                <strong class="amt--income">{{ formatAmount(totalIncome) }}</strong>
                <span class="muted">· {{ labels.expenses }}</span>
                <strong class="amt--expense">{{ formatAmount(totalExpense) }}</strong>
                <span class="muted">· {{ labels.net }}</span>
                <strong :class="totalIncome - totalExpense >= 0 ? 'amt--income' : 'amt--expense'">
                  {{ formatAmount(totalIncome - totalExpense) }}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { fill } from '../utils/fill';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import TransactionsSpreadsheetToolbar from './TransactionsSpreadsheetToolbar.vue';
import TransactionsSpreadsheetEditor from './TransactionsSpreadsheetEditor.vue';

const props = defineProps({
  rows: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  isStreaming: { type: Boolean, default: false },
  error: { type: String, default: '' },
  labels: {
    type: Object,
    default: () => ({
      title: 'Transactions spreadsheet',
      rowCount: '{count} rows',
      loadingMore: 'loading…',
      searchPlaceholder: 'Search rows...',
      exportCsv: 'Export CSV',
      close: 'Close',
      loadingTransactions: 'Loading transactions...',
      dateCol: 'Date',
      typeCol: 'Type',
      amountCol: 'Amount',
      currencyCol: 'Currency',
      descCol: 'Description',
      catCol: 'Categories',
      walletCol: 'Wallet',
      partyCol: 'Party',
      markedAsRefund: 'Marked as refund',
      refund: 'refund',
      totals: 'Totals',
      income: 'Income',
      expenses: 'Expenses',
      net: 'Net',
      addRow: 'Add row',
      deleteSelected: 'Delete selected',
      save: 'Save',
      cancel: 'Cancel'
    })
  }
});

const emit = defineEmits(['close']);

const searchInput = ref('');
const search = ref('');

let searchTimer = null;
watch(searchInput, (value) => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    search.value = value;
  }, 200);
});

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return props.rows;
  return props.rows.filter((r) => {
    const hay = [
      r.description,
      r.wallet?.name,
      r.party?.name,
      (r.categories ?? []).map((c) => c.name).join(' '),
      r.type
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
});

const totalAmount = computed(() =>
  filteredRows.value.reduce((s, r) => s + Number(r.amount || 0), 0)
);
const totalIncome = computed(() =>
  filteredRows.value.filter((r) => r.type === 'income').reduce((s, r) => s + Number(r.amount), 0)
);
const totalExpense = computed(() =>
  filteredRows.value.filter((r) => r.type === 'expense').reduce((s, r) => s + Number(r.amount), 0)
);

const sortKey = ref(null);
const sortDir = ref('asc');

const sortValue = (row, key) => {
  switch (key) {
    case 'datetime':
      return row.datetime || '';
    case 'type':
      return row.type || '';
    case 'amount':
      return Number(row.amount) || 0;
    case 'currency':
      return row.wallet?.currency || '';
    case 'description':
      return (row.description || '').toLowerCase();
    case 'categories':
      return categoriesText(row).toLowerCase();
    case 'wallet':
      return (row.wallet?.name || '').toLowerCase();
    case 'party':
      return (row.party?.name || '').toLowerCase();
    default:
      return '';
  }
};

const sortedRows = computed(() => {
  const key = sortKey.value;
  if (!key) return filteredRows.value;
  const dir = sortDir.value === 'asc' ? 1 : -1;
  return [...filteredRows.value].sort((a, b) => {
    const av = sortValue(a, key);
    const bv = sortValue(b, key);
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
});

const columns = computed(() => [
  { key: 'datetime', label: props.labels.dateCol, cls: 'col-date' },
  { key: 'type', label: props.labels.typeCol, cls: 'col-type' },
  { key: 'amount', label: props.labels.amountCol, cls: 'col-amount' },
  { key: 'currency', label: props.labels.currencyCol, cls: 'col-currency' },
  { key: 'description', label: props.labels.descCol, cls: 'col-desc' },
  { key: 'categories', label: props.labels.catCol, cls: 'col-cat' },
  { key: 'wallet', label: props.labels.walletCol, cls: 'col-wallet' },
  { key: 'party', label: props.labels.partyCol, cls: 'col-party' }
]);

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
};

const csvEscape = (value) => {
  const s = String(value ?? '');
  return /["\n,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const exportCsv = () => {
  const headers = [
    props.labels.dateCol,
    props.labels.typeCol,
    props.labels.amountCol,
    props.labels.currencyCol,
    props.labels.descCol,
    props.labels.catCol,
    props.labels.walletCol,
    props.labels.partyCol
  ];
  const lines = [headers.map(csvEscape).join(',')];
  for (const r of sortedRows.value) {
    lines.push(
      [
        formatDate(r.datetime),
        r.type,
        Number(r.amount) || 0,
        r.wallet?.currency ?? '',
        r.description ?? '',
        categoriesText(r),
        r.wallet?.name ?? '',
        r.party?.name ?? ''
      ]
        .map(csvEscape)
        .join(',')
    );
  }
  const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transactions.csv';
  link.click();
  URL.revokeObjectURL(url);
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleString();
};

const formatAmount = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);
};

const categoriesText = (row) => {
  const list = row.categories ?? [];
  if (!list.length) return '';
  return list.map((c) => c.name).join(', ');
};

// Toolbar / selection state
const hasSelection = ref(false);
const handleAddRow = () => {
  editingRow.value = {
    id: `new-${Date.now()}`,
    datetime: new Date().toISOString(),
    type: 'expense',
    amount: '',
    description: '',
    categories: [],
    wallet: { currency: availableCurrencies.value[0] ?? 'USD', name: '' },
    party: null
  };
};
const handleDeleteSelected = () => {
  hasSelection.value = false;
};

// Editor state
const editingRow = ref(null);
const availableCurrencies = computed(() => {
  const set = new Set(props.rows.map((r) => r.wallet?.currency).filter(Boolean));
  return set.size ? [...set] : ['USD', 'EUR', 'GBP', 'JPY'];
});
const handleEditorSave = (updated) => {
  // In real app this would emit to parent/store; here just close editor
  editingRow.value = null;
};

const onKey = (e) => {
  if (e.key === 'Escape') {
    if (editingRow.value) editingRow.value = null;
    else emit('close');
  }
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKey);
});

onUnmounted(() => {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKey);
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.spreadsheet-overlay {
  position: fixed;
  inset: 0;
  background: $bg-white;
  color: $text-primary;
  z-index: $z-index-modal;
  display: flex;
  flex-direction: column;
}

.state {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 3rem 1rem;

  .error {
    color: $error-color;
  }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid $bg-light;
  border-top-color: $primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sheet-wrap {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  background: $bg-white;
}

.sheet {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  font-family: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;

  thead th {
    position: sticky;
    top: 0;
    background: $bg-slate;
    color: $text-secondary;
    text-align: left;
    padding: 6px 10px;
    font-weight: $font-semibold;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid $border-color;
    z-index: 2;

    &.sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: $primary;
      }
    }

    .th-inner {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .sort-icon {
      width: 12px;
      height: 12px;
      color: $primary;
    }
  }

  tbody td {
    padding: 4px 10px;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.05);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 320px;
  }

  tbody tr:hover {
    background: rgba(var(--color-primary-rgb), 0.04);
  }

  .col-idx {
    width: 44px;
    text-align: right;
    color: $text-muted;
    background: $bg-slate;
    position: sticky;
    left: 0;
    z-index: 1;
  }

  .col-date {
    min-width: 150px;
  }

  .col-type {
    text-transform: capitalize;
  }

  .col-amount {
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: $font-semibold;
  }

  .col-currency {
    width: 60px;
    color: $text-muted;
  }

  tfoot .totals {
    position: sticky;
    bottom: 0;
    background: $bg-slate;
    font-weight: $font-semibold;
    border-top: 2px solid $border-color;

    td {
      padding: 8px 10px;
      border-top: 1px solid $border-color;

      strong {
        margin: 0 8px;
      }

      .muted {
        color: $text-muted;
        font-weight: $font-normal;
      }
    }
  }
}

.type-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;

  &--income {
    background: var(--color-success);
  }

  &--expense {
    background: var(--color-error);
  }
}

.amt--income {
  color: var(--color-success);
}

.amt--expense {
  color: var(--color-error);
}

.refund-tag {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #b45309;
  background: rgba(255, 159, 67, 0.18);
  border: 1px solid rgba(255, 159, 67, 0.35);
  text-transform: uppercase;
}
</style>
