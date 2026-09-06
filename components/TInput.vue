<template>
  <div
    class="t-input-wrapper"
    :class="[
      `t-input--${size}`,
      {
        't-input--disabled': disabled,
        't-input--error': !!error,
        't-input--focused': isFocused,
        't-input--full-width': fullWidth
      }
    ]"
  >
    <span v-if="$slots.prefix" class="t-input-prefix">
      <slot name="prefix" />
    </span>

    <input
      :id="id"
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      :autocomplete="autocomplete"
      class="t-input-element"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="$emit('keydown', $event)"
    />

    <span v-if="$slots.suffix" class="t-input-suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  error: {
    type: [Boolean, String],
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  autocomplete: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'keydown']);

const inputRef = ref(null);
const isFocused = ref(false);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

const handleFocus = (event) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event) => {
  isFocused.value = false;
  emit('blur', event);
};

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  inputRef
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.t-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  color: $text-primary;
  transition: border-color $duration-fast $easing-standard, box-shadow $duration-fast $easing-standard, width $duration-base $easing-standard;
  box-sizing: border-box;

  &--focused {
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba(4, 120, 68, 0.15);
  }

  &--error {
    border-color: $error-color;

    &.t-input--focused {
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.15);
    }
  }

  &--disabled {
    background: $bg-light;
    cursor: not-allowed;
    opacity: 0.7;

    .t-input-element {
      cursor: not-allowed;
    }
  }

  &--full-width {
    width: 100%;
  }

  // Sizes
  &--small {
    padding: 0 $spacing-2;
    min-height: 28px;
    font-size: $font-size-xs;

    .t-input-element {
      padding: 4px $spacing-1;
      font-size: $font-size-xs;
    }
  }

  &--medium {
    padding: 0 $spacing-3;
    min-height: 38px;
    font-size: $font-size-sm;

    .t-input-element {
      padding: 8px $spacing-1;
      font-size: $font-size-sm;
    }
  }

  &--large {
    padding: 0 $spacing-4;
    min-height: 46px;
    font-size: $font-size-base;

    .t-input-element {
      padding: 10px $spacing-2;
      font-size: $font-size-base;
    }
  }
}

.t-input-element {
  flex: 1;
  width: 100%;
  min-width: 0;
  border: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: $text-muted;
  }
}

.t-input-prefix,
.t-input-suffix {
  display: inline-flex;
  align-items: center;
  color: $text-muted;
  flex-shrink: 0;
}

.t-input-prefix {
  margin-right: $spacing-1;
}

.t-input-suffix {
  margin-left: $spacing-1;
}
</style>
