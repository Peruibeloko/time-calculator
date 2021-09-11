<template>
  <FieldWrapper
    v-for="(fieldValue, fieldName) of entry"
    :label="labels[fieldName]"
    :key="`${fieldName}-${index}`"
    :fieldId="`${fieldName}-${index}`"
    v-model="entry[fieldName]"
    @onSetSign="s => (entry.sign = s)"
    @onMove="moveCursor($event[0], $event[1], fieldName)"
    @onEvaluate="$emit('onEvaluate')"
    @onDelete="$emit('deleteEntry', fieldName, index)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Entry from '../typings/Entry';

import FieldWrapper from './FieldWrapper.vue';

export default defineComponent({
  name: 'TimeEntry',
  components: { FieldWrapper },
  props: {
    index: {
      type: Number,
      required: true
    },
    initialEntry: {
      type: Object as PropType<Entry>,
      required: true
    }
  },
  emits: ['onEvaluate', 'deleteEntry', 'update:modelValue', 'changeLine'],
  data() {
    return {
      entry: {} as Entry,
      labels: {
        sign: '',
        days: 'days',
        hours: 'h',
        minutes: 'min',
        seconds: 's'
      }
    };
  },
  mounted() {
    this.entry = this.initialEntry;
  },
  methods: {
    moveCursor(event: Event, direction: string, fieldName: string) {
      switch (direction) {
        case 'up':
        case 'down':
          this.$emit('changeLine', direction, fieldName, this.index);
          break;
        case 'left':
          this.$nextTick(() => {
            ((event.target as HTMLElement)?.previousElementSibling as HTMLElement).focus();
          });
          break;
        case 'right':
          this.$nextTick(() => {
            ((event.target as HTMLElement).nextElementSibling as HTMLElement).focus();
          });
          break;
      }
    }
  }
});
</script>

<style scoped></style>
