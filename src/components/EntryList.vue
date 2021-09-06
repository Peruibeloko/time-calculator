<template>
  <form ref="entryListForm">
    <fieldset class="entry" v-for="(entry, entryIdx) in entryList" :key="entryIdx">
      <Field
        :key="fieldName + '-' + entryIdx"
        :label="labels[fieldName]"
        :fieldId="fieldName + '-' + entryIdx"
        v-model="entryList[entryIdx][fieldName]"
        v-for="(value, fieldName, fieldIndex) of entry"
        @onSetSign="setSign($event, `${fieldName}-${entryIdx}`)"
        @onMove="moveCursor($event[0], $event[1], `${fieldName}-${entryIdx}`)"
        @onEvaluate="confirm"
        @onDelete="deleteEntry(entryIdx, fieldIndex + 1)"
      />
    </fieldset>
  </form>
</template>

<script>
import Field from './Field.vue';

export default {
  name: 'EntryList',
  components: { Field },
  emits: ['onEvaluate'],
  data() {
    return {
      entryList: [
        {
          sign: '+',
          days: '',
          hours: '',
          minutes: '',
          seconds: ''
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
    confirm() {
      const signHelper = { '+': 1, '-': -1 };
      console.log(this.entryList);
      const sumUp = this.entryList.reduce(
        (acc, cur) => ({
          days: +acc.days + +cur.days * signHelper[cur.sign],
          hours: +acc.hours + +cur.hours * signHelper[cur.sign],
          minutes: +acc.minutes + +cur.minutes * signHelper[cur.sign],
          seconds: +acc.seconds + +cur.seconds * signHelper[cur.sign]
        }),
        {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      );

      sumUp.minutes += Math.floor(sumUp.seconds / 60);
      sumUp.seconds = sumUp.seconds % 60;

      sumUp.hours += Math.floor(sumUp.minutes / 60);
      sumUp.minutes = sumUp.minutes % 60;

      sumUp.days += Math.floor(sumUp.hours / 24);
      sumUp.hours = sumUp.hours % 24;

      this.$emit('onEvaluate', sumUp);
    },
    deleteEntry(setIndex, fieldIndex) {
      if (this.entryList.length === 1) return;

      if (setIndex === 0) this.changeLine(setIndex - 1, fieldIndex, 'down');
      else this.changeLine(setIndex, fieldIndex, 'up');

      this.entryList.splice(setIndex, 1);
    },
    changeLine(direction, key) {
      const template = {
        sign: '+',
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
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
      return Object.values(this.entryList[setIndex]).join('').length === 1;
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
