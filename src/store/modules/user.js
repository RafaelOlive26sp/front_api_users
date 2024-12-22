import api from '@/services/api.js'
import Cookies from 'js-cookie'

const userModules = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async register({ commit }, data) {
      try{
        console.log(data)
        const response = await api.post('/register', data);
        console.log(response.data);
      }catch(error){
        console.log(error)
      }
    }
  },
  getters: {},

}
export default userModules
