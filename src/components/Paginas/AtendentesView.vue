<template>
  <div class="container">
    <div class="row justify-content-center text-center">
      <CardProfileView>
        <template v-slot:header>
          <div class=" ">
            <div class="text-start">
              <p class="m-0 fs-5 fst-italic ">Rafael de oliveira</p>
              <p class="m-0 fw-semibold text-body-secondary " style="font-size: small">
                Desenvolvedor web
              </p>
            </div>
<!--            <input type="file" name="" id="">-->
            <i class="bi bi-pencil-square " v-tooltip title="Adicionar Foto" type="file" style="position: absolute;right: 110px;top: 189px;
                  " onclick="document.getElementById('fileInput').click()"></i>
            <img src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                  class="avatar rounded-4"
                  height="150"
                  width="150"
                  style="box-shadow: 2px 2px 5px -2px black" />
            <input  type="file" id="fileInput" style="display: none ;" accept="image/*" onchange="handleFileChange">
          </div>

          <a
            class="btnCollapse"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample2"
            aria-expanded="false"
            aria-controls="collapseExample2"
            style="position: absolute; left: 1px; top: 197px"
            v-tooltip
            title="Expandir"
          >
            <i class="bi bi-list" ></i>
          </a>

        </template>
        <template v-slot:content>

          <CollapesView id="collapseExample2" class="collapse">
            <template v-slot:content>
              <div class="card card-body" style="   box-shadow: 1px 1px 3px 0px #121212 inset; border-radius: 0px;">
                Some placeholder content for the collapse component. This panel is hidden by default
                but revealed when the user activates the relevant trigger.
              </div>
            </template>
          </CollapesView>

        </template>
      </CardProfileView>
    </div>
  </div>
</template>
<script>
import CardProfileView from '@/components/Cards/CardProfileView.vue'
import CollapesView from '@/components/CollapesView.vue'

export default {

  components: {
    CollapesView,
    CardProfileView
  },
  data() {
    return {

    }
  },
  methods:{
    handleFileChange(event) {

      const file = event.target.files[0];
      if (file) {
        console.log('Arquivo selecionado:', file.name);
        // Aqui você pode adicionar a lógica de upload ou pré-visualização da imagem
      }
    }
  }

}
</script>
<style scoped></style>
