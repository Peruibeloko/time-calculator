<template>
  <form ref="entryListForm">
    <fieldset
      class="entry"
      v-for="(entry, entryIdx) in entryList"
      :key="entryIdx"
    >
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

<script lang="ts">
import { defineComponent } from 'vue';

import { Temporal } from '@js-temporal/polyfill';

import Entry from '../typings/Entry';

import TimeEntry from './TimeEntry.vue';

export default defineComponent({
  name: 'EntryList',
  components: { TimeEntry },
  emits: ['onEvaluate'],
  data() {
    return {
      entryList: [
        {
          sign: '+',
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      ] as Entry[]
    };
  },
  methods: {
    evaluate() {
      let tally = new Temporal.Duration();

      for (const entry of this.entryList) {
        // eslint-disable-next-line no-unused-vars
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

      this.$emit('onEvaluate', out);
    },
    deleteEntry(fieldName: string, entryIdxStr: number) {
      if (this.entryList.length === 1) return;

      if (+entryIdxStr === 0) this.changeLine('down', fieldName, entryIdxStr + 1);
      else this.changeLine('up', fieldName, entryIdxStr);

      this.entryList.splice(entryIdxStr, 1);
    },
    changeLine(direction: string, fieldName: string, entryIdx: number) {
      const template: Entry = {
        sign: '+',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      const isLast = entryIdx === this.entryList.length - 1;
      const isFirst = entryIdx === 0;
      const movingDown = direction === 'down';
      const movingUp = direction === 'up';

      let shouldWait = false;
      let targetId = '';

      if (((isLast && movingDown) || (isFirst && movingUp)) && this.isEntryEmpty(entryIdx)) return;

      if (movingDown) {
        targetId = `#${fieldName}-${entryIdx + 1}`;
        if (isLast) {
          this.entryList.push(template);
          shouldWait = true;
        }
      }

      if (movingUp) {
        targetId = `#${fieldName}-${entryIdx - 1}`;
        if (isFirst) {
          targetId = `#${fieldName}-${entryIdx}`;
          this.entryList.unshift(template);
          shouldWait = true;
        }
      }

      const entryListForm = this.$refs.entryListForm as HTMLFormElement;
      if (shouldWait) {
        this.$nextTick(() => {
          (entryListForm.querySelector(targetId) as HTMLElement).focus();
        });
      } else {
        (entryListForm.querySelector(targetId) as HTMLElement).focus();
      }
    },
    isEntryEmpty(setIndex: number) {
      // eslint-disable-next-line no-unused-vars
      const { sign, ...entryData } = this.entryList[setIndex];
      return Temporal.Duration.from(entryData).blank;
    }
  }
});
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
