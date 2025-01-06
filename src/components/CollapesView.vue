<template>
  <div :class="classCustom" :id="idCuston" >
    <slot name="content"></slot>
  </div>
</template>
<script>
export default {
  name: 'CollapesView',
  props: {
    idCuston:{
      type: String,
      default: ''
    },
    classCustom: {
      type: String,
      default: ''
    },


  }

}
</script>
<style lang="">

</style>
