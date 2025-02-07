<template >
  <div class="container ">
    <div class="row justify-content-center ">
      <CardsView tittle="Total de contas Verificadas" classDivFather="col-md-12 col-lg-12" >
        <template v-slot:content>
          <PlaceHolderLoadingView v-if="isLoading"/>
          <p v-else>{{ dataStatistc.verifiedAccounts }}</p>
        </template>
      </CardsView>
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
