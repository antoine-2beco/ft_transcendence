<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';

  try {
    await auth.login(username.value, password.value);
  } catch (e) {
    error.value = "Identifiant ou mot de passe incorrect";
  }
};
</script>

<template>
  <div class="container" style="max-width: 400px; margin-top: 10vh;">
    <article>
      <header>Se connecter</header>
      <form @submit.prevent="handleSubmit">
        <label>
          Pseudo
          <input type="text" v-model="username" required />
        </label>

        <label>
          Mot de passe
          <input type="password" v-model="password" required />
        </label>

        <small v-if="error" class="text-del">{{ error }}</small>

        <button type="submit">Se connecter</button>
      </form>
      <footer class="text-center">
        <small>Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink></small>
      </footer>
    </article>
  </div>
</template>
