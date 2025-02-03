<script setup>
import { RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<template>
  <RouterView />
</template>



<style>
@media (max-width: 767px) {
  .modal-backdrop {
    display: none !important;
  }

  /* Opcional: Ajusta o z-index do modal para garantir que ele fique acima de outros elementos */
  .modal {
    z-index: 1055 !important;
  }
}

</style>


