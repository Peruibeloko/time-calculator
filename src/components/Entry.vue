<template>
  <input
    class="input"
    type="tel"
    pattern="[0-9]+"
    :value="modelValue"
    :style="{ width: dynamicWidth }"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown.up="$emit('onUp')"
    @keydown.down="$emit('onDown')"
    @keydown.enter.exact="$emit('onDown')"
    @keydown.ctrl.left.exact="$emit('onLeft', $event)"
    @keydown.ctrl.right.exact="$emit('onRight', $event)"
    @keydown.ctrl.enter="$emit('onEvaluate')"
    @keydown.ctrl.delete="$emit('onDelete')"
  />
  {{ label }}
</template>

<script>
export default {
  name: 'Entry',
  props: {
    label: '',
    modelValue: ''
  },
  emits: ['onUp', 'onDown', 'onLeft', 'onRight', 'onEvaluate', 'onDelete', 'update:modelValue'],
  computed: {
    dynamicWidth() {
      return this.modelValue.length > 3 ? `${this.modelValue.length + 0.5}rem` : '4rem';
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
