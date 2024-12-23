<template>
  <div class="collapse" :id="collapseUsers">
    <div class="card card-body" >
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CollapesView',
  props: {
    collapseUsers: {
      type: String,
      default: 'collapseChoise'
    }
  }

}
</script>
<style lang="">

</style>
