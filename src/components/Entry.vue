<template>
  <li class="entry">
    <input ref="days" v-model="dd" type="tel" pattern="[0-9]+" @keypress.ctrl.enter="confirm" />
    days
    <input v-model="hh" type="tel" pattern="[0-9]+" @keypress.ctrl.enter="confirm" />
    hrs
    <input v-model="min" type="tel" pattern="[0-9]+" @keypress.ctrl.enter="confirm" />
    mins
    <input v-model="ss" type="tel" pattern="[0-9]+" @keypress.ctrl.enter="confirm" />
    seconds
  </li>
</template>

<script>
export default {
  name: 'Entry',
  props: {
    entry: {
      d: '',
      h: '',
      m: '',
      s: ''
    },
    onConfirm: () => {}
  },
  methods: {
    confirm() {
      this.onConfirm();
    }
  }
};
</script>

<style scoped>
.entry {
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.5rem 0;
}

.entry input {
  font-size: 2rem;
  flex-shrink: 1;
  width: 5rem;
  text-align: center;
  border: none;
  background-color: transparent;
  color: var(--light);
  outline: none;
}
</style>
