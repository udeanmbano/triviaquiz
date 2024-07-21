<template>
  <div class="p-4">
    <button
      v-if="!isGameOver"
      @click="walkAway"
      class="p-2 bg-red-500 text-white rounded"
    >
      Walk Away
    </button>
    <button
      v-if="isGameOver"
      @click="resetGame"
      class="p-2 bg-green-500 text-white rounded"
    >
      Start New Game
    </button>


  </div>
  <br/>
  <button
    v-if="isGameOver"
    @click="gameResults"
    class="p-2 bg-neutral-900 text-white rounded"
  >
    Go To Results
  </button>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue'
import router from '@/router/index.js'

const store = useStore();
const isGameOver = computed(() => store.state.isGameOver);

const walkAway = () => {
  store.dispatch('walkAway');
};

const gameResults = () => {
  router.push('/results'); // Navigate to the results page
};
const resetGame = () => {
  store.dispatch('resetGame');
};
</script>
