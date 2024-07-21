<template>
  <div class="game min-h-screen flex flex-col items-center p-4">
    <div class="card card-question bg-white rounded-lg p-4 max-w-lg w-full mb-4">
      <QuestionDisplay />
    </div>
    <div class="flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-lg">
      <div class="flex-1 px-2 mb-4 lg:mb-0 lg:max-w-xs">
        <div class="card card-timer bg-white rounded-lg p-6">
          <Timer />
        </div>
      </div>
      <div class="flex-2 px-2 mb-4 lg:mb-0 lg:flex lg:justify-center">
        <div class="card card-answer bg-white rounded-lg p-6 w-full">
          <AnswerOptions />
        </div>
      </div>
      <div class="flex-1 px-2 mb-4 lg:mb-0 lg:max-w-xs">
        <div class="card card-controls bg-white rounded-lg p-6">
          <GameControls />
        </div>
      </div>
    </div>
    <p v-if="isGameOver" class="text-red-500 text-4xl text-center mt-4">Game Over! Check your results.</p>
  </div>
</template>



<script setup>
import { useStore } from 'vuex';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import AnswerOptions from '../components/AnswerOptions.vue';
import Timer from '../components/Timer.vue';
import GameControls from '../components/GameControls.vue';
import { computed } from 'vue';

const store = useStore();
const isGameOver = computed(() => store.state.isGameOver);

if (store.state.questions.length === 0 && !isGameOver.value) {
  store.dispatch('startGame');
}
</script>

<style scoped>
.card {
  /* Optional: Additional custom styles for card */
}

.card-question {
  /* Custom styles for QuestionDisplay card */
  min-height: 150px; /* Adjust the height as needed */
  max-height: 200px; /* Ensure the height does not exceed this value */
  overflow: auto; /* Allows scrolling if content overflows */
}
</style>
