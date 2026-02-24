<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const history = ref([]);
const loading = ref(true);

const isEditing = ref(false);
const editForm = ref({ username: '', avatar: '' });

onMounted(async () => {
  await userStore.getProfile(userStore.user.id);
  if (userStore.user) {
    const allGames = await userStore.getGames(userStore.user.id);
    history.value = allGames.slice(0, 5);
    loading.value = false;
  }
});

const startEdit = () => {
  editForm.value.username = userStore.user.username;
  editForm.value.avatar = userStore.user.profile_picture_url;
  isEditing.value = true;
};

const saveProfile = () => {
  if (!editForm.value.username.trim() || !editForm.value.avatar.trim())
    return;

  userStore.user.username = editForm.value.username;
  userStore.user.profile_picture_url = editForm.value.avatar;

  isEditing.value = false;
};

const getResult = (g) => g.winner_username === 'Draw' ? 'DRAW' : (g.winner_username === userStore.user.id ? 'WIN' : 'LOSS');
</script>

<template>
  <div class="container">
    <h2 class="text-center">Mon Profil</h2>

    <article v-if="userStore.user">

      <header v-if="!isEditing" style="display: flex; align-items: center;">

        <div style="flex: 1;"></div>

        <div class="flex-center" style="display: flex; align-items: center; gap: 1rem;">
          <img :src="userStore.user.profile_picture_url" class="avatar">
          <div>
            <h2 style="margin-bottom: 0;">{{ userStore.user.username }}</h2>
            <small>Elo: {{ userStore.user.elo }}</small>
          </div>
        </div>

        <div style="flex: 1; text-align: right;">
          <button
            class="outline secondary"
            style="width: auto; padding: 0.2rem 0.6rem; font-size: 0.8rem; margin: 0;"
            @click="startEdit"
          >
            Éditer
          </button>
        </div>

      </header>

      <header v-else>
        <form @submit.prevent="saveProfile" style="margin-bottom: 0;">
          <div class="grid">
            <label>
              Pseudo
              <input type="text" v-model="editForm.username" required />
            </label>
            <label>
              URL Avatar
              <input type="url" v-model="editForm.avatar" required />
            </label>
          </div>
          <div class="grid" style="margin-top: 1rem;">
            <button type="button" class="secondary outline" @click="isEditing = false">Annuler</button>
            <button type="submit">Enregistrer</button>
          </div>
        </form>
      </header>

      <div class="flex-center mb-2" style="margin-top: var(--pico-spacing); justify-content: space-around; display: flex;">
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
