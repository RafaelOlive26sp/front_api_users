<template lang="">
  <div class="container ">
    <div class="row justify-content-center">
      <div class="col-md-3 border border-primary ">
        <h5>{{$store.state.user.StatisticData.totalAccounts}}</h5>
      </div>
      <div class="col-md-3 border border-primary mx-1">
        <h5>{{$store.state.user.StatisticData.newstUser}}</h5>
      </div>
      <div class="col-md-3 border border-primary">
        <h5>{{$store.state.user.StatisticData.oldestUser}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.fetchdatas();
  },
  components:{

  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('user',['fetchStatisticData']),
    async fetchdatas(){
      try {
       await this.fetchStatisticData();

      } catch (error) {
        console.error(error);

      }
    }
  },

}
</script>
<style lang="">

</style>
