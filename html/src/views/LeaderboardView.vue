<script setup>
import { ref, onMounted, computed } from 'vue';
import { getLeaderboard } from '@/services/userService';
import { useAuthStore } from '@/stores/auth';

const leaderboard = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const auth = useAuthStore();

onMounted(async () => {
  leaderboard.value = await getLeaderboard();
  loading.value = false;
});

const filteredLeaderboard = computed(() => {
  if (!searchQuery.value.trim()) return leaderboard.value;
  const query = searchQuery.value.toLowerCase();
  return leaderboard.value.filter(p => p.username.toLowerCase().includes(query));
});

const getWinRate = (p) => {
  const total = p.wins + p.losses;
  return total > 0 ? Math.round((p.wins / total) * 100) : 0;
};

const isFriend = (playerId) => auth.user?.friends?.includes(playerId);

const toggleFriend = (player) => {
  if (!auth.user) return;
  const index = auth.user.friends.indexOf(player.id);
  if (index > -1) auth.user.friends.splice(index, 1);
  else auth.user.friends.push(player.id);
};
</script>

<template>
  <div class="container">
    <h2 class="text-center">Classement</h2>

    <input
      type="search"
      v-model="searchQuery"
      placeholder="Rechercher un pseudo..."
      class="mb-2"
    >

    <div v-if="loading" aria-busy="true">Chargement...</div>

    <div v-else class="scroll-box">
      <table class="striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Joueur</th>
            <th>Elo</th>
            <th>Win Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in filteredLeaderboard" :key="p.id" :class="{ 'highlight': auth.user?.id === p.id }">
            <td>{{ i + 1 }}</td>

            <td style="display: flex; align-items: center; gap: 10px;">
              <img :src="p.profile_picture_url" style="width: 30px; border-radius: 50%;">
              <strong>{{ p.username }}</strong>
            </td>

            <td>{{ p.elo }}</td>
            <td>{{ getWinRate(p) }}%</td>

            <td>
              <button
                v-if="auth.user && auth.user.id !== p.id"
                @click="toggleFriend(p)"
                class="outline"
                style="padding: 2px 10px; font-size: 0.8rem;"
                :class="isFriend(p.id) ? 'secondary' : 'primary'"
              >
                {{ isFriend(p.id) ? '−' : '+' }}
              </button>
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
.highlight {
  background-color: var(--pico-primary-background) !important;
  color: white;
}
</style>
