<template>
  <div class="home flex flex-col items-center p-4 text-center">
    <!-- Gold Cup Trophy SVG -->
    <img src="../assets/trophy.png" alt="Trophy" class="w-36 h-36 transparent-image mb-4" />

    <h1 class="text-3xl font-bold mb-4">Welcome to the Trivia Quiz Game</h1>

    <!-- Start Game Button -->

    <!-- Start Game Button -->
    <router-link to="/game" class="start-game-btn">Start Game</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>

.start-game-btn {
  @apply block w-1/2 p-4 text-center bg-black text-white rounded hover:bg-gray-800 transition;
  font-size: 1.25rem; /* Tailwind equivalent: text-xl */
}
</style>
