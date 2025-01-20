
<template>
  <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark" >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"  >DashBoard - Usuario: {{ $store.state.auth.user.name }}</a>


    <ul class="navbar-nav flex-row d-md-none">
      <li class="nav-item text-nowrap">
        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
          <svg class="bi"><use xlink:href="#search"/></svg>
        </button>
      </li>
      <li class="nav-item text-nowrap">
        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <svg class="bi"><use xlink:href="#list"/></svg>
        </button>
      </li>
    </ul>
  </header>
  <div class="container-fluid  ">
    <div class="row">
      <side-bar-view></side-bar-view>
      <div class="col-10 border border-secondary d-inline-block p-0">
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
