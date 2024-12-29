<template >
  <div class="container ">
    <div class="row justify-content-center ">
      <div class="col-md-3 border border-primary mx-1">
        <h5>{{dataStatistc.verifiedAccounts}}</h5>
      </div>
      <div class="col-md-3 border border-primary ">
        <h5>{{dataStatistc.unverifiedAccounts}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  component:{

  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed:{
    dataStatistc(){
      return this.$store.state.user.StatisticData;
    }
  }

}
</script>
<style lang="">

</style>
