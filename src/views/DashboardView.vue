
<template>
  <div class="text-light">
    <nav-bar-top-view>
      <template v-slot:content>
          <h2>ola</h2>
      </template>
    </nav-bar-top-view>




  </div>
</template>
<script>


import NavBarTopView from '@/components/menuNavBars/navBarTopView.vue'

export default {
  name: 'DashboardView',
  components: {
    NavBarTopView,


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
