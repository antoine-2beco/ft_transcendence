<script setup>
import { useRouter } from 'vue-router'
import { watchEffect, ref } from 'vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import LangSwitch from './components/LangSwitch.vue'
import Footer from './components/Footer.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const page = ref(router.currentRoute.value.name);
const title = ref('');

watchEffect(async () => {
  page.value = router.currentRoute.value.name;
  if (t(`${page.value}.title`) === `${page.value}.title`)
    title.value = t('head.title');
  else
    title.value = t(`${page.value}.title`);
})

</script>

<template>
  <div class="text-center mt-2" :key="title">
    <h1>{{ title }}</h1>
  </div>

  <div class="switches">
    <LangSwitch />
    <ThemeSwitch />
  </div>

  <main class="container">
    <RouterView />
  </main>

  <footer>
    <Footer />
  </footer>
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