import { defineStore } from 'pinia';
import * as userApi from '../api/user'
import { useErrorStore } from '@/stores/error'

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
				router.push('/');
			} catch (e) {
				useErrorStore().notifyError(e);
			}
		},

		async register (username, email, password) {
			try {
				await userApi.register(username, email, password);
					router.push('/login'); 
			} catch (e) {
				useErrorStore().notifyError(e);
			}
		},

		async checkAuth () {
			try {
				const response = await userApi.checkAuth();
				this.user.username = response.data.user.username;
			} catch (e) {
				this.user.username = false;
			}
		},

		async logout () {
			try {
				await userApi.logout();
			} catch (e) {
				useErrorStore().notifyError(e);
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
				useErrorStore().notifyError(e);
			}
		},

		async getGames (id) {
			try {
				const games = await userApi.getGames(id);
				return games;
			} catch (e) {
				useErrorStore().notifyError(e);
			}
		},

		async getLeaderboard () {
			try {
				const users = await userApi.getLeaderboard();
				return users;
			} catch (e) {
				useErrorStore().notifyError(e);
			}
		},

		async addFriend (id) {
			try {
				await userApi.addFriend(id);
			} catch (e) {
				useErrorStore().notifyError(e);
			}
		}

	}
});