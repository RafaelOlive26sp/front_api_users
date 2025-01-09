<template>
  <div :class="classDivFather">
    <div class="card">
      <div class="card-header">
        <small>{{ tittle }}</small>
      </div>
      <div :class="'card-body '+classCustom">
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
      default: 'card-body',
    },
    classDivFather: {
      type: String,
      default: 'col-md-3',
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
