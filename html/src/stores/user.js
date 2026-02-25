import { defineStore } from 'pinia';
import * as userApi from '../api/user'
import { useToastStore } from '@/stores/toast'
import router from '@/router';


export const useUserStore = defineStore('user', {

	state: () => ({
		user: {
			id: null,
			username: null,
			profile_picture_url: null,
			language: null,
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
				useToastStore().notifyInfo('login');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async register (username, email, password) {
			try {
				await userApi.register(username, email, password);
				await router.push('/login');
				useToastStore().notifyInfo('register');
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
				useToastStore().notifyInfo('logout');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
			this.$reset();
			router.push('/');
		},

		async getProfile (id) {
			try {
				const user = await userApi.getProfile(id);
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
				return users;
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async addFriend (id) {
			try {
				await userApi.addFriend(id);
				useToastStore().notifyInfo('add_friend');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async removeFriend (id) {
			try {
				await userApi.removeFriend(id);
				useToastStore().notifyInfo('remove_friend');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async editUsername (newUsername) {
			try {
				await userApi.editUsername(newUsername);
				useToastStore().notifyInfo('edit_username');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		},

		async uploadProfilePicture (profilePicture) {
			try {
				await userApi.uploadProfilePicture(profilePicture);
				useToastStore().notifyInfo('upload_profile_picture');
			} catch (e) {
				useToastStore().notifyApiError(e);
			}
		}

	}
});