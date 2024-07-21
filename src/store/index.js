import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: 30,
    isGameOver: false,
    currentWinnings: 0,
    correctAnswers: 0,
    interval: null,
  },
  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
      state.questions = state.questions.sort(() => Math.random() - 0.5); // Shuffle questions
    },
    SET_CURRENT_QUESTION_INDEX(state, index) {
      state.currentQuestionIndex = index;
    },
    SET_SCORE(state, score) {
      state.score = score;
    },
    SET_TIMER(state, timer) {
      state.timer = timer;
    },
    SET_IS_GAME_OVER(state, status) {
      state.isGameOver = status;
    },
    SET_CURRENT_WINS(state, winnings) {
      state.currentWinnings = winnings;
    },
    SET_CORRECT_ANSWERS(state, count) {
      state.correctAnswers = count;
    },
    SET_INTERVAL(state, interval) {
      state.interval = interval;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      try {
        const response = await axios.get('https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions');
        commit('SET_QUESTIONS', response.data);
      } catch (error) {
        console.error('Failed to fetch questions', error);
      }
    },
    startGame({ dispatch, commit }) {
      commit('SET_CURRENT_QUESTION_INDEX', 0);
      commit('SET_SCORE', 0);
      commit('SET_CORRECT_ANSWERS', 0);
      commit('SET_CURRENT_WINS', 0);
      commit('SET_IS_GAME_OVER', false);
      dispatch('fetchQuestions');
      dispatch('startTimer');
    },
    nextQuestion({ state, commit, dispatch }) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        commit('SET_CURRENT_QUESTION_INDEX', state.currentQuestionIndex + 1);
        dispatch('restartTimer'); // Restart timer when moving to next question
      } else {
        commit('SET_IS_GAME_OVER', true);
        dispatch('stopTimer');
      }
    },
    answerQuestion({ state, commit, dispatch }, isCorrect) {
      if (isCorrect) {
        commit('SET_SCORE', state.score + 100); // Example scoring
        commit('SET_CORRECT_ANSWERS', state.correctAnswers + 1);
        commit('SET_CURRENT_WINS', state.currentWinnings + 100); // Example winnings increment
        dispatch('nextQuestion'); // Move to the next question and restart timer
      } else {
        commit('SET_IS_GAME_OVER', true);
        dispatch('stopTimer');
      }
    },
    startTimer({ commit, state, dispatch }) {
      commit('SET_TIMER', 30);
      const interval = setInterval(() => {
        if (state.timer > 0) {
          commit('SET_TIMER', state.timer - 1);
        } else {
          clearInterval(interval);
          dispatch('stopTimer');
          commit('SET_IS_GAME_OVER', true);
        }
      }, 1000);
      commit('SET_INTERVAL', interval);
    },
    restartTimer({ dispatch }) {
      dispatch('stopTimer'); // Stop the current timer
      dispatch('startTimer'); // Start a new timer
    },
    stopTimer({ commit, state }) {
      if (state.interval) {
        clearInterval(state.interval);
        commit('SET_INTERVAL', null);
      }
    },
    walkAway({ commit, dispatch }) {
      commit('SET_IS_GAME_OVER', true);
      dispatch('stopTimer');
    },
    resetGame({ dispatch }) {
      dispatch('startGame');
    }
  },
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentQuestionIndex] || {};
    },
    questionNumber(state) {
      return state.currentQuestionIndex + 1;
    }
  }
});
