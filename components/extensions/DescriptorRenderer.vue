<template>
  <TCard v-if="variant === 'default'" class="ext-card">
    <div class="ext-card-head">
      <span class="ext-card-icon"><Puzzle :size="20" /></span>
      <h3 class="ext-card-title">{{ card?.title || integration.name }}</h3>
      <span v-if="!contribution.configured" class="ext-card-badge">Needs setup</span>
    </div>
    <p v-if="card?.description || integration.description" class="ext-card-desc">
      {{ card?.description || integration.description }}
    </p>
    <TButton
      v-if="card?.cta"
      :text="card.cta"
      variant="outline"
      size="small"
      :full-width="false"
      @click="$emit('action', contribution)"
    />
  </TCard>
  <TCard v-else class="ext-fallback">
    <span class="ext-card-title">{{ integration.name }}</span>
  </TCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Puzzle } from 'lucide-vue-next';
import TCard from '../TCard.vue';
import TButton from '../TButton.vue';
import type { SlotContribution } from '../../types/integration';

const props = defineProps<{ contribution: SlotContribution }>();
defineEmits<{ action: [SlotContribution] }>();

const integration = computed(() => props.contribution.integration);
const ui = computed(() => props.contribution.ui);
const card = computed(() => ui.value.card);
const variant = computed(() => 'default');
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;
.ext-card-head { display: flex; align-items: center; gap: $spacing-3; margin-bottom: $spacing-2; }
.ext-card-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: $radius-lg; background: $primary-light; color: $primary; }
.ext-card-title { font-size: $font-size-base; font-weight: $font-semibold; color: $text-primary; margin: 0; }
.ext-card-badge { margin-left: auto; font-size: $font-size-xs; color: $text-muted; background: $bg-gray; border-radius: 999px; padding: 2px 8px; }
.ext-card-desc { font-size: $font-size-sm; color: $text-secondary; margin: 0 0 $spacing-4; }
</style>
