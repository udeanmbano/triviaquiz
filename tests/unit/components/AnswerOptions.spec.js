import { shallowMount } from '@vue/test-utils';
import AnswerOptions from '@/components/AnswerOptions.vue';
import { createStore } from 'vuex';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AnswerOptions.vue', () => {
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    getters = {
      currentQuestion: () => ({
        options: ['Option 1', 'Option 2', 'Option 3'],
        correctAnswer: 'Option 1'
      })
    };

    actions = {
      answerQuestion: vi.fn()
    };

    store = createStore({
      state: {},
      getters,
      actions
    });
  });

  it('renders options correctly', () => {
    const wrapper = shallowMount(AnswerOptions, {
      global: {
        plugins: [store]
      }
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0].text()).toBe('Option 1');
    expect(buttons[1].text()).toBe('Option 2');
    expect(buttons[2].text()).toBe('Option 3');
  });

  it('calls submitAnswer with correct parameters when option is clicked', async () => {
    const wrapper = shallowMount(AnswerOptions, {
      global: {
        plugins: [store]
      }
    });

    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click'); // Click on 'Option 1'

    // Verify `answerQuestion` was called with correct parameters
    expect(actions.answerQuestion).toHaveBeenCalledWith(expect.anything(), true);
  });

  it('displays loading message when options are not available', () => {
    getters.currentQuestion = () => ({ options: [] });

    store = createStore({
      state: {},
      getters,
      actions
    });

    const wrapper = shallowMount(AnswerOptions, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('Loading options...');
  });
});
