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
                          data-bs-target="#exampleModal"
                          v-for="submenus in itensAcoes?.submenus"
                          :key="submenus.id"
                        >
                          <small class="" href="#">{{ submenus.label }}</small>
                        </li>
                        <hr class="p-0 m-0" />
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
          <ModalView id="exampleModal">
            <template v-slot:content>
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-primary" data-bs-target="collapseAcoes">
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
        { id: 'collapseAcoes', label: 'Ações', class: 'bi bi-menu-button' },
      ],
      menuItensAcoes: [
        {
          id: 'Consultar',
          label: 'Consultar',
          class: 'nav-item',
          icon: 'bi bi-search',
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
          submenus: [{ id: 'contas', label: 'Contas' }],
        },
        {
          id: 'Deletar',
          label: 'Deletar',
          class: 'nav-item link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover',
          icon: 'bi bi-trash3',
          submenus: [{ id: 'contas', label: 'Contas' }],
        },
      ],
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutUser() {
      this.logout()
    },
    setCollapse(id) {
      console.log('Sidebar ' + id)
      this.$store.dispatch('user/setActiveCollapse', id)
    },
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
