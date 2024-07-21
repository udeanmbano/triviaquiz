<template>
  <div v-if="currentQuestion" class="p-4">
    <h2 class="text-dark text-xl font-bold mb-2">Question {{ questionNumber }} - Difficulty: {{ currentQuestion.difficulty }}</h2>
    <p class="mb-4 text-dark">{{ currentQuestion.question }}</p>

  </div>
  <div v-else>
    <p>Loading question...</p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore();
const currentQuestion = computed(() => store.getters.currentQuestion);
const questionNumber = computed(() => store.getters.questionNumber);
</script>
