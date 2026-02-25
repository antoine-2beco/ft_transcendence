<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const username = ref('');
const password = ref('');
</script>

<template>
  <div class="container" style="max-width: 400px; margin-top: 10vh;">
    <article>
      <header>{{ $t("login.title")}}</header>
      <form @submit.prevent="userStore.login(username, password)">
        <label>
          {{ $t("login.username") }}
          <input type="text" v-model="username" required />
          {{ $t("login.password") }}
          <input type="password" v-model="password" required />
        </label>
        <button type="submit">{{ $t("login.submit_button") }}</button>
      </form>
      <footer class="text-center">
        <small>{{ $t("login.no_account") }} <RouterLink to="/register">{{ $t("login.register") }}</RouterLink></small>
      </footer>
    </article>
  </div>
</template>
