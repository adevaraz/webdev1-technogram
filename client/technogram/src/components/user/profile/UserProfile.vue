<template>
  <v-container>
    <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
      <v-col cols="12" lg="12" md="12" xl="12" sm="12" xs="12">
        <headline-berita class="item" :berita="recentBerita[0]" :isLoading="recentLoading"></headline-berita>
      </v-col>
     
      <v-col cols="8" :class= "mt-n3" >
        <h1 :class= "playfair-font">Saved Articles</h1>

      </v-col>
     
        <div class="middle-border"></div>
  
      <v-col cols="12">
        <v-row :class= "justify-center">
          <v-col
            :cols= '12'
            class="mt-n2"
            v-for="berita in recentBerita"
            :key="berita.id_berita"
          >
            
            <mobile-preview-berita :berita="berita"></mobile-preview-berita>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MobilePreviewBerita from "../berita/BeritaPreview.vue";
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";

export default {
  created() {
    this.retrieveRecentBerita();
  },
  components: {
    MobilePreviewBerita,
  },
  data() {
    return {
      recentBerita: [],
      isError: false,
      errorMessage: "",
      recentLoading: false,
    };
  },
  methods: {
    async retrieveRecentBerita() {
      this.recentLoading = true;
      const result = await beritaApi.recentBerita();
      this.recentLoading = false;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage =
          "Gagal mendapatkan berita terkini karena " + result.cause;
        return;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.recentBerita.push(element);
      });
    },
    
  },
  computed: {
    
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
.playfair-font {
  font-family: "Playfair Display", serif;
}

.middle-border {
  background: rgb(112, 112, 112, 0.3);
  width: 100%;
  height: 2px;
}

.item {
  cursor: pointer;
}

.top-right-container {
  position: relative;
}

.progressbar {
  position: absolute;
  left: 45%;
  top: 45%;
}
</style>