import api from '@/services/api.js'
import Cookies from 'js-cookie'

const userModules = {
  namespaced: true,
  state: {
    activeCollapse: null,
    StatisticData: localStorage.getItem('StatisticData') || null,
    users: localStorage.getItem('DataUser') || null,
    isLogs: [],
    isLoading:false
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_DATA_LOGS(state,isLogs){
      state.isLogs = isLogs;
    },
    SET_USERS(state, users) {
      state.users = users
      localStorage.setItem('DataUser', JSON.stringify(users));
    },
    SET_DATA_STATISTIC(state,StatisticData){
      state.StatisticData = StatisticData
      localStorage.setItem('StatisticData', JSON.stringify(StatisticData));
    },
    setActiveCollapse(state,id){

      state.activeCollapse = id;
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
    async fetchLogs({commit,rootState}){
      try {

        const token = rootState.auth.token;
        if (!token) {
          throw new Error('no token provide');
        }
        const response = await api.get('/stats/logs',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(response.data.data);


        commit('SET_DATA_LOGS', response.data.data)
      } catch (error) {
        console.log(error);
      }finally {
       commit('SET_LOADING', false);
      }
    },
    clearLocalStorage(){
      localStorage.removeItem('DataUser');
      localStorage.removeItem('StatisticData');
      localStorage.removeItem('logs');
    }

  },
  getters: {
    isLogs: state => state.logs
  },

}
export default userModules
