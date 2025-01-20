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

                      class="d-flex align-items-center"
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
                      data-bs-parent="#CollapseAcao"
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
                  <p>Carregando informaçoes....</p>
                </div>
              </div>
            </template>
          </CollapesView>
            <ModalView :id="itens.idmodal" v-for="itens in menuItensAcoes" :key="itens.id"  @hidden="clearInputs(item.id)">
              <template v-slot:content>
                <div class="modal-header border">
                  <h5 class="modal-title">{{ itens.label }}</h5>

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>

                </div>
                <div class="modal-body conteiner ">
                <div class="row">
                  <div class="input-group">
                  <div class="input-group input-group-sm">
                    <div class="input-group-text col-auto">

                    <input
                      class="form-check-input mt-0"
                      v-tooltip
                      title="Pesquisar por nome"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      v-model="inputsSearch.searchName"
                      @change="inputSearch('name')"


                    />


                    </div>
                    <!-- Input de pesquisa por nome -->
                    <input
                    type="text"
                    class="form-control col-2"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="Digite o nome para pesquisar"
                    v-model="inputNameSearch"
                    :disabled="!inputsSearch.searchName"
                    @change="inputName(inputNameSearch, 'name', itens.label)"
                    />


                    <datalist id="datalistOptions">
                    <option
                      :value="verifiedUser.name"
                      v-for="verifiedUser in dataStatistic?.verifiedUsers"
                      :key="verifiedUser.id"
                    ></option>
                    <option
                      :value="unverifiedUser.name"
                      v-for="unverifiedUser in dataStatistic?.unverifiedUsers"
                      :key="unverifiedUser.id"
                    ></option>
                    </datalist>


                    <div class="input-group-text col-auto">
                    <input
                      class="form-check-input mt-0"
                      v-tooltip
                      title="Pesquisar por Email"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      v-model="inputsSearch.searchEmail"
                      @change="inputSearch('email')"


                    />
                    </div>
                    <!-- Input de pesquisa por E-mail -->
                    <input
                    type="email"
                    class="form-control col-2"
                    placeholder="Digite E-mail para pesquisar"
                    v-model="inputEmailSearch"
                    :disabled="!inputsSearch.searchEmail"
                    @change="inputEmail(inputEmailSearch, 'email', itens.label)"
                    />
                  </div>
                  </div>
                </div>
                <CardsView classDivFather="col-md-auto shadow-sm mt-4" :tittle="'Id do Usuario. ' + dadosDoUsuario?.id" v-if="dadosDoUsuario">
                  <template v-slot:content>
                  <div class=" ">
                    <div class="col-12">
                    <div class="card">
                      <div class="card-body d-flex align-items-start">
                      <div class="me-3">
                        <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="Avatar"
                        class="avatar rounded-4 "
                        height="100"
                        width="100"
                        style="
                        box-shadow: 2px 2px 5px -2px black;"
                        />
                      </div>
                      <div class="mt-3">
                        <span class="" style="font-size: 15px;">Nome: </span>
                        <small>{{ dadosDoUsuario?.name }}</small>
                        <br>
                        <span class="" style="font-size: 15px;">Email: </span>
                        <small>
                        {{ dadosDoUsuario?.email }}</small>
                      </div>
                      </div>
                      <div class="card-footer text-body-secondary p-0 text-start ">
                      <span class="ms-2">Data de Criação: </span>
                      <span>{{ dadosDoUsuario?.created_at }}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                  </template>
                </CardsView>
                </div>
                <div class="modal-footer" >
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  :data-bs-target="`collapse-${itens.id}`"
                  @click="setCollapse('collapseAcoes', dadosDoUsuario, itens.label)"
                  v-if="dadosDoUsuario"
                >
                  {{itens.label}}
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
import CardsView from '@/components/Cards/CardsView.vue'

export default {
  name: 'sideBarView',
  components: { CardsView, ModalView, CollapesView },
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
        { id: 'collapseAcoes', label: 'Ações', class: 'bi bi-menu-button' },
      ],
      menuItensAcoes: [
        {
          id: 'Consultar',
          label: 'Consultar',
          class: 'nav-item',
          icon: 'bi bi-search',
          idmodal: 'ModalConsultar',
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
          idmodal: 'ModalAtualizar',
          submenus: [{ id: 'contas', label: 'Contas' }],
        },
        {
          id: 'Deletar',
          label: 'Deletar',
          class:
            'nav-item link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover',
          icon: 'bi bi-trash3',
          idmodal: 'ModalDeletar',

          submenus: [{ id: 'contas', label: 'Contas' }],
        },
      ],
      inputsSearch:{
        searchName: false,
        searchEmail: false,
      },
      // searchName: false,
      // searchEmail: false,
      inputNameSearch: '',
      inputEmailSearch: '',
      dadosDoUsuario: null,
    }
  },
  methods: {
    ...mapActions('auth', ['logout',]),
    ...mapActions('user', ['deleteAccounts',]),
    logoutUser() {
      this.logout()
    },
    setCollapse(id, dadosDoUsuario, metodo) {
     if(metodo === 'Deletar') this.deleteAccount(dadosDoUsuario)
      this.$store.dispatch('user/setActiveCollapse', { id, dadosDoUsuario, metodo })
    },
    searchUserByField(field, value) {
      const searchValue = value;

      const unverifiedUsers = this.$store.state.user.stats.unverifiedUsers
      const verifiedUsers = this.$store.state.user.stats.verifiedUsers
      const allUsers = [...unverifiedUsers, ...verifiedUsers]

      const resultado = allUsers.find((user) => user[field] === searchValue)

      if (resultado) {
        this.dadosDoUsuario = resultado;

      } else {
        this.dadosDoUsuario = 'Nome nao encontrado!'
      }


    },

    inputName(value, field, action) {
      this.searchUserByField(field, value, action)
    },

    inputEmail(value, field, action) {
      this.searchUserByField(field, value, action)
    },
    async deleteAccount(data){

      try {
        const idUser = data.id;
        await this.deleteAccounts(idUser)

      } catch (error) {
        console.error(error);

      }

    },
    inputSearch(field) {

          if (field === "name") {
        this.inputsSearch.searchName = true; // Ativa o campo de nome
        this.inputsSearch.searchEmail = false; // Desativa o campo de email
        this.inputEmailSearch = ''
      } else if (field === "email") {
        this.inputsSearch.searchEmail = true; // Ativa o campo de email
        this.inputsSearch.searchName = false; // Desativa o campo de nome
        this.inputNameSearch = ''
      }
    },
    clearInputs(id) {
      console.log(`Modal com ID ${id} foi fechado. Limpando inputs...`);
      // Adicione aqui a lógica para limpar os inputs
    },
  },
  computed:{
    dataStatistic(){
      return this.$store.state.user.stats
    }
  }
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
.card-footer >span {
  font-size: 12px;
}
</style>
