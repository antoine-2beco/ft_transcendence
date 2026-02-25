<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

const i18n = useI18n();
const isFr = ref(false);

const toggleLang= () => {
  isFr.value = !isFr.value;
  const lang = isFr.value ? 'fr' : 'en';
  i18n.locale.value = lang;
  localStorage.setItem('lang', lang);
};

onMounted(() => {
  const saved = localStorage.getItem('lang');

  if (saved === 'fr' || !saved) {
    isFr.value = true;
    i18n.locale.value = 'fr';
  }
});
</script>

<template>
  <button @click="toggleLang" class="outline contrast">
    {{ isFr ? '🇫🇷' : '🇬🇧' }}
  </button>
</template>