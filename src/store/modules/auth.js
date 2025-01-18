import api from '@/services/api.js'
import router from '@/router/index.js'
import Cookies from 'js-cookie'

const authModules = {
  namespaced: true,
  state: {
    // token: Cookies.get('access_token') || null,
    token: Cookies.get('access_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,

  },
  mutations: {
    SET_AUTH_TOKEN(state, payload) {
      state.token = payload.access_token;
      state.user = payload.user
    },
    LOGOUT(state) {
      state.token = null
        Cookies.remove('access_token')
    }
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try{
       // const response = await api.post('/login', credentials ,{headers:{'X-Origin':'dashboard'}});
       const response = await api.post('/login', credentials);


        Cookies.set('access_token', response.data.access_token, {secure: true, sameSite: 'Strict'});
        console.log(response.data);

        localStorage.setItem('user', JSON.stringify(response.data.user));


        commit('SET_AUTH_TOKEN', response.data);

        dispatch('user/fecthUsers', null, { root: true });

        await router.push({ name: 'dashboard' });

      }catch(error){
        console.log(error)

      }
    },
    async logout({ commit,dispatch }) {
      commit('LOGOUT');
      dispatch('user/clearLocalStorage', null, { root: true });
      await router.push({ name: 'login' });
    }
  },
  getters: {},

}
export default authModules
