import {createStore} from 'vuex'
import auth from '@/store/modules/auth.js'
import user from '@/store/modules/user.js'

export default createStore({
  modules: {
    auth,
    user
  }
})
