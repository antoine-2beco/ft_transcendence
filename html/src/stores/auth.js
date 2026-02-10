import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loginAPI, getProfileAPI } from '@/services/authService';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  const login = async (username, password) => {
    try {
      const response = await loginAPI(username, password);

      token.value = response.token;
      user.value = response.user;
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  };

  const checkAuth = async () => {
    if (token.value && !user.value) {
      try {
        user.value = await getProfileAPI(token.value);
      } catch (e) {
        logout();
      }
    }
  };

  return { token, user, isAuthenticated, login, logout, checkAuth };
});
