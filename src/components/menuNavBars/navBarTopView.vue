
<template>
  <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark" >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"  >DashBoard - Usuario: {{ $store.state.auth.user.name }}</a>


    <ul class="navbar-nav flex-row d-md-none">

      <li class="nav-item text-nowrap ">
        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list"></i>
        </button>
      </li>
    </ul>
  </header>
  <div class="container-fluid  ">
    <div class="row">
      <side-bar-view></side-bar-view>
      <div class="col-sm-auto col-md-10 col-lg-10  d-inline-block p-0  d-flex justify-content-center">
        <slot name="content"></slot>
      </div>

    </div>
  </div>

</template>
<script>
import SideBarView from '@/components/menuNavBars/sideBarView.vue'

export default {
  name: 'navBarTopView',
  components: { SideBarView }
}
</script>

<style scoped>

</style>
