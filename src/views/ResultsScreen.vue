<template>
  <div class="results p-4">
    <h2 class="text-xl font-bold">Game Over</h2>
    <p>Total Score: {{ score }}</p>
    <p>Correct Answers: {{ correctAnswers }}</p>
    <button @click="resetGame" class="p-2 bg-black-500 text-white rounded">
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
