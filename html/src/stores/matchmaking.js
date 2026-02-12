import { defineStore } from 'pinia';
import * as matchmakingApi from '../api/matchmaking'
import router from '@/router';

export const useMatchmakingStore = defineStore('matchmaking', {

	state: () => ({
    board: Array(9).fill(null),
    founding: false,
    finded: false,
    winner: null,
    isPlayerTurn: true,
    status: null
  }),

  actions: {
    async startMatchmaking() {
      try {
        this.founding = true;
        this.status = await matchmakingApi.start();
      } catch (e) {
        console.log(e);
        throw (e);
      }
    }
  }
})
