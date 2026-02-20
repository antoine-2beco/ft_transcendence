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

    <div v-else class="scroll-box">
      <table class="striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Match</th>
            <th>Résultat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td>{{ game.date }}</td>
            <td>
              <strong :class="{ 'text-primary': game.winner === game.player1 }">
                {{ game.player1 }}
              </strong>
              <span class="text-muted"> vs </span>
              <strong :class="{ 'text-primary': game.winner === game.player2 }">
                {{ game.player2 }}
              </strong>
            </td>
            <td>
              <span v-if="game.winner === 'Draw'" class="text-muted">Nul</span>
              <span v-else>Vainqueur : {{ game.winner }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center mt-2">
      <RouterLink to="/" role="button" class="secondary outline">Retour</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.scroll-box {
  max-height: 75vh;
  overflow-y: auto;
  border: 1px solid var(--pico-muted-border-color);
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 0;
}
thead th {
  position: sticky;
  top: 0;
  background-color: var(--pico-background-color);
  z-index: 1;
  border-bottom: 2px solid var(--pico-muted-border-color);
}
.text-primary { color: var(--pico-primary); }
.text-muted { color: var(--pico-muted-color); }
</style>
