import { LocalStorage } from "quasar";

const state = () => ({
  clients: LocalStorage.getItem("clients") !== null? LocalStorage.getItem("clients"): [],
  services: LocalStorage.getItem("services") !== null? LocalStorage.getItem("services"): []
})

const mutations = {
  addClient(state, payload){
    state.clients.unshift(payload);
    LocalStorage.set('clients', state.clients);
  },
  addService(state, payload){
    state.services.unshift(payload);
    LocalStorage.set('services', state.services);
  },
  deleteClient(state, id) {
    state.clients = state.clients.filter(el => el.id != id);
    LocalStorage.set('clients', state.clients);
  },
  editClient(state, payload) {
    state.clients = state.clients.filter(el => el.id != payload.id);
    state.clients.unshift(payload);
    LocalStorage.set('clients', state.clients);
  }
}

const actions = {
  addClient({commit}, payLoad) {
    commit('addClient', payLoad);
  },
  addService({commit}, payload) {
    commit('addService', payload)
  },
  deleteClient({commit}, id) {
    commit('deleteClient', id);
  },
  editClient({commit}, payload) {
    commit('editClient', payload);
  }
}

const getters = {
  getAllClients(state) {
    return state.clients;
  },
  getAllClientsDates(state) {
    return state.clients.map(item => item.date);
  },
  getAllClientsServices(state) {
    return state.services;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}