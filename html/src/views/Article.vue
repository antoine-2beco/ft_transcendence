<script setup>
import { defineAsyncComponent, watchEffect, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const route = useRoute();
const ArticleComponent = shallowRef(null);

watchEffect(async () => {
  const article = route.meta.article;
  if (!article) {
    ArticleComponent.value = null;
    return;
  }

  const module = await import(`@/articles/${locale.value}/${article}.vue`);
  ArticleComponent.value = module.default;
});
</script>

<template>
  <component :is="ArticleComponent" :key="locale" v-if="ArticleComponent" />
</template>

<style>
.article {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.7;
  color: #e0e0e0;
}

h1 .article {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.last-updated .article {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

h2 .article {
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #333;
}

section .article {
  margin-bottom: 1.5rem;
}

ul .article {
  padding-left: 1.5rem;
}

li .article {
  margin-bottom: 0.5rem;
}

p .article {
  margin-bottom: 0.75rem;
}
</style>