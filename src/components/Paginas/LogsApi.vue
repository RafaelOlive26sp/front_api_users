<template>
  <div class="container">
    <p v-if="isLoading">Carregando.....</p>

    <div class="row justify-content-center text-center">
      <CardsView tittle="total de logs">
        <template v-slot:content>
          {{ isLogs.totalLogs }}

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
          <tr v-for="key in isLogs.logs" :key="key.id">
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li :class="['page-item', { disabled: !isLogs.pagination.prev_page_url }]">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(isLogs.pagination.prev_page_url)"
            >
              Previous
            </a>
          </li>
          <li :class="'page-item', {active: page === isLogs.pagination.current_page}" v-for="page in isLogs.pagination.last_page" :key="page">
            <a class="page-link" href="#" @click.prevent="changePage(getPageUrl(page))">
              {{page}}
            </a>
          </li>
          <li :class="'page-item', {disable: !isLogs.pagination.next_page_url} ">
            <a class="page-link" href="#"  @click.prevent="changePage(isLogs.pagination.next_page_url)">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
    {{ isLogs.pagination.last_page }}

    {{pagination}}
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
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
    changePage(url) {
      if (!url) return;
      this.$store.dispatch('fetchLogs', url); // Substitua pela sua action no Vuex
    },
    getPageUrl(page) {
      const baseUrl = this.isLogs.pagination.next_page_url?.split('?')[0];
      return `${baseUrl}?page=${page}`;
    },
  },
  computed: {
    ...mapState('user', ['isLogs', 'isLoading']),

  },
}
</script>
<style></style>
