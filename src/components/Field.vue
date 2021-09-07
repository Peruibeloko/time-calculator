<template>
  <input
    class="input"
    type="tel"
    v-if="!isSign"
    :id="fieldId"
    :value="modelValue"
    :style="{ width: dynamicWidth }"
    @input="$emit('update:modelValue', +$event.target.value)"
    @keydown.exact="handleKeypress"
    @keydown.ctrl.exact="handleKeypress"
    @keydown.shift.exact="handleKeypress"
  />
  <div class="sign" v-else>
    {{ modelValue }}
  </div>
  {{ label }}
</template>

<script>
export default {
  name: 'Field',
  props: {
    label: String,
    modelValue: String,
    fieldId: String
  },
  emits: ['onMove', 'onEvaluate', 'onDelete', 'onSetSign', 'update:modelValue'],
  methods: {
    handleKeypress(evt) {
      const switchVar = `${evt.ctrlKey ? 'Ctrl ' : ''}${evt.key}`;
      switch (switchVar) {
        case '+':
          evt.preventDefault();
          this.$emit('onSetSign', '+');
          break;
        case '-':
          evt.preventDefault();
          this.$emit('onSetSign', '-');
          break;
        case 'Ctrl ArrowUp':
          this.$emit('onMove', ['up', evt]);
          break;
        case 'Ctrl ArrowDown':
          this.$emit('onMove', ['down', evt]);
          break;
        case 'Ctrl ArrowLeft':
          this.$emit('onMove', ['left', evt]);
          break;
        case 'Ctrl ArrowRight':
          this.$emit('onMove', ['right', evt]);
          break;
        case 'Ctrl Enter':
          this.$emit('onEvaluate');
          break;
        case 'Ctrl Delete':
          this.$emit('onDelete');
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
    }
  },
  computed: {
    dynamicWidth() {
      return this.modelValue.length > 3 ? `${this.modelValue.length + 0.5}rem` : '4rem';
    },
    isSign() {
      return this.modelValue === '-' || this.modelValue === '+';
    }
  }
};
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
