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
            <a
              v-if="item.id !== 'collapseAcoes'"
              class="nav-link mb-2 fs-6 d-flex align-items-center gap-2 link-body-emphasis"
              href="#"
              data-bs-toggle=""
              :data-bs-target="'#' + item.id"
              aria-expanded="false"
              :aria-controls="item.id"
              @click="setCollapse(item.id)"
            >
              <i :class="item.class"></i>
              {{ item.label }}
            </a>
          </li>
        </ul>

        <hr />
        <div class="nav flex-column mb-auto">
          <a
            class="mx-3 nav-link gap-2 fs-6 d-flex align-items-center link-body-emphasis p-0"
            data-bs-toggle="collapse"
            href="#CollapseAcao"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i :class="menuItems.find((item) => item.id === 'collapseAcoes').class"></i>
              {{ menuItems.find((item) => item.id === 'collapseAcoes').label }}
          </a>

          <CollapesView
            id="CollapseAcao"
            classCustom=" collapse card card-body col-11 mx-3 text-body-secondary"
            style="box-shadow: black 0px 1px 1px 0px inset; border: none"
          >
            <template v-slot:content>
              <div class="">
                <ul class="nav flex-column" v-if="menuItensAcoes.length">
                  <li
                    :class="itensAcoes.class"
                    style="cursor: pointer"
                    v-for="itensAcoes in menuItensAcoes"
                    :key="itensAcoes.id"
                  >
                    <div

                      class="d-flex align-items-center "
                      style="cursor: pointer"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#collapse-${itensAcoes.id}`"
                      aria-expanded="false"
                      :aria-controls="`collapse-${itensAcoes.id}`"

                    >
                      <i :class="itensAcoes.icon"></i>
                      {{ itensAcoes.label }}
                    </div>

                    <div
                      class="nav flex-column collapse text-center rounded-2 p-1"
                      :id="`collapse-${itensAcoes?.id}`"
                      style="box-shadow: black 0px 1px 1px 0px inset"
                    >
                      <ul class="list-unstyled submenus">
                        <li
                          data-bs-toggle="modal"
                          :data-bs-target="`#${itensAcoes.idmodal}`"
                          v-for="submenus in itensAcoes?.submenus"
                          :key="submenus.id"
                        >
                          <hr class="p-0 m-0" />
                          <small class="" href="#">{{ submenus.label }}</small>
                        </li>

                      </ul>
                    </div>
                  </li>
                </ul>
                <div v-else>
                  <p >Carregando informaçoes....</p>
                </div>
              </div>
            </template>
          </CollapesView>
          <ModalView :id="itens.idmodal"  v-for="itens in menuItensAcoes" :key="itens.id">
            <template v-slot:content>
              <div class="modal-header">
                <h5 class="modal-title">{{itens.label}}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body conteiner-fluid">
                <div class="row">
                  <div class="input-group mb-3 col-1" >
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" v-tooltip title="Pesquisar por nome" type="checkbox"
                       aria-label="Checkbox for following text input" v-model="searchName" >
                    </div>


                    <input class="form-control disable" list="datalistOptions" id="exampleDataList"
                    placeholder="Digite o nome para pesquisar"  v-model="valueInp" :disabled="!searchName" @change="inputName(valueInp,itens.label)">

                    <datalist id="datalistOptions">
                      <option :value="itens.name"  v-for="itens in $store.state.user.StatisticData.verifiedUsers" :key="itens.id"></option>
                      <option :value="itens.name"  v-for="itens in $store.state.user.StatisticData.unverifiedUsers" :key="itens.id"></option>
                    </datalist>





                  </div>


                </div>
                  <hr>
                  <!-- {{ valueInp }} -->
                  <p v-for="itens in $store.state.user.StatisticData.unverifiedUsers" :key="itens.id">
                    {{ itens.name === valueInp ? valueInp :'nome nao encontrado'  }}</p>







              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" :data-bs-target="`collapse-${itens.id}`" @click="setCollapse('collapseAcoes')">
                  Save changes
                </button>
              </div>
            </template>
          </ModalView>
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
import ModalView from '@/components/ModalView.vue'

export default {
  name: 'sideBarView',
  components: { ModalView, CollapesView },
  data() {
    return {
      menuItems: [
        { id: 'collapseUsers', label: 'Resumo', class: 'bi bi-people' },
        { id: 'collapseAttendant', label: 'Atendentes', class: 'bi bi-person-badge' },
        {
          id: 'collapseAccountVerified',
          label: 'Contas Verificadas',
          class: 'bi bi-envelope-check',
        },
        { id: 'collapseLogs', label: 'Logs', class: 'bi bi-file-earmark-bar-graph' },
        { id: 'collapseAcoes',label:'Ações', class: 'bi bi-menu-button' },
      ],
      menuItensAcoes: [
        {
          id: 'Consultar',
          label: 'Consultar',
          class: 'nav-item',
          icon: 'bi bi-search',
          idmodal:'ModalConsultar',
          submenus: [
            { id: 'Usuarios', label: 'Usuarios' },
            { id: 'Atendentes', label: 'Atendentes' },
          ],
        },
        {
          id: 'Atualizar',
          label: 'Atualizar',
          class: 'nav-item',
          icon: 'bi bi-pencil-square',
          idmodal:'ModalAtualizar',
          submenus: [{ id: 'contas', label: 'Contas' }],
        },
        {
          id: 'Deletar',
          label: 'Deletar',
          class: 'nav-item link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover',
          icon: 'bi bi-trash3',
          idmodal:'ModalDeletar',
          submenus: [{ id: 'contas', label: 'Contas' }],
        },
      ],
      searchName: false,
      valueInp:''
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutUser() {
      this.logout()
    },
    setCollapse(id) {
      console.log('Sidebar ---' + id)
      this.$store.dispatch('user/setActiveCollapse', id)
    },
    inputName(value,actions){
      const valueInp = value;

      const pesquisa = this.$store.state.user.StatisticData.unverifiedUsers;

      for (let index = 0; index < pesquisa; index++) {

        console.log('elemento ',index);


      }



      console.log('metodo ',actions , '---' , valueInp);

    }

  },
}
</script>

<style scoped>
.sidebar .nav-link {
  font-size: 0.875rem;
  font-weight: 500;
}
.submenus > li:hover {
  border-radius: 4px;
  background-image: linear-gradient(120deg, #fdfbfb 10%, #ebedee 100%);
  cursor: pointer;
}
</style>
