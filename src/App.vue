<template>
  <header>
    <h1>Time Calculator</h1>
    <small>(Just start typing)</small>
  </header>
  <entry-list />
</template>

<script>
import EntryList from './components/EntryList';

export default {
  name: 'App',
  components: {
    EntryList
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=KoHo&display=swap');

:root {
  --dark: hsl(0, 0%, 10%);
  --light: hsl(41, 100%, 89%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-color: var(--dark);
  color: var(--light);
  height: 100vh;
  font-family: 'KoHo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  text-align: center;
  padding: 5rem 0;
}

header h1 {
  font-size: 3rem;
}

header small {
  font-size: 1rem;
}
</style>
