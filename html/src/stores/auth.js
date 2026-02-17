import { defineStore } from 'pinia';
import * as authApi from '../api/auth'
import router from '@/router';

export const useAuthStore = defineStore('auth', {

  state: () => ({
    username: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state?.username
  },

  actions: {
    async login (username, password) {
      try {
        const response = await authApi.login(username, password);
		    this.username = response.data.username;
		    router.push('/');
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    async register (username, email, password) {
      try {
        const response = await authApi.register(username, email, password);
		    router.push('/login');
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    async checkAuth () {
      if (!this.username) {
        try {
          this.username = await authApi.getProfile();
        } catch (e) {
          this.logout();
        }
      }
    },

    async logout () {
      try {
        const response = await authApi.logout();
      } catch (e) {
        throw (e);
      }
      this.username = null;
      router.push('/');
    }
  }
});
