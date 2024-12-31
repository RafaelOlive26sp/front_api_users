<template>
  <div class="container ">
    <div class="row justify-content-center text-center">
      <CardsView tittle="total de logs">
        <template v-slot:content>
            <p>{{ isLogs.totalLogs }}</p>
        </template>
      </CardsView>
      <div class="border d-flex dropend">
        <i class="bi bi-funnel" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu shadow-sm">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>


      </div>
      <table class="table   border">

        <thead >
          <tr>
            <th scope="col">id</th>
            <th scope="col">user_id</th>
            <th scope="col">endpoint</th>
            <th scope="col">action</th>
            <th scope="col">Ip_address</th>
            <th scope="col">request_data</th>
            <th scope="col">response_data</th>



          </tr>
        </thead>
        <tbody>
          <tr v-for="key in isLogs.logs" :key="key.id">
            <th scope="row">{{key.id}}</th>
            <td>{{ key.user_id }}</td>
            <td>{{ key.endpoint }}</td>
            <td>{{ key.action }}</td>
            <td>{{ key.ip_address }}</td>
            <td>{{ key.request_data.email }}</td>
            <td>{{ key.response_data.status }}</td>
          </tr>

        </tbody>
      </table>

    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CardsView from '../Cards/CardsView.vue';

export default {

  name:'LogsApi',
  components:{
    CardsView

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
