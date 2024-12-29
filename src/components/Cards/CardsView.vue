
<template>
  <div class="col-md-3 ">
    <div class="card">
      <div class="card-header">
        <small>{{tittle}}</small>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <slot name="content"></slot>

        </blockquote>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardsView',
  components: {

  },
  props: {
    tittle:{
      type: String,
      default: 'Titulo'
    }
  }
}
</script>

<style scoped>

</style>
