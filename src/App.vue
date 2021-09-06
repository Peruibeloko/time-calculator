<template>
  <div class="container">
    <header class="centered">
      <h1 class="site-title">Time Calculator</h1>
    </header>
    <main>
      <entry-list @onEvaluate="updateResult" />
      <div class="hbar"></div>
      <section>
        <h1 class="result" v-if="result">Thats {{ result }}</h1>
      </section>
    </main>
    <footer class="footer">
      <a href="https://github.com/peruibeloko/time-calculator" class="source-link"
        >Check the source here!</a
      >
      <span class="separator">·</span>
      <a href="https://github.com/peruibeloko" class="source-link">Check my other projects here!</a>
    </footer>
  </div>
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
  --darken-overlay: rgba(0, 0, 0, 0.4);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  text-align: center;
}

#app {
  background-color: var(--dark);
  color: var(--light);
  font-family: 'KoHo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(min-content, max-content);
  min-height: 100vh;
}

.site-title {
  padding: 5rem 0;
  font-size: 3rem;
}

.result {
  padding: 2rem 0;
}

.hbar {
  background-color: var(--darken-overlay);
  width: 80%;
  max-width: 45rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 auto;
}

.footer {
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.source-link {
  color: var(--light);
}

.separator {
  padding: 0 1rem;
  font-size: 2rem;
}
</style>
