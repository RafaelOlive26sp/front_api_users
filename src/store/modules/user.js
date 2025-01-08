import api from '@/services/api.js'
import Cookies from 'js-cookie'





// const state = {
//   activeCollapse: null,
//   datas: null,
// };

// const mutations = {
//   setActiveCollapse(state, { id, dadosDoUsuario }) {
//     state.activeCollapse = id;
//     console.log(id);
//     state.datas = dadosDoUsuario;
//     console.log(state.datas);
//   }
// };

// const actions = {
//   setActiveCollapse({ commit }, payload) {
//     commit('setActiveCollapse', payload);
//   }
// };

// export default {
//   state,
//   mutations,
//   actions,
// };

const userModules = {
  namespaced: true,
  state: {
    activeCollapse: null,
    StatisticData: localStorage.getItem('StatisticData') || null,
    users: localStorage.getItem('DataUser') || null,

    isLoading: true,
    logs: {
      logs:[],
      pagination:{}
    },
    datas: ''
  },
  mutations: {

    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_DATA_LOGS(state,data){

      state.logs = data;
    },
    SET_USERS(state, users) {
      state.users = users
      localStorage.setItem('DataUser', JSON.stringify(users));
    },
    SET_DATA_STATISTIC(state,StatisticData){
      state.StatisticData = StatisticData
      localStorage.setItem('StatisticData', JSON.stringify(StatisticData));
    },
    setActiveCollapse(state,id,dadosDoUsuario){

      state.activeCollapse = id;
      console.log(id);
      state.datas = dadosDoUsuario
      console.log(datas);
    }
  },
  actions: {
    async register({ commit }, data) {
      try{
        console.log(data)
        const response = await api.post('/register', data);
        console.log(response.data);
      }catch(error){
        console.log(error)
      }
    },
    setActiveCollapse({commit},id){


      commit('setActiveCollapse',id);
    },
    async fecthUsers({commit,rootState}){
      try {
        const token = rootState.auth.token;
        if (!token) {
          throw new Error("No token ");

        }

        const response = await api.get('/users/id',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        commit('SET_USERS', response.data.data)


      } catch (error) {
        console.error(error);

      }
    },
    // ============================================
    async fetchStatisticData({commit,rootState}){
      try {
        const token = rootState.auth.token;

        if (!token) {
          throw new Error("No token procide");


        }

        const response = await api.get('/stats/data',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        // console.log(response.data.data);
        commit('SET_DATA_STATISTIC', response.data.data)

      } catch (error) {
        console.error(error);

      }
    },
    async fetchLogs({commit,rootState},url = '/stats/logs'){
      try {

        const token = rootState.auth.token;
        if (!token) {
          throw new Error('no token provide');
        }
          const response = await api.get(url,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        commit('SET_DATA_LOGS', response.data)
      } catch (error) {
        console.log(error);
      }
    },
    clearLocalStorage(){
      localStorage.removeItem('DataUser');
      localStorage.removeItem('StatisticData');
      localStorage.removeItem('logs');
    },
    LazyLoading({ commit }){
      setTimeout(() => {
        commit('SET_LOADING', false);

      }, 3000);
    },




  },
  getters: {
    isLogs: (state) => state.logs,

  },

}
export default userModules
