<template>
  <div class="results p-4">
    <img src="../assets/trophy.png" alt="Trophy" class="w-36 h-36 transparent-image mb-4" />
    <h2 class="text-xl font-bold">Game Over</h2>
    <p>Total Score: {{ score }}</p>
    <p>Correct Answers: {{ correctAnswers }}</p>
    <button @click="resetGame" class="start-game-btn">
      Start New Game
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index.js'

const store = useStore();
const score = computed(() => store.state.score);
const correctAnswers = computed(() => store.state.correctAnswers);

const resetGame = () => {
  store.dispatch('resetGame');
  router.push('/'); //
};
</script>
<style scoped>

.start-game-btn {
  @apply block w-full p-4 text-center bg-black text-white rounded hover:bg-gray-800 transition;
  font-size: 1.25rem; /* Tailwind equivalent: text-xl */
}
</style>