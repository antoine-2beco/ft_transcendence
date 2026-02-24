<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="text-center mt-2">
    <h1>{{ $t("head.site_title") }}</h1>

    <nav class="menu">
      <template v-if="userStore.isAuthenticated">
        <RouterLink to="/game" role="button">{{ $t("home.play")}}</RouterLink>
        <RouterLink to="/profile" role="button" class="secondary w-full">{{ $t("home.my_profile")}}</RouterLink>
        <RouterLink to="/friends" role="button" class="secondary w-full">{{ $t("home.my_friends")}}</RouterLink>
        <RouterLink to="/leaderboard" role="button" class="contrast">{{ $t("home.leaderboard")}}</RouterLink>
        <RouterLink to="/history" role="button" class="contrast">{{ $t("home.history")}}</RouterLink>
        <button @click="userStore.logout" class="contrast outline w-full">{{ $t("home.logout")}}</button>
      </template>

      <template v-else>
        <RouterLink to="/login" role="button" class="w-full">{{ $t("home.login")}}</RouterLink>
        <RouterLink to="/register" role="button" class="secondary outline w-full">{{ $t("home.register")}}</RouterLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
}
</style>
