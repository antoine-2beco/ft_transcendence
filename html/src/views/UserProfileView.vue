<script setup>
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <article v-if="auth.user">
    <header class="flex-center">
      <img :src="auth.user.avatar" alt="Avatar" class="avatar">
      <div>
        <h2>{{ auth.user.username }}</h2>
        <small>Elo: {{ auth.user.stats.elo }}</small>
      </div>
    </header>

    <div class="grid text-center">
      <div>
        <h3>{{ auth.user.stats.wins }}</h3>
        <small>Victoires</small>
      </div>
      <div>
        <h3>{{ auth.user.stats.losses }}</h3>
        <small>Défaites</small>
      </div>
    </div>

    <footer>
      <h4>Historique des matchs</h4>
      <table class="striped">
        <thead>
          <tr>
            <th>Adversaire</th>
            <th>Résultat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in auth.user.history" :key="match.id">
            <td>{{ match.opponent }}</td>
            <td>
              <mark v-if="match.result === 'WIN'" style="background-color: var(--pico-primary-hover)">VICTOIRE</mark>
              <mark v-else style="background-color: var(--pico-del-color)">DÉFAITE</mark>
            </td>
          </tr>
        </tbody>
      </table>

      <RouterLink to="/" role="button" class="secondary outline w-full mt-2">Retour Accueil</RouterLink>
    </footer>
  </article>

  <div v-else aria-busy="true">Chargement du profil...</div>
</template>

<style scoped>
.avatar {
  width: 80px;
  border-radius: 50%;
  border: 2px solid var(--pico-primary);
}
</style>
