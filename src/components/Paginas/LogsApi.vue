<template>
  <div class="container">

    <div class="d-flex align-itens-center mx-2" v-if="isLoading">
      <div class="spinner-border mx-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span v-if="isLogs != null">Buscando Informações no banco de dados...</span>
      <span v-else>Dados Recuperados!</span>
    </div>

    <div class="row justify-content-center text-center " v-else>
      <div class="col-6 col-md-6 mb-3 d-flex justify-content-center">
        <CardsView tittle="total de logs ">
          <template v-slot:content>
            {{ isLogs?.data?.totalLogs }}
          </template>
        </CardsView>
      </div>

      <div class="col-12">
        <div class="border d-flex dropend mb-3 p-2 flex-column flex-md-row align-items-center justify-content-between">
          <i class="bi bi-funnel" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul class="dropdown-menu shadow-sm">
            <li><a class="dropdown-item" href="#">Id</a></li>
            <li><a class="dropdown-item" href="#">User_id</a></li>
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Ip</a></li>
            <li><a class="dropdown-item" href="#">Request_data</a></li>
            <li><a class="dropdown-item" href="#">Origem</a></li>
            <li><a class="dropdown-item" href="#">Data e hora</a></li>
          </ul>

          <div class="mx-2 mt-md-0">
            <select class="form-select form-select-sm" aria-label="Small select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

        </div>

        <div class="table-responsive">


          <table class="table table-bordered ">
            <thead class="table-light">
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
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li :class="['page-item', { disabled: !isLogs?.data?.pagination.prev_page_url }]">
              <a class="page-link" href="#" @click.prevent="changePage(isLogs?.data?.pagination.prev_page_url)">
                Previous
              </a>
            </li>
            <li v-for="page in isLogs?.data?.pagination.last_page" :key="page"
              :class="{ 'page-item': true, active: page === isLogs?.data?.pagination.current_page }">
              <a class="page-link" href="#" @click.prevent="changePage(getPageUrl(page))">
                {{ page }}
              </a>
            </li>
            <li :class="['page-item', { disabled: !isLogs?.data?.pagination.next_page_url }]">
              <a class="page-link" href="#" @click.prevent="changePage(isLogs?.data?.pagination.next_page_url)">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>






  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CardsView from '../Cards/CardsView.vue'

export default {

  name: 'LogsApi',
  components: {
    CardsView,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    this.LazyLoading()
  },
  created() {
    this.getLogs()
  },
  methods: {
    ...mapActions('user', ['fetchLogs', 'LazyLoading']),

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
      await this.fetchLogs(url)
    },
    getPageUrl(page) {
      const baseUrl = this.isLogs.data.pagination.next_page_url?.split('?')[0];
      if (!baseUrl) return '#';
      return `?page=${page}`;
    },
    LazyLoading() {
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  },
  computed: {

    ...mapGetters('user', ['isLogs']),
  },

}
</script>
<style></style>
