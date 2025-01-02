<template>
  <div class="container">
    <!-- <p v-if="isLoading">Carregando.....</p> -->



    <div class="d-flex align-items-center">
      <div class="spinner-border mx-2" aria-hidden="true"></div>
      <strong role="status">Loading...</strong>
    </div>
    <div class="row justify-content-center text-center" v-if="!isLoading">
      <CardsView tittle="total de logs">
        <template v-slot:content>
          {{ isLogs?.data.totalLogs }}

          <!--            <p>{{ isLogs.totalLogs }}</p>-->
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
      <table class="table border">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">user_id</th>
            <th scope="col">endpoint</th>
            <th scope="col">action</th>
            <th scope="col">Ip_address</th>
            <th scope="col">request_data</th>
            <th scope="col">response_data</th>
            <th scope="col">origem</th>
            <th scope="col">Data e Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="key in isLogs?.data?.logs" :key="key.id">
            <th scope="row">{{ key.id }}</th>
            <td>{{ key.user_id }}</td>
            <td>{{ key.endpoint }}</td>
            <td>{{ key.action }}</td>
            <td>{{ key.ip_address }}</td>
            <td>{{ key.request_data.email }}</td>
            <td>{{ key.response_data.status }}</td>
            <td>{{ key.request_data.origin }}</td>
            <td>{{ key.created_at }}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" >
        <ul class="pagination">
          <li :class="['page-item', { disabled: !isLogs?.data.pagination.prev_page_url }]">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(isLogs?.data.pagination.prev_page_url)"
            >
              Previous
            </a>
          </li>
          <li
            v-for="page in isLogs?.data.pagination.last_page"
            :key="page"
            :class="{ 'page-item': true, active: page === isLogs?.data.pagination.current_page }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(getPageUrl(page))"
            >
              {{ page }}
            </a>
          </li>
          <li :class="['page-item', { disabled: !isLogs?.data.pagination.next_page_url }]">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(isLogs?.data.pagination.next_page_url)"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>


    </div>





  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CardsView from '../Cards/CardsView.vue'

export default {
  name: 'LogsApi',
  components: {
    CardsView,
  },
  data() {
    return {}
  },
  created() {
    this.getLogs()
  },
  methods: {
    ...mapActions('user', ['fetchLogs']),

    async getLogs() {
      try {
        await this.fetchLogs()
      } catch (error) {
        console.log(error)
      }
    },
    async changePage(page) {
      if (!page) return '#';
      const url = `/stats/logs?${page.split('?')[1]}`;
      await this.fetchLogs (url)
    },
    getPageUrl(page) {
      const baseUrl = this.isLogs.data.pagination.next_page_url?.split('?')[0];
      if (!baseUrl) return '#';
    return `?page=${page}`;
},
  },
  computed: {
    ...mapState('user',['isLoading']),
    ...mapGetters('user',['isLogs']),




  },
}
</script>
<style></style>
