<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const friends = ref([]);
const loading = ref(true);

onMounted(async () => {
  if (userStore.user) {
    const user = await userStore.getProfile(userStore.user.id);
    for (let friend_id in user.friends) {
      friends.value.push(await userStore.getProfile(friend_id));
    }
    loading.value = false;
  }
});

const removeFriend = async (friendId) => {
  const indexStore = userStore.user.friends.indexOf(friendId);
  if (indexStore > -1) await userStore.removeFriend(player.id);
  friends.value = friends.value.filter(f => f.id !== friendId);
};

const getStatusClass = (s) => ({
  'online': 'text-primary',
  'in-game': 'text-warning',
  'offline': 'text-muted'
}[s] || 'text-muted');
</script>

<template>
  <div class="container">
    <h2 class="text-center">{{ $t("friends.title") }}</h2>
    <div v-if="loading" aria-busy="true">{{ $t("friends.loading") }}</div>

    <div v-else-if="friends.length === 0" class="text-center">
      <p>{{ $t("friends.no_friends") }}</p>
      <RouterLink to="/leaderboard" class="contrast">{{ $t("friends.add_friends_leaderboard") }}</RouterLink>
    </div>

    <div v-else class="friends-grid">
      <article v-for="friend in friends" :key="friend.id">
        <header class="text-center">
          <img :src="friend.profile_picture_url" class="avatar">
          <div :class="getStatusClass(friend.status)">
            <small>● {{ $t(`friends.${friend.status}`) }}</small>
          </div>
        </header>
        <div class="text-center">
          <strong>{{ friend.username }}</strong>
          <p>{{ $t("friends.elo") }}: {{ friend.elo }}</p>
        </div>
        <footer>
          <button
            class="outline secondary w-full"
            @click="removeFriend(friend.id)"
          >
            {{ $t("friends.remove") }}
          </button>
        </footer>
      </article>
    </div>

    <div class="text-center mt-2">
      <RouterLink to="/" role="button" class="secondary outline">{{ $t("friends.back") }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.text-warning { color: #f59f00; }
</style>
