import { defineStore } from 'pinia';
import * as authApi from '../api/auth'
import router from '@/router';
import { useErrorStore } from '@/stores/error'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    user: {
      id: null,
      username: null
    },
  }),

  getters: {
    isAuthenticated: (state) => !!state?.user.username
  },

  actions: {
    async login (username, password) {
      try {
        this.user.username = await authApi.login(username, password);
        router.push('/');
      } catch (e) {
        useErrorStore().notifyError(e);
      }
    },

    async register (username, email, password) {
      try {
        await authApi.register(username, email, password);
		    router.push('/login'); 
      } catch (e) {
        useErrorStore().notifyError(e);
      }
    },

    async checkAuth () {
      try {
        const response = await authApi.checkAuth();
        this.user.username = response.data.user.username;
      } catch (e) {
        this.user.username = false;
      }
    },

    async logout () {
      try {
        await authApi.logout();
      } catch (e) {
        useErrorStore().notifyError(e);
      }
      this.$reset();
      router.push('/');
    }
  }
});
