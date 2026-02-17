<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useMatchmakingStore } from '@/stores/matchmaking';
import { state, playMove, resetGame } from '@/services/gameService';

onMounted(resetGame);

const matchmaking = useMatchmakingStore();
const error = ref('');

const handleMatchmaking = async () => {
  try {
    await matchmaking.startMatchmaking();
  } catch (e) {
    console.log(e);
    error.value = "Impossible de trouver un opposant";
  }
};

</script>

<template>
  <div class="text-center">
    <header>
      <h1>Tic Tac Toe</h1>
      <article v-if="matchmaking.founding">
        <h3 v-if="matchmaking.founding">Recherche d'un adversaire...</h3>
        <h3 v-else-if="!matchmaking.winner">{{ matchmaking.isPlayerTurn ? "À toi de jouer (X)" : "L'humain réfléchit..." }}</h3>
        <h3 v-else class="headings">
          {{ matchmaking.winner === 'draw' ? "Match Nul" : `Vainqueur : ${matchmaking.winner}` }}
        </h3>
      </article>
    </header>

    <div v-if="matchmaking.found" class="board-container">
      <div class="board">
        <div v-for="(cell, i) in state.board" :key="i" class="cell" @click="playMove(i)">
          <span v-if="cell === 'X'" style="color: var(--pico-primary)">X</span>
          <span v-if="cell === 'O'" style="color: var(--pico-del-color)">O</span>
        </div>
      </div>
    </div>

    <div class="grid mt-2">
      <button v-if="matchmaking.winner" @click="resetGame">Rejouer</button>
      <button v-if="!matchmaking.founding" @click="handleMatchmaking">Rechercher un adversaire</button>
      <RouterLink v-if="!matchmaking.founding" to="/game" role="button" class="w-full">Jouer contre l'IA</RouterLink>
      <RouterLink to="/" role="button" class="secondary outline" @click="resetGame">Quitter</RouterLink>
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
  max-width: 300px;
  margin: 0 auto;
  gap: 10px;
}
</style>
