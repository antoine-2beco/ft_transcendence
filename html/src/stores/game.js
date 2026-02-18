import { defineStore } from 'pinia';
import * as matchmakingApi from '../api/matchmaking'
import router from '@/router';


export const useGameStore = defineStore('game', {

	state: () => ({
    mode: null,
    board: Array(9).fill(null),
    winner: null,
    turn: null,
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

        if (this.matchmaking.ws && (this.matchmaking.ws.readyState === WebSocket.OPEN || this.matchmaking.ws.readyState === WebSocket.CONNECTING))
          return;
        
        this.matchmaking.ws = new WebSocket(`wss://${location.host}/ws`);
        console.log(this.matchmaking.ws);
        
        this.matchmaking.ws.onopen = () => {
          console.log("ws open");
        };

        this.matchmaking.ws.onclose = (e) => {
          console.log("ws closed", e.code, e.reason || "");
        };

        this.matchmaking.ws.onerror = () => console.log("ws error");

        this.matchmaking.ws.onmessage = (e) => {
          const msg = JSON.parse(e.data);
          console.log("ws:", msg.type);

          if (msg.type === "queue:waiting") {
            this.matchmaking.searching = true;
            console.log("Waiting for opponent...");
          }

          if (msg.type === "match:found") {
            this.matchmaking.gameId = msg.gameId;
            this.symbol = msg.symbol;
            this.board = msg.board;
            this.turn = msg.turn;
            this.matchmaking.searching = false;
            this.matchmaking.opponent = true;
          }

          if (msg.type === "state") {
            this.board = msg.board;
            this.turn = msg.turn;
            this.winner = msg.winner;
          }
        };
      } catch (e) {
        console.log(e);
        throw (e);
      }
    },

    async joinQueue() {
      try {
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
        console.log(this.matchmaking.ws);
        if (this.matchmaking.ws)
          await matchmakingApi.leaveMatchmaking(this.matchmaking.ws);
        router.push('/');
        this.$reset();
      } catch (e) {
        console.log(e);
      }
    },

    async playMove(i) {
      try {
        if (this.turn)
          await matchmakingApi.playMove(this.matchmaking.ws, 
            i, this.matchmaking.gameId, this.symbol);
        } catch (e) {
          console.log(e);
          throw (e);
        }
      },

    async replay() {
      this.$reset();
      try {
        this.startMatchmaking();
      } catch (e) {
        console.log(e);
      }
    }
    }
  }
)
