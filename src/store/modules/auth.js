import api from '@/services/api.js'
import router from '@/router/index.js'
import Cookies from 'js-cookie'

const authModules = {
  namespaced: true,
  state: {
    // token: Cookies.get('access_token') || null,
    token: Cookies.get('access_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    errorMessage:''
  },
  mutations: {
    SET_AUTH_TOKEN(state, payload) {
      state.token = payload.access_token;
      state.user = payload.user;
      state.errorMessage = '';
    },
    LOGOUT(state) {
      state.token = null
        Cookies.remove('access_token')
    },
    SET_ERROR_MESSAGE(state, message){
      state.errorMessage = message || '';

    }

  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try{

       const response = await api.post('/login', credentials);


        Cookies.set('access_token', response.data.access_token, {secure: true, sameSite: 'Strict'});


        localStorage.setItem('user', JSON.stringify(response.data.user));


        commit('SET_AUTH_TOKEN', response.data);

        dispatch('user/fecthUsers', null, { root: true });

        await router.push({ name: 'dashboard' });

      }catch(error){

        const errorMessage = error.response?.data?.message || 'Erro Inesperado.';
        commit('SET_ERROR_MESSAGE', errorMessage);
        throw errorMessage;
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
