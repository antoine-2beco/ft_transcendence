<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>

<template>
  <div class="text-center mt-2">
    <h1>ft_transcendence</h1>

    <nav class="menu">
      <template v-if="auth.isAuthenticated">
        <RouterLink to="/game" role="button" class="w-full">Jouer</RouterLink>
        <RouterLink to="/profile" role="button" class="secondary w-full">Mon Profil</RouterLink>
        <RouterLink to="/friends" role="button" class="secondary w-full">Mes Amis</RouterLink>
        <RouterLink to="/leaderboard" role="button" class="contrast">Classement</RouterLink>
        <RouterLink to="/history" role="button" class="contrast">Historique</RouterLink>
        <button @click="auth.logout" class="contrast outline w-full">Déconnexion</button>
      </template>

      <template v-else>
        <RouterLink to="/login" role="button" class="w-full">Se connecter</RouterLink>
        <RouterLink to="/register" role="button" class="secondary outline w-full">S'inscrire</RouterLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
}
</style>
