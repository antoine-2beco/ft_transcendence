import { defineStore } from 'pinia';
import * as userApi from '../api/user'
import router from '@/router';
import { useErrorStore } from '@/stores/error'
import { getLeaderboard } from '@/services/userService';

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

	actions: {

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