<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try {
    await auth.register(username.value, password.value);
  } catch (e) {
    error.value = "Register failed";
  }
};
</script>

<template>
  <div class="container login-container">
    <article>
      <header>Please Register</header>

      <form @submit.prevent="handleSubmit">
        <label>
          Username
          <input type="text" v-model="username" placeholder="Username" required />
        </label>

        <label>
          Password
          <input type="password" v-model="password" placeholder="Password" required />
        </label>

        <small v-if="error" class="error">{{ error }}</small>

        <button type="submit" :aria-busy="false">Register</button> </form>
    </article>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin-top: 10vh;
}
.error {
  color: var(--pico-del-color);
  display: block;
  margin-bottom: 1rem;
}
</style>
