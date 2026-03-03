<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const userStore = useUserStore();
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = t("register.bad_email");
    return;
  }
  await userStore.register(username.value, email.value, password.value);
};
</script>

<template>
  <div class="container" style="max-width: 400px; margin-top: 10vh;">
    <article>
      <header>{{ $t("register.title") }}</header>
      <form @submit.prevent="handleSubmit" novalidate>
        <label>
          {{ $t("register.username") }}
          <input type="text" v-model="username" required />
        </label>

        <label>
          {{ $t("register.email") }}
          <input type="email" v-model="email" required />
        </label>

        <label>
          {{ $t("register.password") }}
          <input type="password" v-model="password" required />
        </label>

        <small v-if="error" class="text-del">{{ error }}</small>

        <button type="submit">{{ $t("register.submit_button") }}</button>
      </form>
      <footer class="text-center">
        <small>{{ $t("register.already_account") }} <RouterLink to="/login">{{ $t("register.login") }}</RouterLink></small>
      </footer>
    </article>
    <RouterLink to="/" role="button" class="secondary outline w-full">{{ $t("head.back") }}</RouterLink>
  </div>
</template>
