<template>
  <form ref="entryListForm">
    <fieldset class="entry" v-for="(entry, entryIdx) in entryList" :key="entryIdx">
      <Field
        :label="labels[fieldName]"
        :key="`${fieldName}-${entryIdx}`"
        :fieldId="`${fieldName}-${entryIdx}`"
        v-model="entryList[entryIdx][fieldName]"
        v-for="(fieldValue, fieldName) of entry"
        @onSetSign="setSign($event, `${fieldName}-${entryIdx}`)"
        @onMove="moveCursor($event[0], $event[1], `${fieldName}-${entryIdx}`)"
        @onEvaluate="evaluate"
        @onDelete="deleteEntry(`${fieldName}-${entryIdx}`)"
      />
    </fieldset>
  </form>
</template>

<script>
import Field from './Field.vue';
import { Temporal } from '@js-temporal/polyfill';

export default {
  name: 'EntryList',
  components: { Field },
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
      ],
      labels: {
        days: 'days',
        hours: 'h',
        minutes: 'min',
        seconds: 's'
      }
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

      const out = {};
      out.days = tally.days;
      out.hours = tally.hours;
      out.minutes = tally.minutes;
      out.seconds = tally.seconds;

      this.$emit('onEvaluate', out);
    },
    deleteEntry(key) {
      const [fieldName, entryIdxStr] = key.split('-');
      if (this.entryList.length === 1) return;

      if (+entryIdxStr === 0) this.changeLine('down', `${fieldName}-${entryIdxStr + 1}`);
      else this.changeLine('up', `${fieldName}-${entryIdxStr}`);

      this.entryList.splice(entryIdxStr, 1);
    },
    changeLine(direction, key) {
      const template = {
        sign: '+',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      const [fieldName, entryIdxStr] = key.split('-');
      const entryIdx = +entryIdxStr;

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

      if (shouldWait) {
        this.$nextTick(() => {
          this.$refs.entryListForm.querySelector(targetId).focus();
        });
      } else {
        this.$refs.entryListForm.querySelector(targetId).focus();
      }
    },
    moveCursor(direction, event, key) {
      switch (direction) {
        case 'up':
        case 'down':
          this.changeLine(direction, key);
          break;
        case 'left':
          event.target.previousElementSibling?.focus();
          break;
        case 'right':
          event.target.nextElementSibling?.focus();
          break;
      }
    },
    setSign(sign, key) {
      const idx = key.split('-')[1];
      this.entryList[idx]['sign'] = sign;
    },
    isEntryEmpty(setIndex) {
      // eslint-disable-next-line no-unused-vars
      const { sign, ...entryData } = this.entryList[setIndex];
      return Temporal.Duration.from(entryData).blank;
    }
  }
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
