<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

onMounted(() => {
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && systemDark)) {
    isDark.value = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});
</script>

<template>
  <button @click="toggleTheme" class="outline contrast">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>