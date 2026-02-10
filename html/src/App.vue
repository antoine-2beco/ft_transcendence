<script setup>
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch.vue'
</script>

<template>
  <ThemeSwitch />

  <main class="container">
    <RouterView />
  </main>
</template>
