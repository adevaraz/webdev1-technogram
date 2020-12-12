<template>
  <v-container>
    <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
      <v-col cols="12" v-if="isError"></v-col>
      <v-col cols="12" class="pa-0">
        <mobile-home-header
          :beritas="popularBerita"
          :headlineBerita="headlineBerita"
          :onBeritaSelected="onBeritaSelected"
          :popularLoading="popularLoading"
          :recentLoading="recentLoading"
          v-if="isMobile"
        ></mobile-home-header>
        <dekstop-home-header :popularBeritas="popularBerita" v-else></dekstop-home-header>
      </v-col>
      <v-col cols="12" v-if="!isMobile">
        <div class="middle-border"></div>
      </v-col>
      <v-col cols="12" :class="isMobile ? 'mt-n3 mb-n5' : ''">
        <h1
          :class="
            isMobile ? 'playfair-font text-start' : 'playfair-font text-center'
          "
        >
          Recent News
        </h1>
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
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import RecentVirtualScroll from "./RecentVirtualScroll.vue";
import MobileHomeHeader from "./MobileHomeHeader.vue";
import DekstopHomeHeader from "./DekstopHomeHeader";
export default {
  created() {
    this.retrievePopularBerita();
    this.retrieveRecentBerita();
  },
  components: {
    RecentVirtualScroll,
    MobileHomeHeader,
    DekstopHomeHeader,
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
        this.errorMessage =
          "Gagal mendapatkan berita terkini karena " + result.cause;
        return;
      }
      result.data[0].url_gambar = BASE_URL + "/" + result.data[0].url_gambar;
      this.headlineBerita = result.data[0];
    },
    async retrievePopularBerita() {
      this.popularLoading = true;
      const result = await beritaApi.popularBerita();
      this.popularLoading = false;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage =
          "Gagal mendapatkan berita populer karena " + result.cause;
        return;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.popularBerita.push(element);
      });
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
