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
        <tr><th>#</th><th>Joueur</th><th>Elo</th><th>Win Rate</th></tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in leaderboard" :key="p.id" :class="{ 'highlight': auth.user?.id === p.id }">
          <td>{{ i + 1 }}</td>
          <td class="flex-center" style="justify-content: flex-start;"> <img :src="p.avatar" class="avatar-small">
            <strong>{{ p.username }}</strong>
          </td>
          <td>{{ p.stats.elo }}</td>
          <td>{{ Math.round((p.stats.wins / (p.stats.wins + p.stats.losses)) * 100) }}%</td>
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
  border-radius: 50%;
}
.highlight {
  background-color: var(--pico-primary-background) !important;
  color: white;
}
</style>
