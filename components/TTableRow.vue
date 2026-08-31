<template>
  <tr>
    <td>
      <div class="date-main">{{ formatDate(txn) }}</div>
      <div class="date-sub">{{ formatTimeAgo(txn) }}</div>
    </td>
    <td>
      <span :class="['type-badge', txn.type === 'INCOME' ? 'income' : 'outcome']">{{ txn.type }}</span>
      <span v-if="txn.isTransfer" class="transfer-badge">{{ labels.transfer }}</span>
      <span v-if="txn.isRefund" class="refund-badge">{{ labels.refund }}</span>
      <span v-if="txn.isRecurring" class="recurring-badge">{{ labels.recurring }}</span>
    </td>
    <td><span class="party">{{ txn.party || '—' }}</span></td>
    <td><span :class="txn.type === 'INCOME' ? 'amount-income' : 'amount-outcome'">{{ txn.amount }}</span></td>
    <td>{{ txn.category }}</td>
    <td>
      <div class="actions">
        <button class="action-btn" @click="$emit('edit', txn)"><PencilSquareIcon class="action-icon" /></button>
        <button class="action-btn action-btn--recurring" @click="$emit('recurrent', txn)"><ArrowPathIcon class="action-icon" /></button>
        <button class="action-btn" @click="$emit('delete', txn)"><TrashIcon class="action-icon" /></button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { PencilSquareIcon, TrashIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
defineProps({
  txn: { type: Object, required: true },
  labels: { type: Object, required: true },
  formatDate: { type: Function, required: true },
  formatTimeAgo: { type: Function, required: true }
});
defineEmits(['edit', 'delete', 'recurrent']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.date-main{color:$text-primary;font-weight:$font-medium;font-size:$font-size-sm}
.date-sub{font-size:9px;font-weight:$font-normal;color:$text-muted}
.type-badge{padding:4px 12px;border-radius:$radius-md;font-weight:bold;font-size:12px;display:inline-block;&.income{background-color:rgba(var(--color-success-rgb),0.15);color:$success}&.outcome{background-color:rgba(var(--color-error-rgb),0.15);color:$error-color}}
.transfer-badge{display:inline-block;margin-left:6px;padding:2px 6px;border-radius:$radius-sm;font-size:10px;font-weight:bold;background-color:rgba(var(--color-primary-rgb),0.15);color:$primary;vertical-align:middle}
.recurring-badge{display:inline-block;margin-left:6px;padding:2px 6px;border-radius:$radius-sm;font-size:10px;font-weight:bold;background-color:rgba(var(--color-warning-rgb),0.15);color:$warning-text;vertical-align:middle}
.refund-badge{display:inline-block;margin-left:6px;padding:2px 6px;border-radius:$radius-sm;font-size:10px;font-weight:bold;background-color:rgba(var(--color-accent-rgb),0.18);color:$accent-dark;vertical-align:middle}
.party{padding:4px 8px;border-radius:$radius-md;display:inline-block}
.amount-income{color:$success;font-weight:bold}
.amount-outcome{color:$error-color;font-weight:bold}
.actions{display:flex;align-items:center;gap:8px;font-size:16px;color:$primary;cursor:pointer}
.action-btn{display:flex;align-items:center;justify-content:center;background:transparent;border:none;padding:6px;border-radius:$radius-sm;cursor:pointer;transition:all 0.2s ease;width:28px;height:28px;&:hover{background-color:rgba(var(--color-primary-rgb),0.1)}}
.action-icon{width:16px;height:16px;color:$primary;transition:color 0.2s ease;&:hover{color:$primary-dark}}
.action-btn--recurring .action-icon{color:$warning-text;&:hover{color:$warning}}
.action-btn:last-child .action-icon{color:$error-color;&:hover{color:$error-dark}}
</style>
