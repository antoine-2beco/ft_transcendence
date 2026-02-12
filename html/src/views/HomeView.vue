<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>

<template>
  <div class="text-center mt-2">
    <h1>ft_transcendence</h1>

    <nav class="menu">
      <template v-if="auth.isAuthenticated">
          <RouterLink to="/game" role="button">Jouer contre l'IA</RouterLink>
          <RouterLink to="/matchmaking" role="button">Jouer contre l'humain</RouterLink>
          <RouterLink to="/leaderboard" role="button" class="contrast">Classement</RouterLink>
          <RouterLink to="/profile" role="button" class="secondary">Mon Profil</RouterLink>
          <button @click="auth.logout" class="outline contrast">Se déconnecter</button>
        </template>

      <template v-else>
        <RouterLink to="/login" role="button">Login</RouterLink>
        <RouterLink to="/register" role="button">Register</RouterLink>
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
