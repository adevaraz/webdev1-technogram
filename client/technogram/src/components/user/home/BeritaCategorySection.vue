<template>
  <v-container class="px-1">
    <v-row>
      <v-col cols="6" class="pa-0 pb-3">
        <h2 class="title-text text-start text-capitalize" style="cursor:pointer;">
          {{ categoryTitle }}
        </h2>
      </v-col>
      <v-col cols="6" class="pa-0 pb-3" align-self="end">
        <h2 class="text-end"><a class="more-text " href="">More From This Category</a></h2>
      </v-col>
      <!-- <v-col cols="12" class="py-0" >
        <div class="underline"></div>
      </v-col> -->
      <v-col cols="12" class="floating">
        <v-row>
          <v-col cols="7" class="pt-0">
            <image-inside-berita
              :berita="headlineBerita"
              :isLoading="isLoading"
              imageHeight="22rem"
            ></image-inside-berita>
          </v-col>
          <!-- <v-col cols="1" class="grow pt-5" align="center">
        <div class="vertical-line"></div>
      </v-col> -->
          <v-col cols="5" class="pt-0 pl-5">
            <v-row>
              <v-col
                cols="12"
                v-for="berita in litlerBeritas"
                :key="berita.id_berita"
                class="pt-3"
              >
                <text-only-berita
                  :berita="berita"
                  :showTime="true"
                  class="underline"
                ></text-only-berita>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import ImageInsideBerita from "../berita/ImageInsideBerita.vue";
import TextOnlyBerita from "../berita/TextOnlyBerita.vue";
export default {
  components: { TextOnlyBerita, ImageInsideBerita },
  created() {
    this.getBeritaByCategory();
  },
  props: {
    category: String,
  },
  data() {
    return {
      litlerBeritas: [],
      headlineBerita: {},
      isLoading: false,
    };
  },
  computed: {
    categoryTitle() {
      const category = this.category;
      return category[0].toUpperCase() + category.slice(1).toLowerCase();
    },
  },
  methods: {
    async getBeritaByCategory() {
      this.isLoading = true;
      const result = await beritaApi.getByCat(4, this.category);
      this.popularLoading = false;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage = "Gagal mendapatkan berita karena " + result.cause;
        return;
      }
      this.isLoading = false;
      result.data.forEach((element, index) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        if (index == 0) {
          this.headlineBerita = element;
        } else {
          this.litlerBeritas.push(element);
        }
      });
    },
  },
};
</script>

<style scoped>
.underline {
  border-bottom: 1px solid rgb(204, 204, 204);
}

.vertical-line {
  width: 1%;
  height: 100%;
  background: rgb(204, 204, 204);
}

.floating {
  border: 0.1px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.199);
}

.more-text{
    color: rgb(229, 43, 56, 0.9);
    font-size: 0.7rem;
}

.more-text:hover{
  text-decoration: underline;
}

a{
  text-decoration: none;
}
</style>