import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import YourComponent from '@/components/GameControls.vue'; // Replace with the correct path
import { createRouter, createMemoryHistory } from 'vue-router';

// Create a mock router
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/results', name: 'Results' }
  ]
});

describe('YourComponent.vue', () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      walkAway: vi.fn(),
      resetGame: vi.fn()
    };

    store = createStore({
      state: {
        isGameOver: false
      },
      actions
    });
  });

  it('renders Walk Away button when game is not over', () => {
    const wrapper = shallowMount(YourComponent, {
      global: {
        plugins: [store, router]
      }
    });

    expect(wrapper.find('button.bg-red-500').exists()).toBe(true);
    expect(wrapper.find('button.bg-green-500').exists()).toBe(false);
    expect(wrapper.find('button.bg-neutral-900').exists()).toBe(false);
  });

  it('renders Start New Game button when game is over', async () => {
    store.state.isGameOver = true;

    const wrapper = shallowMount(YourComponent, {
      global: {
        plugins: [store, router]
      }
    });

    await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM

    expect(wrapper.find('button.bg-red-500').exists()).toBe(false);
    expect(wrapper.find('button.bg-green-500').exists()).toBe(true);
    expect(wrapper.find('button.bg-neutral-900').exists()).toBe(true);
  });

  it('calls walkAway action when Walk Away button is clicked', async () => {
    const wrapper = shallowMount(YourComponent, {
      global: {
        plugins: [store, router]
      }
    });

    await wrapper.find('button.bg-red-500').trigger('click');

    expect(actions.walkAway).toHaveBeenCalled();
  });

  it('calls resetGame action when Start New Game button is clicked', async () => {
    store.state.isGameOver = true;

    const wrapper = shallowMount(YourComponent, {
      global: {
        plugins: [store, router]
      }
    });

    await wrapper.find('button.bg-green-500').trigger('click');

    expect(actions.resetGame).toHaveBeenCalled();
  });

  it('navigates to results page when Go To Results button is clicked', async () => {
    store.state.isGameOver = true;

    const wrapper = shallowMount(YourComponent, {
      global: {
        plugins: [store, router]
      }
    });

    await wrapper.find('button.bg-neutral-900').trigger('click');

    // Ensure navigation was triggered
    expect(wrapper.vm.$router.currentRoute.value.path).toBe('/');
  });
});
