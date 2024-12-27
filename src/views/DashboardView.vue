
<template>
  <div class="text-light">
    <nav-bar-top-view>
      <template v-slot:content>
        <div class="text-dark text-center">
          <CollapesView >
            <template v-slot:content>
              <component :is="isActiveComponent" />
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


        return components[id] || 'UsuariosView';
      },

  },
  computed:{
    isActiveComponent(){
      return this.getComponent(this.$store.state.user.activeCollapse);
    }
  }
}
</script>

<style scoped>

</style>
