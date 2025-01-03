<template>
  <div class="container">

        <div class="d-flex align-itens-center mx-2" v-if="  isLoading">

          <div class="spinner-border mx-2" role="status" >
            <span class="visually-hidden">Loading...</span>
          </div>
          <span v-if="isLogs != null">Buscando Informações no banco de dados...</span>
          <span v-else>Dados Recuperados!</span>
        </div>

    <div class="row justify-content-center text-center" v-else>
      <CardsView tittle="total de logs">
        <template v-slot:content>
          {{ isLogs?.data?.totalLogs }}

          <!--            <p>{{ isLogs.totalLogs }}</p>-->
        </template>
      </CardsView>
      <div class="border d-flex dropend">
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
        <div class="d-flex mx-2">

          <select class="form-select form-select-sm" aria-label="Small select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
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
          <li :class="['page-item', { disabled: !isLogs?.data?.pagination.prev_page_url }]">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(isLogs?.data?.pagination.prev_page_url)"
            >
              Previous
            </a>
          </li>
          <li
            v-for="page in isLogs?.data?.pagination.last_page"
            :key="page"
            :class="{ 'page-item': true, active: page === isLogs?.data?.pagination.current_page }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(getPageUrl(page))"
            >
              {{ page }}
            </a>
          </li>
          <li :class="['page-item', { disabled: !isLogs?.data?.pagination.next_page_url }]">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(isLogs?.data?.pagination.next_page_url)"
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
    ...mapActions('user', ['fetchLogs','LazyLoading']),

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
  LazyLoading(){
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  },
  computed: {
    // ...mapState('user',['']),
    ...mapGetters('user',['isLogs']),






  },

}
</script>
<style></style>
