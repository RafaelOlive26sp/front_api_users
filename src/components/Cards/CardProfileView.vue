<template>
  <div class="col-md-3">
    <div class="card">
      <div class="card-header">
        <slot name="header"></slot>
      </div>
      <div :class="' '+classCustom">
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
  components: {},
  props: {
    tittle: {
      type: String,
      default: 'Coloque seu Titulo, com tittle',
    },
    classCustom: {
      type: String,
      default: '',
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
