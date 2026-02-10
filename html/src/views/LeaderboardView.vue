<script setup>
import { ref, onMounted } from 'vue';
import { getLeaderboard } from '@/services/userService';
import { useAuthStore } from '@/stores/auth';

const leaderboard = ref([]);
const loading = ref(true);
const auth = useAuthStore();

onMounted(async () => {
  leaderboard.value = await getLeaderboard();
  loading.value = false;
});
</script>

<template>
  <div class="container">
    <h2 class="text-center">Classement</h2>

    <div v-if="loading" aria-busy="true">Chargement...</div>

    <table v-else class="striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Joueur</th>
          <th>Elo</th>
          <th>Win Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(player, index) in leaderboard"
          :key="player.id"
          :class="{ 'highlight': auth.user && auth.user.id === player.id }"
        >
          <td>{{ index + 1 }}</td>
          <td class="player-cell">
            <img :src="player.avatar" class="avatar-small">
            <strong>{{ player.username }}</strong>
          </td>
          <td>{{ player.stats.elo }}</td>
          <td>
            {{ Math.round((player.stats.wins / (player.stats.wins + player.stats.losses)) * 100) }}%
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-center">
      <RouterLink to="/" role="button" class="secondary outline">Retour</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.avatar-small {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.player-cell {
  display: flex;
  align-items: center;
}
.highlight {
  background-color: var(--pico-primary-background) !important;
  color: var(--pico-primary-inverse);
}
</style>
