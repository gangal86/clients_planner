const state = () => ({
  clients: [ 
    {
      id: 1,
      name: 'Brunhilde Panswickuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',
      date: '2022/01/01',
      phone: '+380969867432',
      service: 'Покраскаhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
    }, 
    {
      id: 2,
      name: 'Winfield Stapforth',
      date: '2022/01/07',
      phone: '+380976655432',
      service: 'Стрижка'
    }, 
    {
      id: 3,
      name: 'Jack Wood',
      date: '2022/01/20',
      phone: '+380976655432',
      service: 'Прическа'
    }  
  ]
})

const mutations = {
  addClient(state){
    state.clients.push({
      id: 3,
      name: 'Bill White',
      date: '2022/01/15',
      phone: '+380976655432',
      service: 'Покраска'
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