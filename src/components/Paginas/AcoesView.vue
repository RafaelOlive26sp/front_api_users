
<template>
  <p>Açoes</p>

  {{ datas }}
  <pre>

    <!-- {{ $store.state }} -->
  </pre>

</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AcoesView',
  data() {
    return {

    }
  },
  methods: {

  },
  computed:{
    ...mapState('user',['datas'])
  }
}
</script>

<style scoped>

</style>
