<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = "Format d'email invalide (ex: nom@domaine.com)";
    return;
  }

  try {
    await auth.register(username.value, email.value, password.value);
  } catch (e) {
    error.value = e;
  }
};
</script>

<template>
  <div class="container" style="max-width: 400px; margin-top: 10vh;">
    <article>
      <header>Créer un compte</header>
      <form @submit.prevent="handleSubmit" novalidate>
        <label>
          Pseudo
          <input type="text" v-model="username" required />
        </label>

        <label>
          Email
          <input type="email" v-model="email" required />
        </label>

        <label>
          Mot de passe
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
