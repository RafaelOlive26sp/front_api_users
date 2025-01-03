<template>
  <p class="placeholder-glow">
  <span :class="ClassCuston"></span>
</p>

</template>

<script>
export default {
  name: 'PlaceHolderLoadingView',
  props: {
    ClassCuston: {
      type: String,
      default: 'placeholder col-2 rounded-2',
    },
  },
}
</script>


