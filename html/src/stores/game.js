import { defineStore } from 'pinia';
import * as gameApi from '../api/game'
import { useToastStore } from '@/stores/toast'
import router from '@/router';


export const useGameStore = defineStore('game', {

	state: () => ({
    mode: null,
    searching: false,
    opponent: false,
    win_forfeit: false,

    board: Array(9).fill(null),

    ws: null,
    gameId: null,

    winner: null,
    turn: null,
    symbol: null
    }),

  actions: {
    async startGame(mode) {
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
          if (mode === 'ai')
            this.joinQueue();
        };

        this.ws.onerror = () => {
          useToastStore().notifyApiError( {status: 500} );
        }

        this.ws.onmessage = (e) => {
          const msg = JSON.parse(e.data);

          if (msg.type === "queue:waiting") {
            this.searching = true;
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

          if (msg.type === "oppenent:reconnected") {
            this.gameId = msg.gameId;
            this.symbol = msg.symbol;
            this.board = msg.board;
            this.turn = msg.turn;
          }

          if (msg.type === "opponent:disconnected") {
            useToastStore().notifyWarning('opponent_disconnected');
          }

          if (msg.type === "game:manualForfeit" || msg.type === "game:forfeit") {
            this.win_forfeit = true;
            this.leaveGame();
          }

          if (msg.type === "error") {
            useToastStore().notifyApiError( {status: 500} );
          }

        };
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async joinQueue() {
      try {
        await gameApi.joinQueue(this.ws);
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async leaveGame() {
      try {
        if (this.searching)
          await gameApi.leaveQueue(this.ws);
        else if (this.opponent && !this.winner)
          await gameApi.forfeit(this.ws, this.gameId);
        if (this.mode)
          await gameApi.leaveGame(this.ws);

        await router.push('/');

        if (this.opponent && !this.winner) {
          if (this.win_forfeit)
            useToastStore().notifyWarning('win_by_forfeit');
          else
            useToastStore().notifyWarning('loose_by_forfeit');
        }

        this.$reset();
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    },

    async playMove(i) {
      try {
        if (this.turn)
          await gameApi.playMove(this.ws, i, this.gameId, this.symbol);
        } catch (e) {
        useToastStore().notifyApiError(e);
        }
      },

    async replay(mode) {
      this.$reset();
      try {
        this.startGame(mode);
      } catch (e) {
        useToastStore().notifyApiError(e);
      }
    }
    }
  }
)
