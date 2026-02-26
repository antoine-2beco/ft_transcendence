<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();
const lang = ref('en');

const emoji_lang = {
  'fr' : '🇫🇷',
  'en' : '🇬🇧',
  'nl' : '🇳🇱'
}

const displayLang = computed(() => emoji_lang[lang.value]);

const toggleLang = () => {
  if (lang.value === 'fr') lang.value = 'en';
  else if (lang.value === 'en') lang.value = 'nl';
  else if (lang.value === 'nl') lang.value = 'fr';
  locale.value = lang.value;
  localStorage.setItem('lang', lang.value);
};

onMounted(() => {
  const saved = localStorage.getItem('lang');
  if (saved && ['fr', 'en', 'nl'].includes(saved)) {
    lang.value = saved;
  } else {
    lang.value = 'en';
  }
  locale.value = lang.value;
});
</script>

<template>
  <button @click="toggleLang" class="outline contrast">
    {{ displayLang }}
  </button>
</template>