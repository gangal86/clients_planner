const state = () => ({
  clients: [ 
    {
      id: 1,
      name: 'Brunhilde Panswick',
      date: '2022/01/01',
      phone: '+380969867432',
      avatar: 'avatar2.jpg'
    }, 
    {
      id: 2,
      name: 'Winfield Stapforth',
      date: '2022/01/07',
      phone: '+380976655432',
      avatar: 'avatar6.jpg'
    }, 
    {
      id: 3,
      name: 'Jack Wood',
      date: '2022/01/20',
      phone: '+380976655432',
      avatar: 'avatar6.jpg'
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
  },
  getAllClientsDates(state) {
    return state.clients.map(item => item.date);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}