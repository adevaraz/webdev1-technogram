<template>
  <v-container>
    <v-progress-circular v-if="recentLoading" indeterminate color="red" class="progressbar"></v-progress-circular>
    <div class="search-result" v-else>
      <v-row :class="isMobile? 'pa-0 justify-center ml-10' : 'justify-center'" d-block>
        <v-row
          class="mt-5 mr-16"
          v-for="index in 4"
          :key="index"
          @click="onBeritaSelected(recentBerita[((page * 5) - 5) + (index - 1)].id_berita)"
        >
          <search-result-recent
            v-if="!isMobile"
            :berita="recentBerita[((page * 5) - 5) + (index - 1)]"
          ></search-result-recent>
          <mobile-preview-berita v-else :berita="recentBerita[((page * 5) - 5) + (index - 1)]"></mobile-preview-berita>
        </v-row>
        <v-row
          :class="isMobile? 'justify-center ml-0' : 'd-flex justify-center mt-16'"
          v-if="!recentLoading"
        >
          <v-pagination
            v-model="page"
            :length="count"
            :per-page="pageSize"
            color="error"
            @input="handlePageChange"
          ></v-pagination>
        </v-row>
      </v-row>
    </div>
  </v-container>
</template>

<script>
//const PRIVIEW_MAX_WORDS = 70
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import MobilePreviewBerita from "../berita/MobilePreviewBerita.vue";
import SearchResultRecent from "./SearchResultPreview";
export default {
  components: { SearchResultRecent, MobilePreviewBerita },
  created() {
    this.retrieveRecentBerita();
  },
  data() {
    return {
      recentBerita: [],
      isError: false,
      errorMessage: "",
      recentLoading: false,
      page: 1,
      count: 0,
      pageSize: 5,
    };
  },
  watch: {
    $route: function () {
      this.recentBerita = [];
      this.retrieveRecentBerita();
    },
  },

  methods: {
    async retrieveRecentBerita() {
      this.recentLoading = true;
      const result = await beritaApi.recentBerita(
        this.pageSize,
        this.$route.query.q,
        this.page
      );
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
        this.count = this.count + 1;
      });
      console.log("Search by Recent");
      this.count = Math.ceil(this.count / this.pageSize);
      console.log(this.recentBerita);
      console.log(this.count);
    },

    flush() {
      this.recentBerita.splice(0);
    },

    handlePageChange(page) {
      console.log("handlepagechange");
      this.page = page;
      this.flush();
      this.retrieveRecentBerita();
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
.progressbar{
    position: absolute;
    left: 50%;
    top: 50%;
}
</style>