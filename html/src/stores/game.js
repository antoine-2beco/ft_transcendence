import { defineStore } from 'pinia';
import * as matchmakingApi from '../api/matchmaking'
import router from '@/router';


export const useGameStore = defineStore('game', {

	state: () => ({
    mode: null,
    board: Array(9).fill(null),
    winner: null,
    isPlayerTurn: null,
    symbol: null,

    matchmaking: {
      searching: false,
      opponent: false,
      ws: null,
      me: null,
      gameId: null,
    },
  }),

  actions: {
    async startMatchmaking() {
      try {
        this.mode = 'matchmaking';
        await matchmakingApi.start();
      } catch (e) {
        console.log(e);
        throw (e);
      }
    },

    async joinQueue() {
      try {
        console.log(this.matchmaking.ws);
        await matchmakingApi.joinQueue(this.matchmaking.ws);
      } catch (e) {
        console.log(e);
        throw (e);
      }
    },

    async startIA() {
      try {
        this.mode = 'ia';
        this.opponent = true;
      } catch (e) {
        console.log(e);
        throw (e);
      }
    },

    async leaveGame() {
      try {
        if (this.mode == 'matchmaking') {
          await matchmakingApi.leaveMatchmaking(this.matchmaking.ws);
          router.push('/');
        }
        else
          router.push('/');
        this.$reset();
      } catch (e) {
        console.log(e);
      }
    },

    async playMove(i) {
      try {
        if (this.isPlayerTurn)
          await matchmakingApi.playMove(this.matchmaking.ws, 
            i, this.matchmaking.gameId, this.symbol);
        } catch (e) {
          console.log(e);
          throw (e);
        }
      }
    }
  }
)
