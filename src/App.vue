<template>
  <main>
    <header class="centered">
      <h1 class="site-title">Time Calculator</h1>
    </header>
    <entry-list @onEvaluate="updateResult" />
    <div class="hbar"></div>
    <section>
      <h1 class="result" v-if="result">Thats {{ result }}</h1>
    </section>
  </main>
</template>

<script>
import EntryList from './components/EntryList';

export default {
  name: 'App',
  components: {
    EntryList
  },
  data() {
    return {
      result: ''
    };
  },
  methods: {
    updateResult(totals) {
      let count = Object.values(totals).filter(el => el > 0).length;
      console.log(totals, count);

      this.result = '';
      if (totals.days) {
        count--;
        this.result += totals.days + ' days';
        if (count == 1) this.result += ' and';
        else if (count > 1) this.result += ',';
      }

      if (totals.hours) {
        count--;
        this.result += ' ' + totals.hours + ' hours';
        if (count == 1) this.result += ' and';
        else if (count > 1) this.result += ',';
      }

      if (totals.minutes) {
        count--;
        this.result += ' ' + totals.minutes + ' minutes';
        if (count == 1) this.result += ' and';
        else if (count > 1) this.result += ',';
      }

      if (totals.seconds) {
        count--;
        this.result += ' ' + totals.seconds + ' seconds';
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=KoHo&display=swap');

:root {
  --dark: hsl(0, 0%, 10%);
  --light: hsl(41, 100%, 89%);
  --darken-overlay: rgba(0, 0, 0, 0.274);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  text-align: center;
}

header h1 {
  font-size: 3rem;
}

#app {
  background-color: var(--dark);
  color: var(--light);
  height: 100vh;
  font-family: 'KoHo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.site-title {
  padding: 5rem 0;
}

.result {
  padding: 2rem 0;
}

.hbar {
  background-color: rgba(0, 0, 0, 0.274);
  width: 80%;
  height: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 auto;
}
</style>
