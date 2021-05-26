<template>
  <input
    type="tel"
    pattern="[0-9]+"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown.up="$emit('onUp')"
    @keydown.down="$emit('onDown')"
    @keydown.ctrl.left="$emit('onLeft', $event)"
    @keydown.ctrl.right="$emit('onRight', $event)"
    @keydown.ctrl.enter="$emit('onEvaluate')"
    @keydown.ctrl.delete="$emit('onDelete')"
  />
  {{ label }}
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    label: '',
    modelValue: ''
  },
  emits: ['onUp', 'onDown', 'onLeft', 'onRight', 'onEvaluate', 'onDelete', 'update:modelValue']
};
</script>

<style>
input {
  font-size: 2rem;
  flex-shrink: 1;
  width: 3rem;
  margin: 0 1rem;
  text-align: center;
  border: none;
  border-bottom: 5px solid var(--darken-overlay);
  border-radius: 5px;
  background-color: transparent;
  color: var(--light);
  outline: none;
  transition-duration: 200ms;
}

input:hover,
input:focus,
input:active {
  width: 3.5rem;
  margin: 0 0.75rem;
  border-color: var(--light);
  transition-duration: 200ms;
}
</style>
