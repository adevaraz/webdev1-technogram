<template>
  <v-container>
    <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
      <v-col cols="12" v-if="isError"></v-col>
      <v-col cols="12">
        <h1 :class="!isMobile ? 'playfair-font text-start' : 'playfair-font text-center'">Popular News</h1>
      </v-col>
      <v-col @click="onBeritaSelected(headlineBerita.id_berita)" cols="12" lg="5" md="12" xl="5" sm="12" xs="12">
        <headline-berita class="item" :berita="headlineBerita" :isLoading="recentLoading"></headline-berita>
      </v-col>
      <v-col cols="12" v-if="isMobile" class="mt-n6">
        <div class="middle-border"></div>
      </v-col>
      <v-col cols="12" lg="6" offset-lg="1" md="12" xl="6" offset-xl="1" sm="12">
        <v-row class="top-right-container">
          <v-progress-circular class="progressbar" v-if="popularLoading" color="#E52B38" height="10" indeterminate></v-progress-circular>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6" v-for="berita in popularBerita" :key="berita.id_berita" @click="onBeritaSelected(berita.id_berita)" class="pt-0">
            <small-berita class="item" :showTime="isMobile" :berita="berita"></small-berita>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="!isMobile">
        <div class="middle-border"></div>
      </v-col>
      <v-col cols="12" :class="isMobile ? 'mt-n3 mb-n5' : ''">
        <h1 :class="isMobile ? 'playfair-font text-start' : 'playfair-font text-center'">Recent News</h1>
      </v-col>
      <v-col cols="12" v-if="isMobile">
        <div class="middle-border"></div>
      </v-col>
      <v-col cols="12">
        <v-row :class="isMobile ? 'pa-0' : 'justify-center'">
          <recent-virtual-scroll></recent-virtual-scroll>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HeadlineBerita from "../berita/HeadlineBerita.vue";
import SmallBerita from "../berita/SmallBerita.vue";
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import RecentVirtualScroll from "./RecentVirtualScroll.vue";

export default {
  created() {
    this.retrievePopularBerita();
    this.retrieveRecentBerita();
  },
  components: {
    HeadlineBerita,
    SmallBerita,
    RecentVirtualScroll,
  },
  data() {
    return {
      popularBerita: [],
      isError: false,
      errorMessage: "",
      recentLoading: false,
      popularLoading: false,
      headlineBerita: null,
    };
  },
  methods: {
    async retrieveRecentBerita() {
      this.recentLoading = true;
      const result = await beritaApi.recentBerita(1, "");
      this.recentLoading = false;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage = "Gagal mendapatkan berita terkini karena " + result.cause;
        return;
      }
      this.headlineBerita = result.data[0];
    },
    async retrievePopularBerita() {
      this.popularLoading = true;
      const result = await beritaApi.popularBerita();
      this.popularLoading = false;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage = "Gagal mendapatkan berita populer karena " + result.cause;
        return;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.popularBerita.push(element);
      });
      console.log(this.popularBerita);
    },

    onBeritaSelected(id) {
      this.$router
        .push({
          name: "read-berita",
          params: { id: `${id}` },
        })
        .catch((err) => {
          err;
        });
    },
  },

  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    },
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
