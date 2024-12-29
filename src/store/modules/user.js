import api from '@/services/api.js'
import Cookies from 'js-cookie'

const userModules = {
  namespaced: true,
  state: {
    activeCollapse: null,
    StatisticData: localStorage.getItem('StatisticData') || null,
    users: localStorage.getItem('DataUser') || null

  },
  mutations: {
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

        const response = await api.get('/statisticdata',{
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
    clearLocalStorage(){
      localStorage.removeItem('DataUser');
      localStorage.removeItem('StatisticData');
    }

  },
  getters: {},

}
export default userModules
