<template >
  <div class="container ">
    <div class="row justify-content-center ">
      <CardsView tittle="Total de contas Verificadas">
        <template v-slot:content>
          <PlaceHolderLoadingView v-if="isLoading"/>
          <p v-else>{{ dataStatistc.verifiedAccounts }}</p>
        </template>
      </CardsView>

      <!-- <div class="col-md-3 border border-primary ">
        <h5>{{dataStatistc.unverifiedAccounts}}</h5>
      </div> -->
    </div>
  </div>
</template>
<script>
import CardsView from '@/components/Cards/CardsView.vue'
import PlaceHolderLoadingView from '@/components/PlaceHolderLoading/PlaceHolderLoadingView.vue'
export default {
  mounted() {
    this.LazyLoading();
  },
  components: {
    CardsView,
    PlaceHolderLoadingView
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    LazyLoading() {

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }

  },
  computed:{
    dataStatistc(){
      return this.$store.state.user.stats;
    }
  }

}
</script>
<style lang="">

</style>
