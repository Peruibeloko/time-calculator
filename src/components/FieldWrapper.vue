<template>
  <input
    class="input"
    type="tel"
    v-if="!isSign"
    :id="fieldId"
    :style="{ width: dynamicWidth }"
    :value="modelValue"
    @input="handleInput"
    @keydown.exact="handleKeypress"
    @keydown.ctrl.exact="handleKeypress"
    @keydown.shift.exact="handleKeypress"
  />
  <div class="sign" v-else>
    {{ modelValue }}
  </div>
  {{ label }}
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  modelValue: string | number;
  fieldId: string;
}

const { fieldId, label, modelValue: inputValue } = defineProps<Props>();
const modelValue = inputValue.toString();

const emit = defineEmits(['onMove', 'onEvaluate', 'onDelete', 'onSetSign', 'update:modelValue']);

const handleInput = (evt: Event) => {
  emit('update:modelValue', +(evt.target as HTMLInputElement).value);
};

const handleKeypress = (evt: KeyboardEvent) => {
  const switchVar = `${evt.ctrlKey ? 'Ctrl ' : ''}${evt.key}`;
  switch (switchVar) {
    case 'Ctrl Enter':
      emit('onEvaluate');
      break;
    case 'Ctrl Delete':
      emit('onDelete');
      break;
    case '+':
    case '-':
      evt.preventDefault();
      emit('onSetSign', evt.key);
      break;
    case 'Ctrl ArrowUp':
    case 'Ctrl ArrowDown':
    case 'Ctrl ArrowLeft':
    case 'Ctrl ArrowRight':
      emit('onMove', [evt, evt.key.toLowerCase().replace('arrow', '')]);
      break;
    case 'Ctrl a':
    case 'Tab':
    case 'Backspace':
    case 'Delete':
    case 'Home':
    case 'End':
      break;
    default:
      if (/[^0-9]/.test(evt.key)) evt.preventDefault();
      else break;
  }
};

const dynamicWidth = computed(() => {
  return modelValue && modelValue.length > 3 ? `${modelValue.length + 0.5}rem` : '4rem';
});
const isSign = computed(() => {
  return modelValue === '-' || modelValue === '+';
});
</script>

<style scoped>
.input {
  margin: 0 1rem;

  text-align: center;
  font-size: 2rem;

  outline: none;
  border: none;
  border-bottom: 5px solid var(--darken-overlay);
  border-radius: 5px;
  background-color: transparent;
  color: var(--light);

  transition-duration: 200ms;
}

.sign {
  width: 2rem;
  text-align: center;
  font-size: 2rem;
  color: var(--light);
}

input:hover,
input:focus,
input:active {
  border-color: var(--light);
  transition-duration: 200ms;
}

.label {
  font-size: 1rem;
}
</style>
