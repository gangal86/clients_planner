import { LocalStorage } from "quasar";

const state = () => ({
  clients: LocalStorage.getItem("clients") !== null? LocalStorage.getItem("clients")["clients"]: []
})

const mutations = {
  addClient(state, payload){
    state.clients.push(payload);
    LocalStorage.set("clients", state);
  }
}

const actions = {
  addClient({commit}, payLoad) {
    commit('addClient', payLoad);
  }
}

const getters = {
  getAllClients(state) {
    let clients = [];
    Object.assign(clients, state.clients);
    clients = clients.reverse();
    return clients;
  },
  getAllClientsDates(state) {
    return state.clients.map(item => item.date);
  },
  getAllClientsServices(state) {
    return state.clients.map(item => item.service);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}