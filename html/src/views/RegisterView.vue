<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try {
    await auth.register(username.value, password.value);
  } catch (e) {
    error.value = e;
  }
};
</script>

<template>
  <div class="container login-container">
    <article>
      <header>Créer un compte</header>
      <form @submit.prevent="handleSubmit">
        <label>
          Choisir un Pseudo
          <input type="text" v-model="username" required />
        </label>
        <label>
          Choisir un Mot de passe
          <input type="password" v-model="password" required />
        </label>

        <small v-if="error" class="text-del">{{ error }}</small>

        <button type="submit">S'inscrire</button>
      </form>
      <footer class="text-center">
        <small>Déjà un compte ? <RouterLink to="/login">Se connecter</RouterLink></small>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.login-container { max-width: 400px; margin-top: 10vh; }
</style>
