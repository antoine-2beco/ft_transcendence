<script setup>
import { useGameStore } from '@/stores/game';

const game = useGameStore();
</script>

<template>
  <div class="text-center">
    <header>
      <h1>{{$t("game.title")}}</h1>
    </header>

    <article v-if="game.searching || game.opponent">
      <h3 v-if="game.searching">{{ $t("game.looking_opponent") }}</h3>
      <h3 v-if="game.opponent && !game.winner">
        {{ game.turn === game.symbol ? $t("game.your_turn", {symbol : game.symbol}) : $t("game.opponent_turn") }}
      </h3>
      <h3 v-if="game.opponent && game.winner" class="headings">
        {{ game.winner === 'draw' ? $t("game.draw") : $t("game.winner", {symbol : game.winner}) }}
      </h3>
    </article>

    <div v-if="game.opponent" class="board-container">
      <div class="board">
        <div v-for="(cell, i) in game.board" :key="i" class="cell" @click="game.playMove(i)">
          <span v-if="cell === 'X'" style="color: var(--pico-primary)">X</span>
          <span v-if="cell === 'O'" style="color: var(--pico-del-color)">O</span>
        </div>
      </div>
    </div>

    <div class="grid mt-2">
      <button v-if="game.winner" @click="game.replay(game.mode)">{{ $t("game.replay") }}</button>

      <button v-if="!game.mode && !game.searching" @click="game.startGame('matchmaking')">{{ $t("game.play_matchmaking") }}</button>
      <button v-if="!game.mode && !game.searching" @click="game.startGame('ai')">{{ $t("game.play_ai") }}</button>

      <button v-if="game.mode == 'matchmaking' && !game.searching && !game.opponent" @click="game.joinQueue">{{ $t("game.join_queue") }}</button>

      <button to="/" role="button" class="secondary outline" @click="game.leaveGame">
        {{ game.opponent && !game.winner ? $t("game.give_up") : $t("game.leave") }}
      </button>
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