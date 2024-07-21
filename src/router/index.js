import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeScreen.vue';
import Game from '../views/GameScreen.vue';
import Results from '../views/ResultsScreen.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
  { path: '/results', component: Results },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
