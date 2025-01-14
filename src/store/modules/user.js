import api from '@/services/api.js'
import axios from 'axios'



const userModules = {
  namespaced: true,
  state: {
    activeCollapse: null,
    StatisticData: localStorage.getItem('StatisticData') || null,
    users: localStorage.getItem('DataUser') || null,

    isLoading: true,
    logs: {
      logs: [],
      pagination: {},
    },
    datas: null,
    action: null,
    deleteAccount: null
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
      localStorage.setItem('DataUser', JSON.stringify(users))
    },
    SET_DATA_STATISTIC(state, StatisticData) {
      state.StatisticData = StatisticData
      localStorage.setItem('StatisticData', JSON.stringify(StatisticData))
    },
    setActiveCollapse(state, { id, dadosDoUsuario,metodo }) {
      state.activeCollapse = id
      console.log(id)
      state.datas = dadosDoUsuario,
        state.action = metodo
      console.log(state.datas)
    },
    DELETE_ACCOUNT(state, deleteAccount){
      state.deleteAccount = deleteAccount
    }
  },
  actions: {
    async register({ commit }, data) {
      try {
        console.log(data)
        const response = await api.post('/register', data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    // setActiveCollapse({ commit }, id) {
    //   commit('setActiveCollapse', id)
    // },
    async fecthUsers({ commit, rootState }) {
      try {
        const token = rootState.auth.token
        if (!token) {
          throw new Error('No token ')
        }

        const response = await api.get('/users/id', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        commit('SET_USERS', response.data.data)
      } catch (error) {
        console.error(error)
      }
    },
    // ============================================
    async fetchStatisticData({ commit, rootState }) {
      try {
        const token = rootState.auth.token

        if (!token) {
          throw new Error('No token procide')
        }

        const response = await api.get('/stats/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data.data);
        commit('SET_DATA_STATISTIC', response.data.data)
      } catch (error) {
        console.error(error)
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
            Authorization: `Bearer ${token}`,
          },
        })
        commit('SET_DATA_LOGS', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateAccount({ rootState }, data) {
      try {
      // console.log(data)
      // console.log('Token:', rootState.auth.token);
      const token = rootState.auth.token

      const id = data.id;

      // console.log('id ', id);
      // console.log('data ', data);

      if (!token) {
        throw new Error('No token provide')
      }
      const response = await api.put(`/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 20000, // 20 segundos
      });
      console.log(response.data)
      } catch (error) {
        console.error('Request failed:', {
          message: error.message,
          code: error.code,
          response: error.response ? error.response.data : null,
          config: error.config,
        });

      }
    },
    async  deleteAccounts({commit, rootState},idUser) {
      try {
        // console.log(idUser);
        const token = rootState.auth.token
        if (!token) {
          throw new Error('No token provide')
        }

        const response = await api.delete(`/users/${idUser}`,{
          headers:{
            Authorization: `Bearer ${token}`
          },
        })

        // console.log('Delete ', response.data);
        commit('DELETE_ACCOUNT', response.data)
      } catch (error) {
        console.error(error);

      }
    },
    clearLocalStorage() {
      localStorage.removeItem('DataUser')
      localStorage.removeItem('StatisticData')
      localStorage.removeItem('logs')
    },
    LazyLoading({ commit }) {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 3000)
    },
    setActiveCollapse({ commit }, payload) {
      console.log(payload)
    commit('setActiveCollapse', payload);
    }
  },
  getters: {
    isLogs: (state) => state.logs,
  },
}
export default userModules
