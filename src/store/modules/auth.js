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

       const response = await api.post('/login', credentials);


        Cookies.set('access_token', response.data.access_token, {secure: true, sameSite: 'Strict'});


        localStorage.setItem('user', JSON.stringify(response.data.user));


        commit('SET_AUTH_TOKEN', response.data);

        dispatch('user/fecthUsers', null, { root: true });

        await router.push({ name: 'dashboard' });

      }catch(error){
        // Captura erros de resposta da API
    if (error.response) {
      // Erros retornados pela API (ex.: 401)
      console.error('Erro da API:', error.response.data.message); // Mostra só a mensagem
      alert('Erro: ' + error.response.data.message); // Mostra mensagem amigável
    } else if (error.request) {
      // Erros relacionados à requisição (ex.: API offline)
      console.error('Erro de requisição:', error.request);
      alert('Erro de conexão. Verifique sua internet ou tente mais tarde.');
    } else {
      // Erros inesperados
      console.error('Erro inesperado:', error.message);
      alert('Ocorreu um erro inesperado. Tente novamente.');
    }


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
