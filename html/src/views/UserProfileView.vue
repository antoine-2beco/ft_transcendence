<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getUserGames } from '@/services/historyService';

const auth = useAuthStore();
const history = ref([]);
const loading = ref(true);

onMounted(async () => {
  if (auth.user) {
    history.value = await getUserGames(auth.user.username);
    loading.value = false;
  }
});

const getResult = (g) => g.winner === 'Draw' ? 'DRAW' : (g.winner === auth.user.username ? 'WIN' : 'LOSS');
</script>

<template>
  <div class="container">
    <article v-if="auth.user">
      <header class="flex-center">
        <img :src="auth.user.avatar" class="avatar">
        <div>
          <h2>{{ auth.user.username }}</h2>
          <small>Elo: {{ auth.user.stats.elo }}</small>
        </div>
      </header>

      <div class="flex-center mb-2">
        <div class="text-center"><h3>{{ auth.user.stats.wins }}</h3><small>Victoires</small></div>
        <div class="text-center"><h3>{{ auth.user.stats.losses }}</h3><small>Défaites</small></div>
      </div>

      <footer v-if="!loading">
        <h4>Derniers Matchs</h4>
        <table class="striped" v-if="history.length > 0">
          <thead><tr><th>Contre</th><th>Résultat</th><th>Date</th></tr></thead>
          <tbody>
            <tr v-for="g in history" :key="g.id">
              <td>{{ g.player1 === auth.user.username ? g.player2 : g.player1 }}</td>
              <td>
                <span :class="['badge', getResult(g).toLowerCase()]">
                  {{ getResult(g) }}
                </span>
              </td>
              <td>{{ g.date }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center"><small>Aucun match.</small></div>
        <RouterLink to="/" role="button" class="secondary outline w-full mt-2">Retour</RouterLink>
      </footer>
      <div v-else aria-busy="true" class="text-center mt-2">Chargement...</div>
    </article>
  </div>
</template>

<style scoped>
.avatar {
  width: 80px;
  border-radius: 50%;
  border: 2px solid var(--pico-primary);
}
.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}
.win { background-color: var(--pico-primary); }
.loss { background-color: var(--pico-del-color); }
.draw { background-color: var(--pico-muted-color); }
</style>
