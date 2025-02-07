<template>
  <div class="col-md-3 col-lg-12">
    <div :class="'card shadow-sm ' +classCustom">
      <div class="card-header">
        <slot name="header"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardsView',
  components: {},
  props: {
    tittle: {
      type: String,
      default: 'Coloque seu Titulo, com tittle',
    },
    classCustom: {
      type: String,
      // default: 'card shadow-sm',
    },
  },
}
</script>

<style scoped>
.custom-scroll {
  max-height: 230px;
  overflow-y: auto;
}
</style>
