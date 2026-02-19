<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try { await auth.login(username.value, password.value); }
  catch (e) { void (e); error.value = "Identifiants incorrects"; }
};
</script>

<template>
  <div class="container" style="max-width: 400px; margin-top: 10vh;">
    <article>
      <header>Connexion</header>
      <form @submit.prevent="handleSubmit">
        <label>
          Username
          <input type="text" v-model="username" placeholder="Username" required />
          Pseudo <input type="text" v-model="username" required />
        </label>
        <label>
          Mot de passe <input type="password" v-model="password" required />
        </label>
        <small v-if="error" style="color: var(--pico-del-color)">{{ error }}</small>
        <button type="submit">Se connecter</button>
      </form>
    </article>
  </div>
</template>
