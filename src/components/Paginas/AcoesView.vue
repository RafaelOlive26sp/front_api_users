<template>
  <p>{{ action }}</p>
  <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
    {{ successMessage }}
  </div>
  <div v-if="deleteAccount" class="alert alert-danger mt-3" role="alert">
    {{ deleteAccount.message }}
  </div>

  <CardsView classDivFather="col-md-7 mx-auto" :tittle="'Id: ' + datas?.id" v-else>
    <template v-slot:content>
      <div class="">
        <div class="col-12">
          <div class="card">
            <div class="card-body d-flex align-items-start">
              <div class="me-3">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                  class="avatar rounded-4"
                  height="100"
                  width="100"
                  style="box-shadow: 2px 2px 5px -2px black"
                />
              </div>
                <span class="position-absolute top-0 start-40 translate-middle  badge rounded-pill text-bg-secondary p-1" >
                  <small v-if="datas?.privilege_id === 1">Administrador</small>
                  <small v-else-if="datas?.privilege_id === 2">Atendente</small>
                  <small v-else>Cliente</small>
                </span>


                <div class="mt-3 col-7">

                  <span class="" style="font-size: 15px;">Nome:</span>

                  <small class="mx-2" v-if="inputsUpdateName && action === 'Atualizar'">
                    <input type="text" name="" id="" class="rounded-2 col-3" :placeholder="datas?.name" v-model="inputsUpdate.name"/>
                  </small>

                  <small class="mx-2" v-else>{{ datas?.name }}</small>
                  <i class="bi bi-pencil-square" @click="toggleInput('name')" style="cursor: pointer;" v-if="action === 'Atualizar'"></i>

                  <br />

                  <span style="font-size: 15px;">Email:</span>
                  <small class="mx-2" v-if="inputsUpdateEmail && action === 'Atualizar'">
                    <input type="email" name="" id="" class="rounded-2" :placeholder="datas?.email" v-model="inputsUpdate.email" />
                  </small>

                  <small class="mx-2" v-else>{{ datas?.email }}</small>
                  <i class="bi bi-pencil-square" @click="toggleInput('email')" v-if="action === 'Atualizar'"></i>
                  <br/>
                  <div class=" p-0 m-0 col-5 mx-auto" v-if="action === 'Atualizar'">
                    <span style="font-size:15px;" >Privilegio</span>
                    <select class="form-select form-select-sm" aria-label="Small select example" v-model="inputsUpdate.privilege_id">
                      <option selected>Selecione uma opção</option>
                      <option value="1">Administrador</option>
                      <option value="2">Atendente</option>
                      <option value="3">Cliente</option>
                    </select>
                  </div>
                  {{ inputsUpdate.privilege_id }}

                </div>
            </div>
            <div class="card-footer text-body-secondary p-0 text-start" v-if="datas?.created_at" >
              <span class="ms-2">Data de Criação: </span>
              <span class="">{{ datas?.created_at }}</span>
              <span class="ms-2">Data da Ultima Atualização: </span>
              <span>{{ datas?.updated_at }}</span>
            </div>
          </div>
          <div class=" mt-3 " v-if="action === 'Deletar' || action === 'Atualizar'">
            <div class="card-footer text-body-secondary p-0" v-if="inputsUpdate.name || inputsUpdate.email || inputsUpdate.privilege_id ">
              <a href="" @click.prevent="updateAccountUsers(datas?.id)" >{{ action }}</a>
            </div>
          </div>
          <div class="d-flex justify-content-center" v-if="btnAction">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CardsView>
  <!-- {{datas}} -->
</template>
<script>
import { mapState,mapActions } from 'vuex'
import CardsView from '@/components/Cards/CardsView.vue'

// import ModalView from '@/components/ModalView.vue'
// import PlaceHolderLoadingView from '@/components/PlaceHolderLoading/PlaceHolderLoadingView.vue'

export default {
  name: 'AcoesView',
  components: {
    CardsView,
    // ModalView,
    // PlaceHolderLoadingView
   },
  data() {
    return {
      inputsUpdateName: false,
      inputsUpdateEmail: false,
      inputsUpdate:{
        name: '',
        email: '',
        privilege_id:''
      },
      btnAction: false,
      successMessage: ''

    }
  },
  methods: {
    ...mapActions('user', ['updateAccount','getUserById']),
    toggleInput(input) {

      if(input === 'name') this.inputsUpdateName = !this.inputsUpdateName
      if(input === 'email') this.inputsUpdateEmail = !this.inputsUpdateEmail
    },
    async updateAccountUsers(Id){
      try {
        const updateData = {
          name: this.inputsUpdate.name || this.datas?.name,
          email: this.inputsUpdate.email || this.datas?.email,
          privilege_id: this.inputsUpdate.privilege_id || this.datas?.privilege_id,
          id: Id
        };
          await this.updateAccount(updateData)
          this.clearInputs();
          this.successMessage = 'Conta Atualizada com sucesso!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

      } catch (error) {
        console.log(error)

      }

    },
    clearInputs(){
      this.inputsUpdate.name = '';
      this.inputsUpdate.email = '';
    },
    setCollapse(id, dadosDoUsuario, metodo){

      this.$store.dispatch('user/setActiveCollapse', {id,dadosDoUsuario,metodo});
    },


  },
  computed: {
    ...mapState('user', ['datas', 'action','deleteAccount']),
  },
}
</script>

<style scoped>
.card-footer >span {
  font-size: 12px;
}


</style>
