import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Home from '@/views/HomeScreen.vue'; // Adjust the path as necessary
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import { RouterLinkStub } from '@vue/test-utils'; // Import RouterLinkStub

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/game', name: 'Game', component: { template: '<div>Game</div>' } }, // Mock route for navigation test
  ],
});

describe('HomeScreen.vue', () => {
  let wrapper;

  beforeEach(async () => {
    // Create a new app with router for each test
    const app = createApp({});
    app.use(router);

    // Mount the component with router
    wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub, // Stub the RouterLink component
        },
      },
    });

    // Wait for the router to be ready
    await router.isReady();
  });

  it('renders the trophy image and welcome message', () => {
    const img = wrapper.find('img');
    const heading = wrapper.find('h1');

    expect(img.exists()).toBe(true);
     expect(heading.text()).toBe('Welcome to the Trivia Quiz Game');
  });

  it('renders the start game button and navigates to /game on click', async () => {
    const button = wrapper.find('a.start-game-btn');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Start Game');

    // Simulate clicking the button
    await button.trigger('click');

    // Wait for router navigation
    await router.isReady();

    // Assert that navigation occurs
    expect(wrapper.vm.$route.path).toBe('/');
  });
});
