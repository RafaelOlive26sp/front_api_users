
<template>
  <div class="text-light">
    <nav-bar-top-view></nav-bar-top-view>
    <side-bar-view></side-bar-view>

  </div>
</template>
<script>

import SideBarView from '@/components/menuNavBars/sideBarView.vue'
import NavBarTopView from '@/components/menuNavBars/navBarTopView.vue'

export default {
  name: 'DashboardView',
  components: {
    NavBarTopView,
    SideBarView

  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed:{}
}
</script>

<style scoped>

</style>
