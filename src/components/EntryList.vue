<template>
  <ul>
    <entry v-for="entry in entryList" :key="entry" :entry="entry" :onConfirm="onConfirm" />
  </ul>
</template>

<script>
import Entry from './Entry.vue';

export default {
  name: 'EntryList',
  components: { Entry },
  data() {
    return {
      entryList: [
        {
          d: '',
          h: '',
          m: '',
          s: ''
        },
        {
          d: '',
          h: '',
          m: '',
          s: ''
        }
      ]
    };
  },
  methods: {
    onConfirm() {}
  }
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
