<template>
  <p>{{ action }}</p>
  <CardsView classDivFather="col-md-3" :tittle="'Id: ' + datas?.id">
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
                <small>Name: {{ datas?.name }}</small>
                <br />
                <small>Email: {{ datas?.email }}</small>
                <!--                <p>Created At: {{ datas?.created_at }}</p>-->
              </div>
            </div>
            <div class="card-footer text-body-secondary p-0">
              <small>{{ datas?.created_at }}</small>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CardsView>
  <pre>
    {{ datas }}
    {{ action }}
     {{ $store.state.datas }}
  </pre>
</template>
<script>
import { mapState } from 'vuex'
import CardsView from '@/components/Cards/CardsView.vue'
import PlaceHolderLoadingView from '@/components/PlaceHolderLoading/PlaceHolderLoadingView.vue'

export default {
  name: 'AcoesView',
  components: { PlaceHolderLoadingView, CardsView },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapState('user', ['datas', 'action']),
  },
}
</script>

<style scoped></style>
