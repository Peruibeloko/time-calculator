<template>
  <ControlsModal :isOpen="isModalOpen" @closeModal="isModalOpen = false" />
  <div class="container">
    <header class="centered">
      <h1 class="site-title">
        Time Calculator <span class="info" @click="isModalOpen = true">ⓘ</span>
      </h1>
    </header>
    <main>
      <EntryList @onEvaluate="updateResult" />
      <div class="hbar"></div>
      <section>
        <h1 class="result.value" v-if="result">Thats {{ result }}</h1>
      </section>
    </main>
    <footer class="footer">
      <div class="line">
        <a href="https://github.com/peruibeloko/time-calculator" class="source-link"
          >Check the source here!</a
        >
        <span class="separator">·</span>
        <a href="https://github.com/peruibeloko" class="source-link"
          >Check my other projects here!</a
        >
      </div>
      <div class="line">
        <small
          >Powered by the highly experimental, bleeding-edge,
          <a href="https://tc39.es/proposal-temporal/docs/" class="source-link">Temporal Object</a
          >&nbsp;proposal by TC39
        </small>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import EntryList from './components/EntryList.vue';
import ControlsModal from './components/ControlsModal.vue';
import { ref } from 'vue';

interface InputObject {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const isModalOpen = ref(false);
const result = ref('');

const updateResult = (totals: InputObject) => {
  let count = Object.values(totals).filter(el => el > 0).length;

  result.value = '';
  if (totals.days) {
    count--;
    result.value += totals.days + ' days';
    if (count == 1) result.value += ' and';
    else if (count > 1) result.value += ',';
  }

  if (totals.hours) {
    count--;
    result.value += ' ' + totals.hours + ' hours';
    if (count == 1) result.value += ' and';
    else if (count > 1) result.value += ',';
  }

  if (totals.minutes) {
    count--;
    result.value += ' ' + totals.minutes + ' minutes';
    if (count == 1) result.value += ' and';
    else if (count > 1) result.value += ',';
  }

  if (totals.seconds) {
    count--;
    result.value += ' ' + totals.seconds + ' seconds';
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=KoHo&display=swap');

:root {
  --dark: hsl(0, 0%, 10%);
  --light: hsl(41, 100%, 89%);
  --darker-light: hsl(41, 100%, 69%);
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

.result.value {
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
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.line {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.source-link {
  color: var(--light);
}

.source-link:visited {
  color: var(--darker-light);
}

.separator {
  padding: 0 1rem;
  font-size: 2rem;
}

.info {
  font-size: medium;
  vertical-align: super;
  cursor: pointer;
}
</style>
