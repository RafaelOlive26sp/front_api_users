<template >
  <div class="container ">
    <div class="row justify-content-center text-center">

      <CardProfileView >
        <template v-slot:header>
          <div class=" ">
            <div class=" text-start">
              <p class=" m-0 fs-5">Nome</p>
              <p class=" m-0 fw-semibold text-body-secondary ">
                teste
              </p>
            </div>
            <img class="rounded-circle bg-secondary" src="" alt="" width="150" height="150" >
          </div>

        </template>
        <template v-slot:content>

        </template>
      </CardProfileView>


    </div>
  </div>
</template>
<script>
import CardProfileView from '@/components/Cards/CardProfileView.vue'
export default {
  components: {
    CardProfileView
  }

}
</script>
<style lang="">

</style>
