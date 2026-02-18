import { defineStore } from 'pinia';
import * as matchmakingApi from '../api/matchmaking'
import router from '@/router';


export const useGameStore = defineStore('game', {

	state: () => ({
    mode: null,
    searching: false,
    opponent: false,

    board: Array(9).fill(null),

    ws: null,
    gameId: null,

    winner: null,
    turn: null,
    symbol: null
    }),

  actions: {
    async startMatchmaking(mode) {
      try {
        this.mode = mode;

        if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING))
          return;
        
        if (mode === 'ai')
          this.ws = new WebSocket(`wss://${location.host}/ws-ai`);
        else if (mode === 'matchmaking')
          this.ws = new WebSocket(`wss://${location.host}/ws`);
        else
          return;
        
        this.ws.onopen = () => {
          console.log("ws open");
          if (mode === 'ai')
            this.joinQueue();
        };

        this.ws.onclose = (e) => {
          console.log("ws closed", e.code, e.reason || "");
        };

        this.ws.onerror = () => console.log("ws error");

        this.ws.onmessage = (e) => {
          const msg = JSON.parse(e.data);
          console.log("ws:", msg.type);

          if (msg.type === "queue:waiting") {
            this.searching = true;
            console.log("Waiting for opponent...");
          }

          if (msg.type === "match:found") {
            this.gameId = msg.gameId;
            this.symbol = msg.symbol;
            this.board = msg.board;
            this.turn = msg.turn;
            this.searching = false;
            this.opponent = true;
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
        await matchmakingApi.joinQueue(this.ws);
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
        console.log(this.ws);
        if (this.ws)
          await matchmakingApi.leaveMatchmaking(this.ws);
        router.push('/');
        this.$reset();
      } catch (e) {
        console.log(e);
      }
    },

    async playMove(i) {
      try {
        if (this.turn)
          await matchmakingApi.playMove(this.ws, i, this.gameId, this.symbol);
        } catch (e) {
          console.log(e);
          throw (e);
        }
      },

    async replay(mode) {
      this.$reset();
      try {
        this.startMatchmaking(mode);
      } catch (e) {
        console.log(e);
      }
    }
    }
  }
)
