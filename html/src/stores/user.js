import { defineStore } from 'pinia'
import * as userApi from '../api/user'
import { useToastStore } from '@/stores/toast'
import router from '@/router'

const DEFAULT_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

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
        		const response = await userApi.login(username, password);
				this.user = response.data.user;
				await router.push('/');
				useToastStore().notifySuccess('login');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async register (username, email, password) {
			try {
				const response = await userApi.register(username, email, password);
				this.user = response.data.user;
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
        if (!user.profile_picture_url)
          user.profile_picture_url = DEFAULT_AVATAR;
				this.user = user;
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
        users.forEach(u => {
          if (!u.profile_picture_url)
            u.profile_picture_url = DEFAULT_AVATAR;
        });
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
	}
});
