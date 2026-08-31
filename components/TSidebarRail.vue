<template>
  <nav class="sidebar-rail" :class="{ 'sidebar-rail--compact': collapsed }">
    <ul>
      <li v-for="item in items" :key="item.to">
        <button
          type="button"
          class="nav-button"
          :class="{
            'nav-button--with-subtext': !collapsed && item.hint,
            'nav-button--compact': collapsed,
            selected: activeId === item.to || activeId.startsWith(item.to + '/')
          }"
          :title="collapsed ? `${labels[item.labelKey] || item.label}: ${labels[item.hintKey] || item.hint || ''}` : undefined"
          @click="$emit('select', item.to)"
        >
          <component :is="item.icon" class="icon" />
          <div v-if="!collapsed && item.hint" class="nav-copy">
            <span class="text">{{ labels[item.labelKey] || item.label }}</span>
            <span class="subtext">{{ labels[item.hintKey] || item.hint }}</span>
          </div>
          <span v-else-if="!collapsed" class="text">{{ labels[item.labelKey] || item.label }}</span>
          <span v-else class="compact-label">{{ labels[item.labelKey] || item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  activeId: { type: String, default: '' },
  collapsed: { type: Boolean, default: false },
  labels: { type: Object, default: () => ({}) }
});

defineEmits(['select']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.sidebar-rail {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 8px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  li {
    width: 100%;
  }

  .nav-button {
    display: flex;
    align-items: center;
    width: calc(100% - 20px);
    min-height: 44px;
    border-radius: $radius-xl;
    padding: 8px 10px;
    gap: 12px;
    background-color: transparent;
    border: none;
    color: $text-secondary;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px;
    position: relative;
    text-decoration: none;

    &:hover:not(.selected) {
      background-color: rgba(var(--color-primary-rgb), 0.15);
    }

    &.selected {
      background-color: $primary-light;

      .subtext {
        color: $text-secondary;
      }
    }
  }

  .nav-button--with-subtext {
    align-items: flex-start;
  }

  .nav-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .text {
    font-size: $font-size-sm;
    line-height: 1.2;
    color: inherit;
  }

  .subtext {
    font-size: $font-size-xs;
    line-height: 1.35;
    color: $text-muted;
  }

  .icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &--compact .nav-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    padding: 8px 4px;
    margin-left: 6px;
    margin-right: 6px;
    width: calc(100% - 12px);
    min-height: 56px;

    .icon {
      width: 22px;
      height: 22px;
      margin-top: 0;
    }

    .compact-label {
      font-size: 10px;
      line-height: 1.1;
      font-weight: $font-medium;
      text-align: center;
      color: inherit;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
