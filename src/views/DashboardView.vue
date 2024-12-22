
<template>
  <div class="text-light">
    <h1>Dashboard</h1>
    <button type="submit" @click="UserLogout">Logout</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'DashboardView',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
     UserLogout() {
     this.logout().then(() => {
       this.$router.push('/')
     })
    }
  },
  computed:{}
}
</script>

<style scoped>

</style>
