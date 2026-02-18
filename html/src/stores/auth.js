import { defineStore } from 'pinia';
import * as authApi from '../api/auth'
import router from '@/router';

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
        console.error(e);
      }
    },

    async register (username, email, password) {
      try {
        const response = await authApi.register(username, email, password);
		    router.push('/login');
      } catch (e) {
        console.error(e);
      }
    },

    async checkAuth () {
      if (!this.user.username) {
        try {
          const response = await authApi.getProfile();
          this.user.username = response.data.user.username;
        } catch (e) {
          console.log(e);
        }
      }
    },

    async logout () {
      try {
        await authApi.logout();
      } catch (e) {
        console.log(e);
      }
      this.$reset();
      router.push('/');
    }
  }
});
