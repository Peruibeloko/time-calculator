<template>
  <FieldWrapper
    v-for="(_, fieldName) of entry"
    :label="labels[fieldName]"
    :key="`${fieldName}-${index}`"
    :fieldId="`${fieldName}-${index}`"
    v-model="entry![fieldName]"
    @onSetSign="s => (entry!.sign = s)"
    @onMove="moveCursor($event[0], $event[1], fieldName)"
    @onEvaluate="emit('onEvaluate')"
    @onDelete="emit('deleteEntry', fieldName, index)"
  />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import type { Entry } from '../typings/Entry';

import FieldWrapper from './FieldWrapper.vue';

interface Props {
  index: number;
  initialEntry: Entry;
}

const { index, initialEntry } = defineProps<Props>();
const emit = defineEmits(['onEvaluate', 'deleteEntry', 'update:modelValue', 'changeLine']);
const entry = ref<Entry>();
const labels = ref({
  sign: '',
  days: 'days',
  hours: 'h',
  minutes: 'min',
  seconds: 's'
});

onMounted(() => {
  entry.value = initialEntry;
});

const moveCursor = async (event: Event, direction: string, fieldName: string) => {
  switch (direction) {
    case 'up':
    case 'down':
      emit('changeLine', direction, fieldName, index);
      break;
    case 'left':
      await nextTick();
      ((event.target! as HTMLElement).previousElementSibling! as HTMLElement).focus();
      break;
    case 'right':
      await nextTick();
      ((event.target! as HTMLElement).nextElementSibling! as HTMLElement).focus();
      break;
  }
};
</script>

<style scoped></style>
