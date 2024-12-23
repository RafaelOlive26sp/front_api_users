
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
          <li class="nav-item link-light">
            <a
              class="nav-link d-flex align-items-center gap-2 active link-light"
              aria-current="page"
              href="#"
            >
              Dashboard
            </a>
          </li>

          <li class="nav-item" v-for="item in menuItems" :key="item.id">
            <a class="nav-link d-flex align-items-center gap-2 link-light" href="#"
            data-bs-toggle="collapse" :data-bs-target="'#'+ item.id" aria-expanded="false"
            :aria-controls="item.id" @click="setCollapse(item.id)">
               {{item.label}}
            </a>
          </li>

        </ul>

        <hr />
        <ul class="nav flex-column mb-auto">
          <li class="nav-item">
            <a class="link-light nav-link d-flex align-items-center gap-2" href="#" >
              Current month
            </a>
          </li>
          <li class="nav-item">
            <a class="link-light nav-link d-flex align-items-center gap-2" href="#">
              Last quarter
            </a>
          </li>
          <li class="nav-item">
            <a class="link-light nav-link d-flex align-items-center gap-2" href="#">
              Social engagement
            </a>
          </li>
          <li class="nav-item">
            <a class="link-light nav-link d-flex align-items-center gap-2" href="#">
              Year-end sale
            </a>
          </li>
        </ul>

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

export default {
  name: 'sideBarView',
  components: {},
  data() {
    return {
      menuItems: [
        { id: "collapseUsers", label: "Usuários" },
        { id: "collapseAttendant", label: "Atendentes" },
        { id: "collapseAccountVerified", label: "Contas Verificadas" },
        { id: "collapseLogs", label: "Logs" },
      ],
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutUser() {
      this.logout();
    },
    setCollapse(id) {
      console.log(id);
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
