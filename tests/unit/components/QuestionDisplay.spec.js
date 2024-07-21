import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, beforeEach } from 'vitest';
import QuestionDisplay from '@/components/QuestionDisplay.vue'; // Replace with the correct path

describe('QuestionDisplay.vue', () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      currentQuestion: () => ({
        question: 'What is the capital of France?',
        difficulty: 'Easy'
      }),
      questionNumber: () => 1
    };

    store = createStore({
      getters
    });
  });

  it('renders question and difficulty when currentQuestion is available', () => {
    const wrapper = shallowMount(QuestionDisplay, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('Question 1 - Difficulty: Easy');
    expect(wrapper.text()).toContain('What is the capital of France?');
  });

  it('displays loading message when currentQuestion is not available', () => {
    // Override the getter to return null
    getters.currentQuestion = () => null;

    store = createStore({
      getters
    });

    const wrapper = shallowMount(QuestionDisplay, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('Loading question...');
  });
});
