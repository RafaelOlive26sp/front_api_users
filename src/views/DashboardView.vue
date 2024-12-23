
<template>
  <div class="text-light">
    <nav-bar-top-view>
      <template v-slot:content>
        <div class="text-dark text-center">
          <CollapesView :id="$store.state.user.activeCollapse">
            <template v-slot:content>
              <component :is="getComponent($store.state.user.activeCollapse)" />
            </template>
          </CollapesView>
        </div>
      </template>
    </nav-bar-top-view>




  </div>
</template>
<script>


import NavBarTopView from '@/components/menuNavBars/navBarTopView.vue'
import CollapesView from '@/components/CollapesView.vue'
// ---------------import components-------------------
import UsuariosView from '@/components/menuNavBars/acoes/UsuariosView.vue'
import AtendentesView from '@/components/menuNavBars/acoes/AtendentesView.vue'
import ContasVerificadasView from '@/components/menuNavBars/acoes/ContasVerificadasView.vue'
import LogsApi from '@/components/menuNavBars/acoes/LogsApi.vue'

export default {
  name: 'DashboardView',
  components: {
    NavBarTopView,
    CollapesView,
    UsuariosView,
    AtendentesView,
    ContasVerificadasView,
    LogsApi,


  },
  data() {
    return {
      // activeCollapse: null,
      menuItens:[
        {id:"collpaseUsers", component:"UsuariosView"},
        {id:"collpaseAttendant", component:"AtendenteView"},
        {id:"collpaseAccountVerified", component:"ContasVerificadasView"},
        {id:"collpaseLogs", component:"LogsApi"},
      ]
    }
  },
  methods: {

      getComponent(id) {
        const components = {
          collapseUsers: "UsuariosView",
          collapseAttendant: "AtendentesView",
          collapseAccountVerified: "ContasVerificadasView",
          collapseLogs: "LogsApi",
        };
      return components[id] || null;
    },

  },
  computed:{}
}
</script>

<style scoped>

</style>
