<script setup>
import { ref, onMounted } from 'vue';
import { getAllGames } from '@/services/historyService';

const games = ref([]);
const loading = ref(true);

onMounted(async () => {
  games.value = await getAllGames();
  loading.value = false;
});
</script>

<template>
  <div class="container">
    <h2 class="text-center">Historique Global</h2>
    <div v-if="loading" aria-busy="true">Chargement...</div>

    <table v-else class="striped">
      <thead>
        <tr><th>Date</th><th>Match</th><th>Résultat</th></tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.date }}</td>
          <td>
            <strong :class="{ 'text-primary': game.winner === game.player1 }">{{ game.player1 }}</strong>
            <small class="text-muted"> vs </small>
            <strong :class="{ 'text-primary': game.winner === game.player2 }">{{ game.player2 }}</strong>
          </td>
          <td>
            <span v-if="game.winner === 'Draw'" class="text-muted">Nul</span>
            <span v-else>Vainqueur : {{ game.winner }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-center mt-2">
      <RouterLink to="/" role="button" class="secondary outline">Retour</RouterLink>
    </div>
  </div>
</template>
