import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Vuex store
import router from './router'; // Vue Router
import './assets/main.css';
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
