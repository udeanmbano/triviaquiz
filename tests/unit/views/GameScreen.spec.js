// tests/GameScreen.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import GameScreen from '@/views/GameScreen.vue'; // Adjust the path as necessary
import { createStore } from 'vuex';

// Mock store actions
vi.mock('@/store/index.js', () => {
  return {
    default: createStore({
      state: {
        questions: [],
        isGameOver: false,
      },
      actions: {
        startGame: vi.fn(),
      },
      getters: {
        currentQuestion: () => ({}),
        questionNumber: () => 1,
      },
    }),
  };
});

// Mock child components
const QuestionDisplay = { template: '<div>QuestionDisplay</div>' };
const AnswerOptions = { template: '<div>AnswerOptions</div>' };
const Timer = { template: '<div>Timer</div>' };
const GameControls = { template: '<div>GameControls</div>' };

describe('GameScreen.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore({
      state: {
        questions: [],
        isGameOver: false,
      },
      actions: {
        startGame: vi.fn(),
      },
      getters: {
        currentQuestion: () => ({}),
        questionNumber: () => 1,
      },
    });

    wrapper = mount(GameScreen, {
      global: {
        plugins: [store],
        stubs: {
          QuestionDisplay,
          AnswerOptions,
          Timer,
          GameControls,
        },
      },
    });
  });

  it('renders child components correctly', () => {
    expect(wrapper.findComponent(QuestionDisplay).exists()).toBe(true);
    expect(wrapper.findComponent(AnswerOptions).exists()).toBe(true);
    expect(wrapper.findComponent(Timer).exists()).toBe(true);
    expect(wrapper.findComponent(GameControls).exists()).toBe(true);
  });

  it('displays the game over message when isGameOver is true', async () => {
    store.state.isGameOver = true;
    await wrapper.vm.$nextTick(); // Wait for DOM update
    expect(wrapper.text()).toContain('Game Over! Check your results.');
  });

  it('does not display the game over message when isGameOver is false', () => {
    expect(wrapper.text()).not.toContain('Game Over! Check your results.');
  });


});
