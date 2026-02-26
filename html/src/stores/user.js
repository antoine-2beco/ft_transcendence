import { defineStore } from 'pinia'
import * as userApi from '../api/user'
import { useToastStore } from '@/stores/toast'
import { useLocalStorage } from '@vueuse/core'
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
			friends: null
		}
	}),

	getters: {
    isAuthenticated: (state) => !!state?.user.username
	},

	actions: {
		async login (username, password) {
			try {
        this.user.username = await userApi.login(username, password);
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
				this.user.username = response.data.user.username;
				this.user.id = response.data.user.id;
			} catch (e) {
				this.user.username = false;
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
				const user = await userApi.getProfile();
				return user;
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
				await userApi.addFriend(id);
				if (this.user) {
					if (!this.user.friends) {
						this.user.friends = [];
					}
					if (!this.user.friends.includes(id)) {
						this.user.friends.push(id);
					}
				}
				useToastStore().notifySuccess('add_friend');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async removeFriend (id) {
			try {
				await userApi.removeFriend(id);
				if (this.user) {
					if (!this.user.friends) {
						this.user.friends = [];
					}
					const index = this.user.friends.indexOf(id);
					if (index > -1) {
						this.user.friends.splice(index, 1);
					}
				}
				useToastStore().notifySuccess('remove_friend');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async editUsername (newUsername) {
			try {
				await userApi.editUsername(newUsername);
				if (this.user) {
					this.user.username = newUsername;
				}
				useToastStore().notifySuccess('edit_username');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

    async uploadProfilePicture (profilePicture) {
      try {
          const data = await userApi.uploadProfilePicture(profilePicture);
          if (this.user && data && data.profile_picture_url) {
              this.user.profile_picture_url = data.profile_picture_url;
          }
          useToastStore().notifySuccess('upload_profile_picture');
      } catch (e) {
          useToastStore().notifyApiError(e);
      }
  },
	}
});
