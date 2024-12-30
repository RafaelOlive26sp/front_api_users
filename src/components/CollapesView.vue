<template>
  <div :class="classCustom" :id="idCuston" >
    <div>
      <slot name="content"></slot>
    </div>
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
      default: 'card card-body'
    }

  }

}
</script>
<style lang="">

</style>
