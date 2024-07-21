<template>
  <div class="p-4">
    <p class="text-red-500 text-lg">Time left: {{ timer }} seconds</p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore();
const timer = computed(() => store.state.timer);
</script>
