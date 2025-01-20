
<template>
  <div class="modal fade"  :id=idModal tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" >
      <div class="modal-content text-dark">
        <slot name="content"></slot>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalView',
  components: {

  },
  props: {
    idModal: {
      type: String,
      default: 'modalChoice',
    }
  }
}
</script>

<style scoped>

</style>
