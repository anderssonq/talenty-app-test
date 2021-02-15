/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const initialState = {
  token: null,
  user: null,
  currentClass: null,
  classes: [],
  comments: [],
};

const state = {
  ...initialState,
};

const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
  currentClass: (state) => state.currentClass,
  classes: (state) => state.classes,
  comments: (state) => state.comments,
};

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload;
  },
  SET_CURRENT_CLASS: (state, payload) => {
    state.currentClass = payload;
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_CLASSES: (state, payload) => {
    state.classes = payload;
  },
  SET_COMMENTS: (state, payload) => {
    state.comments = payload;
  },
  CLEAN_APP: (state, payload) => {
    state = initialState;
  },
  RESTORE_DATA: (state, payload) => {
    state.user = payload.user;
    state.classes = payload.classes;
    state.token = payload.token;
  },
};

const actions = {
  setToken({ commit }, payload) {
    localStorage.setItem('token', payload);
    commit('SET_TOKEN', payload);
  },
  setCurrentClass({ commit }, payload) {
    commit('SET_CURRENT_CLASS', payload);
  },
  setClasses({ commit }, payload) {
    localStorage.setItem('classes', JSON.stringify(payload));
    commit('SET_CLASSES', payload);
  },
  setUser({ commit }, payload) {
    localStorage.setItem('user', JSON.stringify(payload));
    commit('SET_USER', payload);
  },
  setComments({ commit }, payload) {
    localStorage.setItem('comments', JSON.stringify(payload));
    commit('SET_COMMENTS', payload);
  },
  retoreData({ commit }) {
    const data = {
      user: JSON.parse(localStorage.getItem('user')),
      classes: JSON.parse(localStorage.getItem('classes')),
      token: localStorage.getItem('token'),
    };
    commit('RESTORE_DATA', data);
  },
  cleanApp({ commit }) {
    localStorage.clear();
    commit('CLEAN_APP');
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
