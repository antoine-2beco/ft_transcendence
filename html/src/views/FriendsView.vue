<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getMyFriends } from '@/services/friendService';

const auth = useAuthStore();
const friends = ref([]);
const loading = ref(true);

onMounted(async () => {
  if (auth.user) {
    friends.value = await getMyFriends(auth.user.id);
    loading.value = false;
  }
});

const getStatusClass = (s) => ({
  'online': 'text-primary',
  'in-game': 'text-warning',
  'offline': 'text-muted'
}[s] || 'text-muted');
</script>

<template>
  <div class="container">
    <h2 class="text-center">Mes Amis</h2>
    <div v-if="loading" aria-busy="true">Chargement...</div>

    <div v-else-if="friends.length === 0" class="text-center">
      <p>Tu n'as pas encore d'amis</p>
    </div>

    <div v-else class="friends-grid">
      <article v-for="friend in friends" :key="friend.id">
        <header class="text-center">
          <img :src="friend.avatar" class="avatar">
          <div :class="getStatusClass(friend.status)">
            <small>● {{ friend.status }}</small>
          </div>
        </header>
        <div class="text-center">
          <strong>{{ friend.username }}</strong>
          <p>Elo: {{ friend.stats.elo }}</p>
        </div>
        <footer>
          <button class="outline secondary w-full">Retirer</button>
        </footer>
      </article>
    </div>

    <div class="text-center mt-2">
      <RouterLink to="/" role="button" class="secondary outline">Retour</RouterLink>
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
  width: 80px;
  border-radius: 50%;
}
.text-warning { color: #f59f00; }
</style>
