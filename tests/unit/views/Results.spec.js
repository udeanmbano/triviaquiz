import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Results from '@/views/ResultsScreen.vue'; // Adjust the path as necessary
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home' },
  ],
});

// Mock store actions
const actions = {
  resetGame: vi.fn(),
};

const store = createStore({
  state: {
    score: 100,
    correctAnswers: 5,
  },
  actions,
});

describe('Results.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Results, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it('renders the trophy image and game over text', () => {
    const img = wrapper.find('img');
    const title = wrapper.find('h2');
    const paragraphs = wrapper.findAll('p');
    const button = wrapper.find('button');

    expect(img.exists()).toBe(true);
    expect(title.text()).toBe('Game Over');
    expect(paragraphs[0].text()).toBe('Total Score: 100');
    expect(paragraphs[1].text()).toBe('Correct Answers: 5');
    expect(button.text()).toBe('Start New Game');
  });

  it('calls resetGame action and navigates to home page when button is clicked', async () => {
    // Trigger button click
    const button = wrapper.find('button');
    await button.trigger('click');

    // Check if resetGame action was called
    expect(actions.resetGame).toHaveBeenCalled();

    // Check if navigation to home page occurred
    expect(wrapper.vm.$route.path).toBe('/');
  });
});
