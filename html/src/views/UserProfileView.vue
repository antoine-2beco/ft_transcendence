<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { i18n } from '@/locales'

const userStore = useUserStore();
const history = ref([]);
const loading = ref(true);
const { t } = i18n.global;

const isEditing = ref(false);
const editForm = ref({ username: '' });
const selectedFile = ref(null);

onMounted(async () => {
  await userStore.getProfile();
  if (userStore.user) {
    const allGames = await userStore.getGames(userStore.user.id);
    history.value = allGames.slice(0, 5);
    loading.value = false;
  }
});

const startEdit = () => {
  editForm.value.username = userStore.user.username;
  selectedFile.value = null;
  isEditing.value = true;
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const saveProfile = () => {
  const newUsername = editForm.value.username.trim();

  if (!newUsername)
    return;
  if (newUsername !== userStore.user.username) {
    userStore.editUsername(newUsername);
  }
  if (selectedFile.value) {
    userStore.uploadProfilePicture(selectedFile.value);
  }
  isEditing.value = false;
};

const getResult = (g) => g.winner_username === 'Draw' ? t("user_profile.draw") : (g.winner_username === userStore.user.username ? t("user_profile.win") : t("user_profile.loss"));

const formatDate = (dateString) => {
  if (!dateString)
    return '';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

const achievements = computed(() => {
  const u = userStore.user;
  if (!u)
    return [];

  const list = [];
  if (u.wins >= 1) list.push({ icon: '🏅', title: t("achievements.first_blood.title"), desc: t("achievements.first_blood.desc") });
  if (u.wins >= 10) list.push({ icon: '🏆', title: t("achievements.veteran.title"), desc: t("achievements.veteran.desc") });
  if (u.elo >= 1200) list.push({ icon: '🔥', title: t("achievements.challenger.title"), desc: t("achievements.challenger.desc") });
  if (u.ties >= 5) list.push({ icon: '🤝', title: t("achievements.pacifist.title"), desc: t("achievements.pacifist.desc") });

  return list;
});
</script>

<template>
  <div class="container">
    <h2 class="text-center">{{ $t("user_profile.title") }}</h2>

    <article v-if="userStore.user">

      <header v-if="!isEditing" style="display: flex; align-items: center;">
        <div style="flex: 1;"></div>
        <div class="flex-center" style="display: flex; align-items: center; gap: 1rem;">
          <img :src="userStore.user.profile_picture_url" class="avatar">
          <div>
            <h2 style="margin-bottom: 0;">{{ userStore.user.username }}</h2>
            <small>{{ $t("user_profile.elo") }}: {{ userStore.user.elo }}</small>
          </div>
        </div>
        <div style="flex: 1; text-align: right;">
          <button
            class="outline secondary"
            style="width: auto; padding: 0.2rem 0.6rem; font-size: 0.8rem; margin: 0;"
            @click="startEdit"
          >
            {{ $t("user_profile.edit") }}
          </button>
        </div>
      </header>

      <header v-else>
        <form @submit.prevent="saveProfile" style="margin-bottom: 0;">
          <div class="grid">
            <label>
              {{ $t("user_profile.pseudo") }}
              <input type="text" v-model="editForm.username" required />
            </label>
            <label>
              {{ $t("user_profile.avatar") }}
              <input type="file" accept="image/*" @change="handleFileChange" />
            </label>
          </div>
          <div class="grid" style="margin-top: 1rem;">
            <button type="button" class="secondary outline" @click="isEditing = false">{{ $t("user_profile.cancel") }}</button>
            <button type="submit">{{ $t("user_profile.save") }}</button>
          </div>
        </form>
      </header>

      <div class="flex-center mb-2" style="margin-top: var(--pico-spacing); justify-content: space-around; display: flex;">
        <div class="text-center"><h3>{{ userStore.user.wins }}</h3><small>{{ $t("user_profile.victories") }}</small></div>
        <div class="text-center"><h3>{{ userStore.user.losses }}</h3><small>{{ $t("user_profile.defeats") }}</small></div>
        <div class="text-center"><h3>{{ userStore.user.ties }}</h3><small>{{ $t("user_profile.ties") }}</small></div>
      </div>

      <div v-if="achievements.length > 0" style="margin-top: 2rem; margin-bottom: 2rem;">
        <h4 class="text-center">{{ $t("user_profile.achievements") }}</h4>
        <div class="grid">
          <div v-for="ach in achievements" :key="ach.title" class="text-center">
            <div style="font-size: 2.5rem; line-height: 1.2;">{{ ach.icon }}</div>
            <strong>{{ ach.title }}</strong>
            <div><small class="text-muted">{{ ach.desc }}</small></div>
          </div>
        </div>
      </div>

      <footer v-if="!loading">
        <h4>{{ $t("user_profile.last_matches") }}</h4>
        <table class="striped" v-if="history.length > 0">
          <thead><tr><th>{{ $t("user_profile.towards") }}</th><th>{{ $t("user_profile.result") }}</th><th>{{ $t("user_profile.date") }}</th></tr></thead>
          <tbody>
            <tr v-for="g in history" :key="g.id">
              <td>{{ g.player1_username === userStore.user.username ? g.player2_username : g.player1_username }}</td>
              <td>
                <span :class="['badge', getResult(g).toLowerCase()]">
                  {{ getResult(g) }}
                </span>
              </td>
              <td>{{ formatDate(g.created_at) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center"><small>{{ $t("user_profile.no_matches") }}</small></div>
        <RouterLink to="/" role="button" class="secondary outline w-full mt-2">{{ $t("user_profile.back") }}</RouterLink>
      </footer>
      <div v-else aria-busy="true" class="text-center mt-2">{{ $t("user_profile.loading") }}</div>

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
