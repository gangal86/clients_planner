const state = () => ({
  clients: [ {
    id: 1,
    name: 'Brunhilde Panswick',
    date: '12.09.2021',
    phone: '+380969867432',
    avatar: 'avatar2.jpg'
  }, {
    id: 2,
    name: 'Winfield Stapforth',
    date: '16.10.2021',
    phone: '+380976655432',
    avatar: 'avatar6.jpg'
  } ]
})

const mutations = {
  addClient(state){
    state.clients.push({
      id: 3,
      name: 'Winfield Stapforth',
      date: '16.10.2021',
      phone: '+380976655432',
      avatar: 'avatar6.jpg'
    });
  }
}

const actions = {
  addClient({commit}) {
    commit('addClient');
  }
}

const getters = {
  getAllClients(state) {
    return state.clients;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}