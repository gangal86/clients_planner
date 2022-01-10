const state = () => ({
  clients: [ 
    {
      name: 'Brunhilde Panswickuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',
      date: '2022/01/01',
      phone: '+380969867432',
      service: 'Покраскаhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
    }, 
    {
      name: 'Winfield Stapforth',
      date: '2022/01/07',
      phone: '+380976655432',
      service: 'Стрижка'
    }, 
    {
      name: 'Jack Wood',
      date: '2022/01/20',
      phone: '+380976655432',
      service: 'Прическа'
    }  
  ]
})

const mutations = {
  addClient(state, payload){
    state.clients.push(payload);
  }
}

const actions = {
  addClient({commit}, payLoad) {
    commit('addClient', payLoad);
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