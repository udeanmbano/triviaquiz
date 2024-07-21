import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, beforeEach } from 'vitest';
import Timer from '@/components/Timer.vue'; // Replace with the correct path

describe('Timer.vue', () => {
  let store;
  let state;

  beforeEach(() => {
    // Set up the initial state of the Vuex store
    state = {
      timer: 60
    };

    store = createStore({
      state
    });
  });

  it('renders the initial timer value from Vuex store', () => {
    const wrapper = shallowMount(Timer, {
      global: {
        plugins: [store]
      }
    });

    // Check if the timer value is displayed correctly
    expect(wrapper.text()).toContain('Time left: 60 seconds');
  });

  it('updates correctly when Vuex store changes', async () => {
    const wrapper = shallowMount(Timer, {
      global: {
        plugins: [store]
      }
    });

    // Simulate a change in the Vuex store state
    store.state.timer = 45;
    await wrapper.vm.$nextTick(); // Wait for the DOM to update

    // Check if the updated timer value is displayed correctly
    expect(wrapper.text()).toContain('Time left: 45 seconds');
  });
});
