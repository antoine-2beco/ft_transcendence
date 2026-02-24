<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const games = ref([]);
const loading = ref(true);
const userStore = useUserStore();

onMounted(async () => {
  games.value = await userStore.getGames();
  loading.value = false;
});

const formatDate = (dateString) => {
  if (!dateString)
    return '';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

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
            <td>{{ formatDate(game.created_at) }}</td>
            <td>
              <strong :class="{ 'text-primary': game.winner_username === game.player1_username }">
                {{ game.player1_username }}
              </strong>
              <span class="text-muted"> vs </span>
              <strong :class="{ 'text-primary': game.winner_username === game.player2_username }">
                {{ game.player2_username }}
              </strong>
            </td>
            <td>
              <span v-if="game.winner_username === 'Draw'" class="text-muted">Nul</span>
              <span v-else>Vainqueur : {{ game.winner_username }}</span>
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
