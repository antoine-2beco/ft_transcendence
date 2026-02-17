<script setup>
import { onMounted } from 'vue';
import { state, playMove, resetGame } from '@/services/gameService';
onMounted(resetGame);
</script>

<template>
  <div class="text-center mt-2">
    <header>
      <h1>Tic Tac Toe</h1>
      <article>
        <h3 v-if="!state.winner">{{ state.isPlayerTurn ? "À toi (X)" : "IA..." }}</h3>
        <h3 v-else>
          {{ state.winner === 'draw' ? "Match Nul" : `Vainqueur : ${state.winner}` }}
        </h3>
      </article>
    </header>

    <div class="flex-center">
      <div class="board">
        <div v-for="(cell, i) in state.board" :key="i" class="cell" @click="playMove(i)">
          <span v-if="cell === 'X'" class="text-primary">X</span>
          <span v-if="cell === 'O'" class="text-del">O</span>
        </div>
      </div>
    </div>

    <div class="menu-actions">
      <button v-if="state.winner" @click="resetGame" class="w-full">Rejouer</button>
      <RouterLink to="/" role="button" class="secondary outline w-full">Quitter</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 10px;
  margin: 2rem 0;
}
.cell {
  width: 80px; height: 80px;
  background: var(--pico-card-background-color);
  box-shadow: var(--pico-card-box-shadow);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; font-weight: bold; cursor: pointer; border-radius: 8px;
}
.menu-actions {
  max-width: 300px;
  margin: 0 auto; display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
