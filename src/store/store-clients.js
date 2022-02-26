import { LocalStorage } from 'quasar';

const state = () => ({
  clients:
    LocalStorage.getItem('clients') !== null
      ? LocalStorage.getItem('clients')
      : [],
  services:
    LocalStorage.getItem('services') !== null
      ? LocalStorage.getItem('services')
      : [],
});

const mutations = {
  addClient(state, payload) {
    state.clients.unshift(payload);
    const dateLimit = new Date(Date.now());
    dateLimit.setDate(dateLimit.getDate() - 30);
    state.clients = state.clients.filter(item => (new Date(item.date)).getTime() >= dateLimit.getTime())
    LocalStorage.set('clients', state.clients);
  },
  deleteClient(state, id) {
    state.clients = state.clients.filter((el) => el.id != id);
    LocalStorage.set('clients', state.clients);
  },
  editClient(state, payload) {
    state.clients = state.clients.filter((el) => el.id != payload.id);
    state.clients.unshift(payload);
    LocalStorage.set('clients', state.clients);
  },
  addService(state, payload) {
    state.services.unshift(payload);
    LocalStorage.set('services', state.services);
  },
  importState(state, payload) {
    Object.assign(state, payload);
    LocalStorage.set('clients', state.clients);
    LocalStorage.set('services', state.services);
  }
};

const actions = {
  addClient({ commit }, payLoad) {
    commit('addClient', payLoad);
  },
  deleteClient({ commit }, id) {
    commit('deleteClient', id);
  },
  editClient({ commit }, payload) {
    commit('editClient', payload);
  },
  addService({ commit }, payload) {
    commit('addService', payload);
  },
  importState({ commit }, payload) {
    commit('importState', payload);
  },
};

const getters = {
  getAllClients(state) {
    return state.clients;
  },
  getAllClientsDates(state) {
    return state.clients.map((item) => item.date);
  },
  getAllClientsServices(state) {
    return state.services;
  },
  getState(state) {
    return state;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
