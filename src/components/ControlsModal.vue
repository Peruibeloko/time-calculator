<template>
  <teleport to="#modal-anchor">
    <transition name="fade">
      <div class="modal" v-if="isOpen">
        <header>
          <h1>Controls</h1>
          <button type="button" @click="$emit('closeModal')">X</button>
        </header>
        <div class="divider"></div>
        <main>
          <ul>
            <li class="item lv1">
              <code>Ctrl + Directional Arrows</code>
              - Movement between fields, creates new entries as needed
              <ul>
                <li class="item lv2">
                  Usual form movement works as well (<code>Tab</code> and <code>Shift + Tab</code>)
                </li>
              </ul>
            </li>

            <li class="item lv1">
              <code>Ctrl + Enter</code>
              - Evaluates the result
            </li>

            <li class="item lv1">
              <code>Ctrl + Delete</code>
              - Removes the currently selected entry from the list
            </li>
          </ul>
        </main>
      </div>
    </transition>
    <transition name="fade">
      <div class="backdrop" v-if="isOpen" @click="$emit('closeModal')"></div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

const emit = defineEmits(['closeModal']);
const { isOpen = false } = defineProps<Props>();
</script>

<style scoped>
.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.modal {
  z-index: 1;
  position: absolute;
  width: 35%;
  max-width: 45rem;
  min-width: 15rem;
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  border-radius: 1rem;
  border: 2px solid var(--light);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--light);
}

.modal header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-family: 'KoHo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal header button {
  font-size: 1rem;
  height: 2rem;
  width: 2rem;
}

.modal main {
  padding: 2rem;
  padding-top: 0;
}

.item {
  list-style: none;
  font-family: 'KoHo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 0.5rem;
}

.item code {
  padding: 0.3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.3rem;
}
.lv2 {
  font-size: 0.7rem;
}

.modal button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  color: var(--light);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: 100ms;
}

.modal button:hover {
  background-color: var(--light);
  color: var(--dark);
  transition: 100ms;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
