
<template>
  <div class="text-light">
    <nav-bar-top-view>
      <template v-slot:content>
        <div class="text-dark text-center">
          <CollapesView class-custom="card card-body" >
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
import UsuariosView from '@/components/Paginas/UsuariosView.vue'
import AtendentesView from '@/components/Paginas/AtendentesView.vue'
import ContasVerificadasView from '@/components/Paginas/ContasVerificadasView.vue'
import LogsApi from '@/components/Paginas/LogsApi.vue'
import AcoesView from '@/components/Paginas/AcoesView.vue'

export default {
  name: 'DashboardView',
  components: {
    NavBarTopView,
    CollapesView,
    UsuariosView,
    AtendentesView,
    ContasVerificadasView,
    LogsApi,
    AcoesView


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
          collapseAcoes: "AcoesView",
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
