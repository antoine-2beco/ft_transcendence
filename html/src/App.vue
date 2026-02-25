<script setup>
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch.vue'
import LangSwitch from './components/LangSwitch.vue'
</script>

<template>
  <div class="switches">
    <LangSwitch />
    <ThemeSwitch />
  </div>

  <main class="container">
    <RouterView />
  </main>
</template>


<style scoped>
.switches {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: line;
  gap: 0.75rem;
  z-index: 1000;
}

.switches button {
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>