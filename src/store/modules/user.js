import api from '@/services/api.js'
const userModules = {
  namespaced: true,
  state: {
    activeCollapse: null,
    // StatisticData: localStorage.getItem('StatisticData') || null,
    users: localStorage.getItem('DataUser') || null,
     stats:{
      totalAccounts: 0,
      verifiedAccounts: 0,
      unverifiedAccounts: 0
     },
    statsUsers:'',

    isLoading: true,
    logs: {
      logs: [],
      pagination: {},
    },
    datas: null,
    action: null,
    deleteAccount: null,
    errorUpdate:''
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_DATA_LOGS(state, data) {
      state.logs = data
    },
    SET_USERS(state, users) {
      state.users = users

    },
    SET_STATS(state, stats){
      state.stats = stats
    },
    SET_DADA_USERS(state,statsUsers){
      state.stastsUsers = statsUsers
    },
    setActiveCollapse(state, { id, dadosDoUsuario,metodo }) {
        state.activeCollapse = id;
        state.datas = {...dadosDoUsuario};
        state.action = metodo;
    },
    DELETE_ACCOUNT(state, deleteAccount){
      state.deleteAccount = deleteAccount
    },
    SET_ERROR_MESSAGE(state,errorUpdate){
      state.errorUpdate = errorUpdate
    }
  },
  actions: {
    // async register({  }, data) {
    //   try {
    //     console.log(data)
    //     const response = await api.post('/register', data)
    //     console.log(response.data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

    async fecthUsers({ commit, rootState }) {
      try {
        const token = rootState.auth.token
        const userId = rootState.auth.user.id;
        if (!token) {
          throw new Error('No token provide')
        }

        const response = await api.get(`/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        commit('SET_USERS', response.data.data)
      } catch (error) {
        console.error(error)
        throw error;
      }
    },
    // ============================================
    async fetchStatisticData({ commit, rootState }) {
      try {
        const token = rootState.auth.token
        if (!token) {
          throw new Error('No token provide')
        }

        const storedStats = JSON.parse(localStorage.getItem('stats'));
        if (storedStats) {
          commit('SET_STATS', storedStats);
        }

        const response = await api.get('/stats/data', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

          const stats = {
            totalAccounts: response.data.data.totalAccounts,
            verifiedAccounts: response.data.data.verifiedAccounts,
            unverifiedAccounts: response.data.data.unverifiedAccounts
          };
        const dataUsers= {
          newestUser: response.data.data.newestUser,
          oldestUser: response.data.data.oldestUser,
          unverifiedUsers: response.data.data.unverifiedUsers,
          verifiedUsers: response.data.data.verifiedUsers,
        }

          localStorage.setItem('stats',JSON.stringify(stats))



        commit('SET_STATS', response.data.data)
        commit('SET_DADA_USERS', dataUsers)




      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erro Inesperado.';
        commit('SET_ERROR_MESSAGE', errorMessage);

      }
    },
    async fetchLogs({ commit, rootState }, url = '/stats/logs') {
      try {
        const token = rootState.auth.token
        if (!token) {
          throw new Error('no token provide')
        }
        const response = await api.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        commit('SET_DATA_LOGS', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateAccount({ rootState,dispatch,commit }, data) {
      try {
        const token = rootState.auth.token
        const id = data.id;
        if (!token) {
          throw new Error('No token provide')
        }
        const response = await api.put(`/users/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch('fetchStatisticData');

         dispatch('setActiveCollapse',{
          dadosDoUsuario: response.data.data,
          metodo: 'consultar',
          id: 'collapseAcoes'
         })
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        commit('SET_ERROR_MESSAGE', errorMessage);


      }
    },
    async  deleteAccounts({commit, rootState},idUser) {
      try {

        const token = rootState.auth.token
        if (!token) {
          throw new Error('No token provide')
        }

        const response = await api.delete(`/users/${idUser}`,{
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })

        commit('DELETE_ACCOUNT', response.data)
      } catch (error) {
        console.error(error);

      }
    },

    clearLocalStorage() {
      localStorage.removeItem('stats')
      localStorage.removeItem('StatisticData')
      localStorage.removeItem('logs')

    },
    LazyLoading({ commit }) {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 3000)
    },
    setActiveCollapse({ commit }, payload) {

    commit('setActiveCollapse', payload);
    }
  },
  getters: {
    isLogs: (state) => state.logs,
  },
}
export default userModules
