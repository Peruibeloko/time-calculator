<template>
  <form ref="entryListForm">
    <fieldset class="entry" v-for="(entry, entryIdx) in entryList" :key="entryIdx">
      <TimeEntry
        v-model="entryList[entryIdx]"
        :initialEntry="entry"
        :index="entryIdx"
        :key="entryIdx"
        @onEvaluate="evaluate"
        @changeLine="changeLine"
      />
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { Temporal } from '@js-temporal/polyfill';
import { nextTick, ref } from 'vue';
import type { Entry } from '../typings/Entry';
import TimeEntry from './TimeEntry.vue';

interface Out {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Emits {
  (event: 'onEvaluate', out: Out): void;
}

const emit = defineEmits<Emits>();

const entryListForm = ref<HTMLFormElement>();
const entryList = ref<Array<Entry>>([
  {
    sign: '+',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }
]);

const evaluate = () => {
  let tally = new Temporal.Duration();

  for (const entry of entryList.value) {
    const { sign, ...entryCleaned } = entry;

    if (entry.sign === '+') tally = tally.add(entryCleaned);
    else tally = tally.subtract(entryCleaned);

    tally = tally.round({ largestUnit: 'day', smallestUnit: 'second' });
  }

  const out = {
    days: tally.days,
    hours: tally.hours,
    minutes: tally.minutes,
    seconds: tally.seconds
  };

  emit('onEvaluate', out);
};

// const deleteEntry = (fieldName: string, entryIdxStr: number) => {
//   if (entryList.value.length === 1) return;

//   if (+entryIdxStr === 0) changeLine('down', fieldName, entryIdxStr + 1);
//   else changeLine('up', fieldName, entryIdxStr);

//   entryList.value.splice(entryIdxStr, 1);
// };

const changeLine = async (direction: string, fieldName: string, entryIdx: number) => {
  const template: Entry = {
    sign: '+',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  const isLast = entryIdx === entryList.value.length - 1;
  const isFirst = entryIdx === 0;
  const movingDown = direction === 'down';
  const movingUp = direction === 'up';
  const downFromLast = isLast && movingDown;
  const upFromFirst = isFirst && movingUp;
  const addingNewEntry = downFromLast || upFromFirst;

  let shouldWait = false;
  let targetId = '';

  if (isEntryEmpty(entryIdx) && addingNewEntry) return;

  if (movingDown) {
    targetId = `#${fieldName}-${entryIdx + 1}`;
    if (isLast) {
      entryList.value.push(template);
      shouldWait = true;
    }
  }

  if (movingUp) {
    targetId = `#${fieldName}-${entryIdx - 1}`;
    if (isFirst) {
      targetId = `#${fieldName}-${entryIdx}`;
      entryList.value.unshift(template);
      shouldWait = true;
    }
  }

  if (shouldWait) await nextTick();
  entryListForm.value!.querySelector<HTMLElement>(targetId)!.focus();
};

const isEntryEmpty = (setIndex: number) => {
  const { sign, ...entryData } = entryList.value[setIndex];
  return Temporal.Duration.from(entryData).blank;
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
fieldset {
  border: none;
}

.entry {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
}
</style>
