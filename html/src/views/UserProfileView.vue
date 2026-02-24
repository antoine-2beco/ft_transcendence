<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

const auth = useAuthStore();
const userStore = useUserStore();
const history = ref([]);
const loading = ref(true);

onMounted(async () => {
  await userStore.getProfile(auth.user.id);
  if (userStore.user) {
    const allGames = await userStore.getGames(userStore.user.id);
    history.value = [...allGames].slice(0, 5);
    loading.value = false;
  }
});

const getResult = (g) => g.winner_username === 'Draw' ? 'DRAW' : (g.winner_username === userStore.user.id ? 'WIN' : 'LOSS');
</script>

<template>
  <div class="container">
    <h2 class="text-center">Mon Profil</h2>

    <article v-if="userStore.user">
      <header class="flex-center">
        <img :src="userStore.user.profile_picture_url" class="avatar">
        <div>
          <h2>{{ userStore.user.username }}</h2>
          <small>Elo: {{ userStore.user.elo }}</small>
        </div>
      </header>

      <div class="flex-center mb-2">
        <div class="text-center"><h3>{{ userStore.user.wins }}</h3><small>Victoires</small></div>
        <div class="text-center"><h3>{{ userStore.user.losses }}</h3><small>Défaites</small></div>
        <div class="text-center"><h3>{{ userStore.user.ties }}</h3><small>Nuls</small></div>
      </div>

      <footer v-if="!loading">
        <h4>Derniers Matchs</h4>
        <table class="striped" v-if="history.length > 0">
          <thead><tr><th>Contre</th><th>Résultat</th><th>Date</th></tr></thead>
          <tbody>
            <tr v-for="g in history" :key="g.id">
              <td>{{ g.player1_username === userStore.user.username ? g.player2_username : g.player1_username }}</td>
              <td>
                <span :class="['badge', getResult(g).toLowerCase()]">
                  {{ getResult(g) }}
                </span>
              </td>
              <td>{{ g.created_at }}</td>
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
  height: 80px;
  object-fit: cover;
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
