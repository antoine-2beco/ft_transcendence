import { defineStore } from 'pinia';
import * as authApi from '../api/auth'
import router from '@/router';
import { MOCK_USERS } from '@/data/mockData'; // MOCKDATA

export const useAuthStore = defineStore('auth', {

  state: () => ({
    // user: {
    //   id: null,
    //   username: null
    // },
    user: null, // MOCKDATA
  }),

  getters: {
    // isAuthenticated: (state) => !!state?.user.username
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login (username, password) {
      try {
        // this.user.username = await authApi.login(username, password);
        await authApi.login(username, password); // MOCKDATA
        this.user = MOCK_USERS[0]; // MOCKDATA
        router.push('/');
      } catch (e) {
        console.error(e);
      }
    },

    async register (username, email, password) {
      try {
        await authApi.register(username, email, password);
		    router.push('/login'); 
      } catch (e) {
        console.error(e);
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
        console.log(e);
      }
      this.$reset();
      router.push('/');
    }
  }
});
