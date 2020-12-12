<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="playfair-font text-start">{{categoryTitle}}</h1>
      </v-col>
      <v-col cols="6">
        <headline-berita
          :berita="headlineBerita"
          :isLoading="isLoading"
          imageHeight="22rem"
        ></headline-berita>
      </v-col>
      <v-col cols="4" offset="1">
        <v-row>
          <v-col cols="12" v-for="berita in litlerBeritas" :key="berita.id_berita" class="pa-0">
            <small-berita :berita="berita" :showTime="true" ></small-berita>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import HeadlineBerita from "../berita/HeadlineBerita.vue";
import SmallBerita from '../berita/SmallBerita.vue';
export default {
  components: { HeadlineBerita, SmallBerita },
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
  computed : {
    categoryTitle(){
      const category = this.category;
      return  category[0].toUpperCase() + category.slice(1).toLowerCase();
    }
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
</style>