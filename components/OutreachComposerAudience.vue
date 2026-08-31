<template>
  <div class="audience-section">
    <label class="field">
      <span class="field__label">{{ labels.audience }}</span>
      <select :value="selectedAudience" class="field__input" @change="onAudienceChange">
        <option v-for="opt in audiences" :key="opt.value" :value="opt.value">
          {{ labels.audienceOptions[opt.value] || opt.label }}
        </option>
      </select>
    </label>

    <div v-if="selectedAudience === 'specific'" class="field">
      <span class="field__label">{{ labels.chooseRecipients }}</span>
      <input v-model="userQuery" class="field__input" :placeholder="labels.searchUsers" />
      <div class="recipients">
        <label v-for="u in filteredUsers" :key="u.id" class="recipient">
          <input
            type="checkbox"
            :checked="selectedUserIds.includes(u.id)"
            :value="u.id"
            @change="onToggle(u.id, $event.target.checked)"
          />
          <span class="recipient__text">{{ u.first_name }} {{ u.last_name }} · {{ u.email }}</span>
        </label>
        <p v-if="!filteredUsers.length" class="recipients__empty">{{ labels.noMatches }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  audiences: { type: Array, default: () => [] },
  selectedAudience: { type: String, default: 'all' },
  users: { type: Array, default: () => [] },
  selectedUserIds: { type: Array, default: () => [] },
  labels: { type: Object, required: true }
});

const emit = defineEmits(['update:selectedAudience', 'update:selectedUserIds', 'update:userIds']);

const userQuery = ref('');

const filteredUsers = computed(() => {
  const q = userQuery.value.trim().toLowerCase();
  const list = props.users;
  if (!q) return list.slice(0, 50);
  return list
    .filter((u) => `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(q))
    .slice(0, 50);
});

const onAudienceChange = (event) => {
  emit('update:selectedAudience', event.target.value);
};

const onToggle = (id, checked) => {
  const next = checked
    ? [...props.selectedUserIds, id]
    : props.selectedUserIds.filter((v) => v !== id);
  emit('update:selectedUserIds', next);
  emit('update:userIds', next);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.audience-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.field__label {
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  color: $text-secondary;
}

.field__input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  padding: 0.6rem 0.75rem;
  font-size: $font-size-sm;
  font-family: inherit;
  color: $text-primary;
  background: $bg-white;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.recipients {
  margin-top: 0.4rem;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  padding: 0.4rem;
}

.recipient {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.4rem;
  font-size: $font-size-sm;
  color: $text-primary;
  cursor: pointer;
  border-radius: $radius-md;

  &:hover {
    background: $bg-light;
  }
}

.recipient__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipients__empty {
  margin: 0;
  padding: 0.6rem;
  color: $text-muted;
  font-size: $font-size-sm;
}
</style>
