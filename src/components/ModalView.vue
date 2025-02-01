
<template>
  <div class="modal fade"  :id=idModal tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" >
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
.modal-dialog {
  max-width: 90%; /* 90% da largura em telas pequenas */
  margin: 1rem auto;
}

@media (min-width: 768px) {
  .modal-dialog {
    max-width: 600px; /* Define um limite para telas médias e grandes */
  }
}

.modal-content {
  overflow-y: auto; /* Adiciona rolagem vertical se o conteúdo for maior que a altura da tela */
  max-height: 90vh; /* Limita a altura máxima do modal a 90% da altura da viewport */
}



</style>
