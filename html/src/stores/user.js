import { defineStore } from 'pinia'
import * as userApi from '../api/user'
import { useToastStore } from '@/stores/toast'
import router from '@/router'

export const useUserStore = defineStore('user', {

  state: () => ({
    user: {
      id: null,
      username: null,
      profile_picture_url: null,
      status: null,
      elo: null,
      wins: null,
      losses: null,
      ties: null,
      friends: null,
      status: null
    }
  }),

  getters: {
    isAuthenticated: (state) => !!state?.user.username,
    isOnline: (state) => state.user.status,
  },

	actions: {
		async login (username, password) {
			try {
        		const response = await userApi.login(username, password);
				this.user.username = response.data.user;
				await router.push('/');
				useToastStore().notifySuccess('login');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

    async register (username, email, password) {
      try {
      await userApi.register(username, email, password);
        await router.push('/login');
        useToastStore().notifySuccess('register');
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async checkAuth () {
      try {
        const response = await userApi.checkAuth();
        if (response.data.error === 'unauthorized') {
          this.user.username = false;
        }
        else {
          this.user.id = response.data.user.id;
          this.user.username = response.data.user.username;
        }
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async logout () {
      try {
        await userApi.logout();
        useToastStore().notifySuccess('logout');
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
      this.$reset();
      router.push('/');
    },

		async getProfile () {
			try {
				const response = await userApi.getProfile();
				this.user = response.data.user;
				return response.data.user;
			}
			catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

    async getGames (id) {
      try {
        const games = await userApi.getGames(id);
        return games;
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

		async getLeaderboard () {
			try {
				const users = await userApi.getLeaderboard();
				return users;
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

    async addFriend (id) {
      try {
        const response = await userApi.addFriend(id);
        this.user = response.data.user;
        useToastStore().notifySuccess('add_friend');
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async removeFriend (id) {
      try {
        const response = await userApi.removeFriend(id);
        this.user = response.data.user;
        useToastStore().notifySuccess('remove_friend');
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async editUsername (newUsername) {
      try {
        const response = await userApi.editUsername(newUsername);
        this.user = response.data.user;
        useToastStore().notifySuccess('edit_username');
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

  async uploadProfilePicture (profilePicture) {
    try {
      const response = await userApi.uploadProfilePicture(profilePicture);
      this.user = response.data.user;
      useToastStore().notifySuccess('upload_profile_picture');
    } catch (e) {
      useToastStore().notifyApiError(e);
    }
    },

    async setStatus (status) {
      try {
        if (!this.isAuthenticated) return
        const response = await userApi.setStatus(status);
        this.user.status = status;
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    }
  }
});
