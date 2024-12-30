<template>
  <div class="container">
    <div class="row justify-content-center">
      <CardsView tittle="Total de Contas">
        <template v-slot:content>
          <p>{{ dataStatistc.totalAccounts }}</p>
        </template>
      </CardsView>

      <CardsView tittle="Total de contas Não Verificadas">
        <template v-slot:content>
          <p>{{ dataStatistc.unverifiedAccounts }}</p>
        </template>
      </CardsView>

      <CardsView tittle="Total de contas Verificadas">
        <template v-slot:content>
          <p>{{ dataStatistc.verifiedAccounts }}</p>
        </template>
      </CardsView>

      <hr class="mt-2" />

      <CardsView tittle="Usuario cadastrado Recentemente">
        <template v-slot:content>
          <ul
            class="p-0"

          >
            <li class="border shadow-sm rounded-2 p-0 list-unstyled" >
              <div class="card-header text-body-secondary p-0">
                <span><small>ID: {{ dataStatistc.newstUser?.id }}</small></span>
              </div>
              <div class="card-body p-0">
                <p><small>Name: {{ dataStatistc.newstUser?.name }}</small></p>
                <p><small>Email: {{ dataStatistc.newstUser?.email }}</small></p>
              </div>
              <div class=" card-footer text-body-secondary p-0">
                <small>{{ dataStatistc.newstUser?.created_at }}</small>
              </div>

            </li>
          </ul>
        </template>
      </CardsView>
      <CardsView tittle="Usuarios mais antigos">
        <template v-slot:content>
          <ul
            class="p-0"

          >
            <li class="border shadow-sm rounded-2 p-0 list-unstyled" >
              <div class="card-header text-body-secondary p-0">
                <span><small>ID: {{ dataStatistc.oldestUser?.id }}</small></span>
              </div>
              <div class="card-body p-0">
                <p><small>Name: {{ dataStatistc.oldestUser?.name }}</small></p>
                <p><small>Email: {{ dataStatistc.oldestUser?.email }}</small></p>
              </div>
              <div class=" card-footer text-body-secondary p-0">
                <small>{{ dataStatistc.oldestUser?.created_at }}</small>
              </div>

            </li>
          </ul>
        </template>
      </CardsView>
      <CardsView tittle="Usuarios com email Verificados" classCustom="custom-scroll">
        <template v-slot:content>

          <ul
            class="p-0"
            v-for="userVerified in dataStatistc.verifiedUsers"
            :key="userVerified.id"
          >
            <li class="border shadow-sm rounded-2 p-0 list-unstyled" >
              <div class="card-header text-body-secondary p-0">
                <span><small>ID: {{userVerified.id}}</small></span>
              </div>
              <div class="card-body p-0">
                <p><small>Name: {{userVerified.name}}</small></p>
                <p><small>Email: {{userVerified.email}}</small></p>
              </div>
              <div class=" card-footer text-body-secondary p-0">
                <small>{{userVerified.created_at}}</small>
              </div>

            </li>
          </ul>
        </template>
      </CardsView>

      <CardsView tittle="Usuarios com email Nâo verificados" classCustom="custom-scroll">
        <template v-slot:content>
          <ul
            class="p-0"
            v-for="userNotVerified in dataStatistc.unverifiedUsers"
            :key="userNotVerified.id"
          >
            <li class="border shadow-sm rounded-2 p-0 list-unstyled" >
            <div class="card-header text-body-secondary p-0">
              <span><small>ID: {{userNotVerified.id}}</small></span>
            </div>
              <div class="card-body p-0">
                <p><small>Name: {{userNotVerified.name}}</small></p>
                <p><small>Email: {{userNotVerified.email}}</small></p>
              </div>
            <div class=" card-footer text-body-secondary p-0">
              <small>{{userNotVerified.created_at}}</small>
            </div>

            </li>
          </ul>

        </template>
      </CardsView>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CardsView from '@/components/Cards/CardsView.vue'

export default {
  created() {
    this.fetchdatas()
  },
  // mounted() {
  //   this.fetchdatas()
  // },
  components: {
    CardsView,
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('user', ['fetchStatisticData']),
    async fetchdatas() {
      try {
        await this.fetchStatisticData()
      } catch (error) {
        console.error(error)
      }
    },
  },
  computed: {
    dataStatistc() {
      return this.$store.state.user.StatisticData
    },
  },
}
</script>

