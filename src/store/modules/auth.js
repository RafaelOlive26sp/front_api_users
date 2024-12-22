import api from '@/services/api.js'
import router from '@/router/index.js'
import Cookies from 'js-cookie'

const authModules = {
  namespaced: true,
  state: {
    token: Cookies.get('access_token') || null,
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token
      Cookies.set('access_token', token)
    },
    LOGOUT(state) {
      state.AUTH_TOKEN = null
        Cookies.remove('access_token')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try{
       // const response = await api.post('/login', credentials ,{headers:{'X-Origin':'dashboard'}});
       const response = await api.post('/login', credentials);
        console.log(response.data)
        commit('SET_AUTH_TOKEN', response.data.access_token);
        await router.push({ name: 'dashboard' });

      }catch(error){
        console.log(error)

      }
    },
    async logout({ commit }) {
      commit('LOGOUT');
      router.push({ name: 'dashboard' });
    }
  },
  getters: {},

}
export default authModules
