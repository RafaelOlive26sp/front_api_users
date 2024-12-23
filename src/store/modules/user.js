import api from '@/services/api.js'
import Cookies from 'js-cookie'

const userModules = {
  namespaced: true,
  state: {
    activeCollapse: null
  },
  mutations: {
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
    }
  },
  getters: {},

}
export default userModules
