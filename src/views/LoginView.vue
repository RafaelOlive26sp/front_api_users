<template>
  <div class="d-flex align-items-center py-4 bg-dark my-5 container">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="handleLogin">
        >
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage === 'Unauthorized'">
          <strong>Oops! Parece que a senha ou o e-mail estão incorretos.</strong> Por favor, verifique e tente novamente.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage === 'Forbidden' ">
          <strong>Oops! Parece que voçê esta tentando acessar o sistema sem autorização.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-else-if="errorMessage !== ''">
          <strong>Oops! Tivemos um erro inesperavel.</strong> Por favor, tente novamente mais tarde.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <h1 class="h3 mb-3 fw-normal text-dark-emphasis text-center">DashBoard</h1>

        <div class="form-floating">
          <input
            v-model="loginData.email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            autocomplete="current-email"
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating my-1">
          <input
            v-model="loginData.password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            autocomplete="current-password"
            required
          />
          <label for="floatingPassword">Password</label>
        </div>

        <button class="btn btn-primary w-100 py-2 text-light-emphasis" type="submit">
          Acessar
        </button>
        <!-- Ação para cadastrar -->
<!--        <small class="text-secondary mx-4" data-bs-toggle="modal" data-bs-target="#signUp">  &lt;!&ndash;  Ação para o cadastro    &ndash;&gt;-->
<!--          <a href="#" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover " >-->
<!--            Nao possui conta ? Cadastre-se-->
<!--          </a>-->
<!--        </small>-->
        <!-- Ação para cadastrar -->
        <h5 class="bg-danger mt-2 rounded-2"></h5>
        <a class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://github.com/RafaelOlive26sp/front_api_users"><i class="bi bi-file-code-fill"></i>Documentação</a>
        <span class="text-light mx-4 pe-auto" v-tooltips title="Contas de acesso: email - admin@admin.com | password - password , email - attend@admin.com | password - password">Primeiro acesso</span>
      </form>

        <ModalView id-modal="signUp" > <!--  Modal de Cadastro      -->
          <template v-slot:content>
            <div class="modal-body p-4 pt-0">
              <form class="" @submit.prevent="handleAccount">
                <div class="form-floating mb-3 mt-3" >  <!-- form para a criação de usuario -->

                  <div class="form-floating mb-1">
                    <input type="text" name="name" class="form-control rounded-3" id="nameInput" placeholder="Nome" v-model="createdAccount.name"   required>
                    <label for="nameInput">Name</label>
                  </div>
                  <div class="form-floating mb-1" >
                    <input type="email" name="email" class="form-control rounded-3 my-3" id="emailInput" placeholder="Email"  v-model="createdAccount.email"  required>
                    <label for="emailInput">Email</label>
                  </div>
                  <div class="form-floating mb-1" >
                    <input type="password" name="password" class="form-control rounded-3" id="passwordInput" placeholder="Password" v-model="createdAccount.password"  required>
                    <label for="passwordInput">Password</label>
                  </div>
                </div>

                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" >Cadastrar </button>


                <small class="text-body-secondary" >By creating the account, you agree to the terms of use.</small>

              </form>
            </div>
          </template>
        </ModalView>
    </main>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ModalView from '@/components/ModalView.vue'


export default {
  name: 'LoginView',
  components: {
    ModalView


  },
  data() {
    return {
      loginData:{
        email:'',
        password:'',
      },
      createdAccount:{
        name:'',
        email:'',
        password:'',
      },

    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('user', ['register']),
    async handleLogin() {
      try {
        await this.login({ email: this.loginData.email, password: this.loginData.password})

      }catch (error) {
        console.error(error)
      }
    },
    async handleAccount(){
      try{
        await this.register({name:this.createdAccount.name,  email: this.createdAccount.email, password: this.createdAccount.password})

      }catch(error){
        console.error(error.message); // Mostra apenas a mensagem do erro
         alert('Ocorreu um erro: ' + (error.response?.data?.message || 'Erro desconhecido'));
      }
    }


  },
  computed:{
    errorMessage(){
      return this.$store.state.auth.errorMessage;
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
