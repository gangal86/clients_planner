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
  mainColorApp:
    LocalStorage.getItem('mainColorApp') !== null
      ? LocalStorage.getItem('mainColorApp')
      : '#7A1FA2',
});

const mutations = {
  addClient(state, payload) {
    state.clients.unshift(payload);
    const dateLimit = new Date(Date.now());
    dateLimit.setDate(dateLimit.getDate() - 90);
    state.clients = state.clients.filter(
      (item) => new Date(item.date).getTime() >= dateLimit.getTime()
    );
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
  editService(state, payload) {
    state.services = state.services.filter((el) => el.id != payload.id);
    state.services.unshift(payload);
    LocalStorage.set('services', state.services);
  },
  deleteService(state, id) {
    state.services = state.services.filter((el) => el.id != id);
    LocalStorage.set('services', state.services);
  },
  importState(state, payload) {
    Object.assign(state, payload);
    LocalStorage.set('clients', state.clients);
    LocalStorage.set('services', state.services);
  },
  updateMainColorApp(state, payload) {
    state.mainColorApp = payload;
    LocalStorage.set('mainColorApp', state.mainColorApp);
  },
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
  editService({ commit }, payload) {
    commit('editService', payload);
  },
  deleteService({ commit }, id) {
    commit('deleteService', id);
  },
  importState({ commit }, payload) {
    commit('importState', payload);
  },
  updateMainColorApp({ commit }, payload) {
    commit('updateMainColorApp', payload);
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
  },
  getMainColorApp(state) {
    return state.mainColorApp;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
