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
  }
}

const actions = {
  addClient({commit}, payLoad) {
    commit('addClient', payLoad);
  },
  addService({commit}, payload) {
    commit('addService', payload)
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