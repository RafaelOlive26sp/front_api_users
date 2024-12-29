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
          <p>ID: {{ dataStatistc.newstUser?.id}}</p>
          <p>Nome: {{ dataStatistc.newstUser?.name }}</p>
          <p>Email: {{ dataStatistc.newstUser?.email }}</p>
          <p>Criado em: {{ dataStatistc.newstUser?.created_at }}</p>
        </template>
      </CardsView>
      <CardsView tittle="Usuarios mais antigos">
        <template v-slot:content>
          <p>ID: {{ dataStatistc.oldestUser?.id }}</p>
          <p>Nome: {{ dataStatistc.oldestUser?.name }}</p>
          <p>Email: {{ dataStatistc.oldestUser?.email }}</p>
          <p>Criado em: {{ dataStatistc.oldestUser?.created_at }}</p>
        </template>
      </CardsView>
      <CardsView tittle="Usuarios com email Verificados">
        <template v-slot:content>
          <ul v-for="userVerified in dataStatistc.verifiedUsers" :key="userVerified.id">
            <li class="border shadow-sm">
              id: {{ userVerified.id }} name: {{ userVerified.name }} email:
              {{ userVerified.email }} created: {{ userVerified.created_at }}
            </li>
          </ul>
        </template>
      </CardsView>

      <CardsView tittle="Usuarios com email Verificados">
        <template v-slot:content>
          <ul
            class=""
            v-for="userNotVerified in dataStatistc.unverifiedUsers"
            :key="userNotVerified.id"
          >
            <li class="border shadow-sm">
              id: {{ userNotVerified.id }} name: {{ userNotVerified.name }} email:
              {{ userNotVerified.email }} created: {{ userNotVerified.created_at }}
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
<style lang=""></style>
