<script setup>
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <ThemeSwitch />

  <main class="container">
    <RouterView />
  </main>
  <Footer />
</template>
