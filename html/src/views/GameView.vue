<script setup>
import { onMounted } from 'vue';
import { state, playMove, resetGame } from '@/services/gameService';
onMounted(resetGame);
</script>

<template>
  <div class="text-center">
    <header>
      <h1>Tic Tac Toe</h1>
      <article>
        <h3 v-if="!state.winner">{{ state.isPlayerTurn ? "À toi de jouer (X)" : "L'IA réfléchit..." }}</h3>
        <h3 v-else class="headings">
          {{ state.winner === 'draw' ? "Match Nul" : `Vainqueur : ${state.winner}` }}
        </h3>
      </article>
    </header>

    <div class="board-container">
      <div class="board">
        <div v-for="(cell, i) in state.board" :key="i" class="cell" @click="playMove(i)">
          <span v-if="cell === 'X'" style="color: var(--pico-primary)">X</span>
          <span v-if="cell === 'O'" style="color: var(--pico-del-color)">O</span>
        </div>
      </div>
    </div>

    <div class="grid mt-2">
      <button v-if="state.winner" @click="resetGame">Rejouer</button>
      <RouterLink to="/" role="button" class="secondary outline">Quitter</RouterLink>
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
