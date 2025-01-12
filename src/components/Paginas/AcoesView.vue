<template>
  <p>{{ action }}</p>
  <CardsView classDivFather="col-md-7 mx-auto" :tittle="'Id: ' + datas?.id">
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
                <div class="mt-3">
                <span class="">Name:</span>
                <small class="mx-2" v-if="inputsUpdateName">
                  <input type="text" name="" id="" class="rounded-2 col-3" :placeholder="datas?.name" />
                </small>
                <small class="mx-2" v-else>{{ datas?.name }}</small>
                <i class="bi bi-pencil-square" @click="toggleInput('name')" style="cursor: pointer;"></i>
                <br />
                <span>Email:</span>
                <small class="mx-2" v-if="inputsUpdateEmail">
                  <input type="text" name="" id="" class="rounded-2" :placeholder="datas?.email" />
                </small>

                <small class="mx-2" v-else>{{ datas?.email }}</small>
                <i class="bi bi-pencil-square" @click="toggleInput('email')"></i>
                <!--                <p>Created At: {{ datas?.created_at }}</p>-->
                </div>
            </div>
            <div class="card-footer text-body-secondary p-0">
              <small>{{ datas?.created_at }}</small>
            </div>
          </div>
          <div class="border border-warning mt-3" v-if="action === 'Deletar' || action === 'Atualizar'">
            <div class="card-footer text-body-secondary p-0">
              <a href="" data-bs-toggle="modal" data-bs-target="#updateModal" >{{ action }}</a>
            </div>

          </div>
        </div>
      </div>
    </template>
  </CardsView>
  <!-- <ModalView id="updateModal">
    <template v-slot:content>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
    </template>
  </ModalView> -->
  <!-- <pre>
    {{ datas }}
    {{ action }}
     {{ $store.state.datas }}
  </pre> -->
</template>
<script>
import { mapState } from 'vuex'
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

    }
  },
  methods: {
    toggleInput(input) {

      if(input === 'name'){
        this.inputsUpdateName = !this.inputsUpdateName

      }

      if(input === 'email'){
        this.inputsUpdateEmail = !this.inputsUpdateEmail

      }
    },
  },
  computed: {
    ...mapState('user', ['datas', 'action']),
  },
}
</script>

<style scoped></style>
