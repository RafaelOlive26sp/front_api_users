
<template>
  <div class="sidebar border border-dark col-md-3 col-lg-2 p-0 border-opacity-25">
    <div
      class="offcanvas-md offcanvas-end text-bg-secondary"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >

      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul class="nav flex-column t">
          <li class="nav-item" v-for="item in menuItems" :key="item.id">
            <a class="nav-link mb-2 fs-6  d-flex align-items-center gap-2 link-body-emphasis" href="#"
            data-bs-toggle="" :data-bs-target="'#'+ item.id " aria-expanded="false"
            :aria-controls="item.id" @click="setCollapse(item.id)">
            <i :class="item.class"></i>
               {{item.label}}
            </a>
          </li>

        </ul>

        <hr />
        <div class="nav flex-column mb-auto" >

            <a class=" mx-3 nav-link gap-2 fs-6  d-flex align-items-center link-body-emphasis  p-0" data-bs-toggle="collapse" href="#CollapseAcao" role="button" aria-expanded="false" aria-controls="collapseExample">
          <i class="bi bi-menu-button"></i>
              Ações
            </a>


          <CollapesView id="CollapseAcao" classCustom=" collapse card card-body col-11 mx-3 text-body-secondary">
            <template v-slot:content>
              <div class="">
                <ul class="nav flex-column">
                  <li class="nav-item" data-bs-toggle="collapse" href="#Consultar">
                    <i class="bi bi-search"></i>
                    Consultar
                  </li>
                    <div class="nav flex-column collapse  mx-3 col-4 text-center rounded-2 p-1" id="Consultar" style="box-shadow: black 0px 0px 4px 0px inset; ">
                      <small class="border-bottom">Usuarios</small>

                      <small>Atendentes</small>
                    </div>
                  <li class="nav-item" data-bs-toggle="collapse" href="#Atualizar">
                    <i class="bi bi-pencil-square"></i>
                    Atualizar
                  </li>
                  <div class="nav flex-column collapse  mx-3 col-4 text-center rounded-2" id="Atualizar" style="box-shadow: black 0px 0px 4px 0px inset; ">
                    <small>Contas</small>
                  </div>
                  <li class="nav-item" data-bs-toggle="collapse" href="#Deletar">
                    <i class="bi bi-trash3"></i>
                    Deletar
                  </li>
                  <div class="nav flex-column collapse  mx-3 col-4 text-center rounded-2" id="Deletar" style="box-shadow: black 0px 0px 4px 0px inset; ">
                    <small>Contas</small>
                  </div>

                </ul>
              </div>
            </template>
          </CollapesView>

<!--          <div class="collapse " id="CollapseAcao">-->
<!--            <div class="card card-body col-11 mx-3 text-body-secondary">-->
<!--              <ul class="nav flex-column mr-auto">-->
<!--                <li class="nav-item">Acao</li>-->
<!--                <li class="nav-item">Acao</li>-->
<!--                <li class="nav-item">Acao</li>-->
<!--                <li class="nav-item">Acao</li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
        </div>

        <hr class="my-3" />

        <ul class="nav flex-column mb-auto">
          <li class="nav-item" data-bs-toggle="modal" data-bs-target="#modalSettings">
            <a class="nav-link d-flex align-items-center gap-1 link-body-emphasis" href="#">
              <i class="bi bi-gear-wide-connected px-0"></i>
              Settings
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap- link-body-emphasis"
              href="#"
              @click="logoutUser"
            >
              <i class="bi bi-door-closed px-0"></i>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CollapesView from '@/components/CollapesView.vue'



export default {
  name: 'sideBarView',
  components: { CollapesView },
  data() {
    return {
      menuItems: [
        { id: "collapseUsers", label: "Resumo" , class:"bi bi-people" },
        { id: "collapseAttendant", label: "Atendentes", class:"bi bi-person-badge" },
        { id: "collapseAccountVerified", label: "Contas Verificadas", class:"bi bi-envelope-check" },
        { id: "collapseLogs", label: "Logs", class:"bi bi-file-earmark-bar-graph" },
      ],
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutUser() {
      this.logout();
    },
    setCollapse(id) {
      console.log('Sidebar '+id);
      this.$store.dispatch('user/setActiveCollapse', id);

    }
  }
}
</script>

<style scoped>

  .sidebar .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
  }

</style>
