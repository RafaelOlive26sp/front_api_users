<template>
  <div class="container ">
    <div class="row justify-content-center text-center">
      <div class="col-md-3 border border-primary ">
        <h5>Logs da Api</h5>
        <small><p>Total de Logs: {{ isLogs.totalLogs }}</p></small>
        <div>
          <ul v-for="itensLogs in isLogs.logs" :key="itensLogs.id">
            <li>{{itensLogs.id}}</li>
            <li>{{itensLogs.user_id}}</li>
            <li>{{itensLogs.action}}</li>
            <li>{{itensLogs.endpoint}}</li>
            <li>{{itensLogs.ip_address}}</li>
            <li>{{itensLogs.request_data}}</li>
            <li>{{itensLogs.response_data}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  name:'LogsApi',
  components:{

  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('user',['fetchLogs']),
    async getLogs(){
      try {
        await this.fetchLogs();
      } catch (error) {
        console.log(error);

      }
    }

  },
  computed:{
    ...mapGetters('user',['isLogs'])

  },
  mounted() {
    this.getLogs();
  },

}
</script>
<style lang="">

</style>
