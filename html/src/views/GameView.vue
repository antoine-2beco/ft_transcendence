<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useGameStore } from '@/stores/game';
import { state, playMove, resetGame } from '@/services/gameService';

onMounted(resetGame);

const game = useGameStore();
const error = ref('');
</script>

<template>
  <div class="text-center">
    <header>
      <h1>Tic Tac Toe</h1>
    </header>

    <article v-if="game.mode == 'matchmaking' && (game.matchmaking.searching || game.matchmaking.gameIdopponent)">
      <h3 v-if="game.matchmaking.searching">Recherche d'un adversaire...</h3>
      <h3 v-if="game.matchmaking.opponent && !game.winner">
        {{ game.isPlayerTurn ? "À toi de jouer (X)" : "L'humain réfléchit..." }}
      </h3>
      <h3 v-if="game.matchmaking.opponent && game.winner" class="headings">
        {{ game.winner === 'draw' ? "Match Nul" : `Vainqueur : ${game.winner}` }}
      </h3>
    </article>

    <div v-if="game.matchmaking.opponent" class="board-container">
      <div class="board">
        <div v-for="(cell, i) in game.board" :key="i" class="cell" @click="game.playMove(i)">
          <span v-if="cell === 'X'" style="color: var(--pico-primary)">X</span>
          <span v-if="cell === 'O'" style="color: var(--pico-del-color)">O</span>
        </div>
      </div>
    </div>

    <div class="grid mt-2">
      <button v-if="game.winner" @click="resetGame">Rejouer</button>

      <button v-if="!game.mode && !game.matchmaking.searching" @click="game.startMatchmaking">Jouer contre un advesaire</button>
      <button v-if="!game.mode && !game.matchmaking.searching" @click="game.startIA">Jouer contre l'IA</button>

      <button v-if="game.mode == 'matchmaking' && !game.matchmaking.searching" @click="game.joinQueue">Rejoindre la file d'attente</button>

      <button to="/" role="button" class="secondary outline" @click="game.leaveGame">Quitter</button>
    </div>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  justify-content:center;
  margin: 2rem 0;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 10px;
}
.cell {
  width: 80px; height: 80px;
  background: var(--pico-card-background-color);
  box-shadow: var(--pico-card-box-shadow);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; font-weight: bold; cursor: pointer; border-radius: 8px;
}
.grid {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  gap: 1rem;
  margin: 2rem auto;
}

</style>