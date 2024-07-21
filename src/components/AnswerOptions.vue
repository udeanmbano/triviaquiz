<template>
  <div v-if="currentQuestion.options" class="p-4">
    <button
      v-for="(option, index) in currentQuestion.options"
      :key="index"
      @click="submitAnswer(option,currentQuestion.correctAnswer)"
      class="block w-full p-2 mb-2 bg-blue-500 text-white rounded border border-red-500"
    >
      {{
        option}}
    </button>
  </div>
  <div v-if="!currentQuestion.options || currentQuestion.options.length === 0">
    <p >Loading options...</p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const currentQuestion = computed(() => store.getters.currentQuestion);

console.log("My question "+JSON.stringify(currentQuestion.value))
const submitAnswer = (isCorrect,correctAnswer) => {
  let isRight = false
  if(correctAnswer===isCorrect){
    isRight=true;
  }
  store.dispatch('answerQuestion', isRight);
};
</script>
