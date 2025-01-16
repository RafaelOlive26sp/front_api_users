<template>
  <div class="container">
    <div class="row justify-content-center">
      <CardsView tittle="Total de Contas">
        <template v-slot:content>


          <PlaceHolderLoadingView v-if="isLoading"/>

          <p v-else>{{ dataStatistc.totalAccounts }}</p>

        </template>
      </CardsView>

      <CardsView tittle="Total de contas Não Verificadas">
        <template v-slot:content>
          <PlaceHolderLoadingView v-if="isLoading"/>
          <p v-else>{{ dataStatistc.unverifiedAccounts }}</p>
        </template>
      </CardsView>

      <CardsView tittle="Total de contas Verificadas">
        <template v-slot:content>
          <PlaceHolderLoadingView v-if="isLoading"/>
          <p v-else>{{ dataStatistc.verifiedAccounts }}</p>
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
                <PlaceHolderLoadingView v-if="isLoading"/>
                <span v-else><small>ID: {{ dataStatistc.newstUser?.id }}</small></span>
              </div>
              <div class="card-body p-0">
                <PlaceHolderLoadingView ClassCuston="placeholder col-4 rounded-2" v-if="isLoading"/>
                <p v-else><small>Name: {{ dataStatistc.newstUser?.name }}</small></p>
                <PlaceHolderLoadingView ClassCuston="placeholder col-7 rounded-2" v-if="isLoading"/>
                <p v-else><small>Email: {{ dataStatistc.newstUser?.email }}</small></p>
              </div>
              <div class=" card-footer text-body-secondary p-0">
                <span class="ms-2">Data de Criação: </span>
                <PlaceHolderLoadingView ClassCuston="placeholder col-10 rounded-2" v-if="isLoading"/>
                <span v-else>{{ dataStatistc.newstUser?.created_at }}</span>
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
                <PlaceHolderLoadingView v-if="isLoading"/>
                <span v-else><small>ID: {{ dataStatistc.oldestUser?.id }}</small></span>
              </div>
              <div class="card-body p-0">
                <PlaceHolderLoadingView ClassCuston="placeholder col-4 rounded-2" v-if="isLoading"/>
                <p v-else><small>Name: {{ dataStatistc.oldestUser?.name }}</small></p>
                <PlaceHolderLoadingView ClassCuston="placeholder col-7 rounded-2" v-if="isLoading"/>
                <p v-else><small>Email: {{ dataStatistc.oldestUser?.email }}</small></p>
              </div>
              <div class=" card-footer text-body-secondary p-0">
                <span class="ms-2">Data de Criação: </span>
                <PlaceHolderLoadingView ClassCuston="placeholder col-10 rounded-2" v-if="isLoading"/>
                <span v-else>{{ dataStatistc.oldestUser?.created_at }}</span>
              </div>

            </li>
          </ul>
        </template>
      </CardsView>
      <CardsView tittle="Usuarios com email Verificados" classCustom="custom-scroll">
        <template v-slot:content>

          <ul
            class="p-0"
            v-for="userVerified in dataStatistc?.verifiedUsers"
            :key="userVerified.id"
          >
            <li class="border shadow-sm rounded-2 p-0 list-unstyled" >
              <div class="card-header text-body-secondary p-0">
                <PlaceHolderLoadingView v-if="isLoading"/>
                <span v-else><small>ID: {{userVerified.id}}</small></span>
              </div>
              <div class="card-body p-0">
                <span class=" d-flex   justify-content-end shadown-sm" v-tooltip
                title="Administrador" v-if="userVerified.privilege_id === 1">
                  <img src="@/components/icons/admin.png" alt="" height="20" width="20">
                </span>
                <span class=" d-flex   justify-content-end shadown-sm" v-tooltip
                title="Atendente" v-else-if="userVerified.privilege_id === 2">
                  <img src="@/components/icons/atten.png" alt="" height="20" width="20">
                </span>
                <PlaceHolderLoadingView ClassCuston="placeholder col-3 rounded-2" v-if="isLoading"/>
                <p v-else><small>Name: {{userVerified.name}}</small></p>
                <PlaceHolderLoadingView ClassCuston="placeholder col-7 rounded-2" v-if="isLoading"/>
                <p v-else><small>Email: {{userVerified.email}}</small></p>
              </div>
              <div class=" card-footer text-body-secondary p-0">
                <span class="ms-2">Data de Criação: </span>
                <PlaceHolderLoadingView ClassCuston="placeholder col-10 rounded-2" v-if="isLoading"/>
                <span v-else>{{userVerified.created_at}}</span>

              </div>

            </li>
          </ul>
        </template>
      </CardsView>

      <CardsView tittle="Usuarios com email Nâo verificados" classCustom="custom-scroll">
        <template v-slot:content>
          <ul
            class="p-0"
            v-for="userNotVerified in dataStatistc?.unverifiedUsers"
            :key="userNotVerified.id"
          >
            <li class="border shadow-sm rounded-2 p-0 list-unstyled" >
            <div class="card-header text-body-secondary p-0">
              <PlaceHolderLoadingView v-if="isLoading"/>
              <span v-else><small>ID: {{userNotVerified.id}}</small></span>
            </div>
              <div class="card-body p-0">
                <span class=" d-flex   justify-content-end shadown-sm" v-tooltip
                title="Administrador" v-if="userNotVerified.privilege_id === 1">
                  <img src="@/components/icons/admin.png" alt="" height="20" width="20">
                </span>
                <span class=" d-flex   justify-content-end shadown-sm" v-tooltip
                title="Atendente" v-else-if="userNotVerified.privilege_id === 2">
                  <img src="@/components/icons/atten.png" alt="" height="20" width="20">
                </span>


                <PlaceHolderLoadingView ClassCuston="placeholder col-3 rounded-2" v-if="isLoading"/>
                <p v-else><small>Name: {{userNotVerified.name}}</small></p>
                <PlaceHolderLoadingView ClassCuston="placeholder col-7 rounded-2" v-if="isLoading"/>
                <p v-else><small>Email: {{userNotVerified.email}}</small></p>
              </div>
            <div class=" card-footer text-body-secondary p-0">
              <span class="ms-2">Data de Criação: </span>
              <PlaceHolderLoadingView ClassCuston="placeholder col-10 rounded-2" v-if="isLoading"/>
              <span v-else>{{userNotVerified.created_at}}</span>
            </div>

            </li>
          </ul>

        </template>
      </CardsView>
    </div>
  </div>
</template>
<script>
import { mapActions,mapState } from 'vuex'
import CardsView from '@/components/Cards/CardsView.vue'
import PlaceHolderLoadingView from '@/components/PlaceHolderLoading/PlaceHolderLoadingView.vue'

export default {
  mounted() {
    console.log('Component mounted');
    this.LazyLoading()
  },

  created() {
    console.log('Component created');
    this.fetchdatas()

  },

  components: {
    CardsView,
    PlaceHolderLoadingView
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('user', ['fetchStatisticData','LazyLoading']),
    async fetchdatas() {
      try {
        await this.fetchStatisticData()
      } catch (error) {
        console.error(error)
      }
    },
  },
  computed: {
    ...mapState('user', ['isLoading']),
    dataStatistc() {
      return this.$store.state.user.StatisticData
    },
  },
}
</script>

<style scoped>
.card-footer >span {
  font-size: 12px;
}
</style>

