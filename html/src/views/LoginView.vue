<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try { await auth.login(username.value, password.value); }
  catch (e) { void (e); error = true;}
};
</script>

<template>
  <div class="container" style="max-width: 400px; margin-top: 10vh;">
    <article>
      <header>{{ $t("login.title")}}</header>
      <form @submit.prevent="handleSubmit">
        <label>
          {{ $t("login.username") }}
          <input type="text" v-model="username" required />
          {{ $t("login.pseudo") }}
          <input type="text" v-model="username" required />
        </label>
        <label>
          {{ $t("login.password") }}
          <input type="password" v-model="password" required />
        </label>
        <small v-if="error" style="color: var(--pico-del-color)">{{ $t("login.bad_entries") }}</small>
        <button type="submit">{{ $t("login.submit_button") }}</button>
      </form>
    </article>
  </div>
</template>
