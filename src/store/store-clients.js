import { LocalStorage, setCssVar } from 'quasar';
import { useExport } from '../helpers/useExport';

const { primaryHex } = useExport();

const state = () => ({
  clients: LocalStorage.has('clients') ? LocalStorage.getItem('clients') : [],
  services: LocalStorage.has('services')
    ? LocalStorage.getItem('services')
    : [],
  mainColorApp: LocalStorage.has('mainColorApp')
    ? LocalStorage.getItem('mainColorApp')
    : primaryHex,
  countryFlagStatus: LocalStorage.has('countryFlagStatus')
    ? LocalStorage.getItem('countryFlagStatus')
    : false,
  currentLocale: LocalStorage.has('currentLocale')
    ? LocalStorage.getItem('currentLocale')
    : 'ru',
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
    setCssVar('primary', state.mainColorApp);
    LocalStorage.set('clients', state.clients);
    LocalStorage.set('services', state.services);
    LocalStorage.set('mainColorApp', state.mainColorApp);
    LocalStorage.set('countryFlagStatus', state.countryFlagStatus);
    LocalStorage.set('currentLocale', state.currentLocale);
  },
  updateMainColorApp(state, payload) {
    state.mainColorApp = payload;
    LocalStorage.set('mainColorApp', state.mainColorApp);
  },
  setCountryFlagStatus(state, payload) {
    state.countryFlagStatus = payload;
    LocalStorage.set('countryFlagStatus', state.countryFlagStatus);
  },
  setCurrentLocale(state, payload) {
    state.currentLocale = payload;
    LocalStorage.set('currentLocale', state.currentLocale);
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
  setCountryFlagStatus({ commit }, payload) {
    commit('setCountryFlagStatus', payload);
  },
  setCurrentLocale({ commit }, payload) {
    commit('setCurrentLocale', payload);
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
  getCountryFlagStatus(state) {
    return state.countryFlagStatus;
  },
  getCurrentLocale(state) {
    return state.currentLocale;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
