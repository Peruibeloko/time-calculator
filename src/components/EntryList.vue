<template>
  <form ref="entryListForm">
    <fieldset class="entry" v-for="(entry, setIndex) in entryList" :key="setIndex">
      <custom-input
        v-model="entryList[setIndex][key]"
        v-for="(value, key, fieldIndex) of entry"
        :key="key + '-' + setIndex"
        :label="labels[key]"
        @onEvaluate="confirm"
        @onUp="moveCursor(setIndex, fieldIndex + 1, 'up')"
        @onDown="moveCursor(setIndex, fieldIndex + 1, 'down')"
        @onLeft="$event.target.previousElementSibling.focus()"
        @onRight="$event.target.nextElementSibling.focus()"
        @onDelete="deleteEntry(setIndex, fieldIndex + 1)"
      />
    </fieldset>
  </form>
</template>

<script>
import CustomInput from './CustomInput.vue';

export default {
  name: 'EntryList',
  components: { CustomInput },
  emits: ['onEvaluate'],
  data() {
    return {
      entryList: [
        {
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
      const sumUp = this.entryList.reduce(
        (acc, cur) => ({
          days: +acc.days + +cur.days,
          hours: +acc.hours + +cur.hours,
          minutes: +acc.minutes + +cur.minutes,
          seconds: +acc.seconds + +cur.seconds
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

      if (setIndex === 0) this.moveCursor(setIndex - 1, fieldIndex, 'down');
      else this.moveCursor(setIndex, fieldIndex, 'up');

      this.entryList.splice(setIndex, 1);
    },
    moveCursor(setIndex, fieldIndex, direction) {
      let shouldWait = false;
      let newElIndex = (setIndex + (direction === 'down' ? 1 : -1)) * 5 + fieldIndex;
      const template = {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
      };

      if (direction === 'down' && setIndex === this.entryList.length - 1) {
        this.entryList.push(template);
        shouldWait = true;
      }

      if (direction === 'up' && setIndex === 0) {
        this.entryList.unshift(template);
        newElIndex = fieldIndex;
        shouldWait = true;
      }

      if (shouldWait) {
        this.$nextTick(() => {
          this.$refs.entryListForm[newElIndex].focus();
        });
      } else {
        this.$refs.entryListForm[newElIndex].focus();
      }
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
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.5rem 0;
}
</style>
