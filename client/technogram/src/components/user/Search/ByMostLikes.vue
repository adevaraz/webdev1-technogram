<template>
  <v-container>
    <v-progress-circular v-if="popularLoading" indeterminate color="red" class="progressbar"></v-progress-circular>
    <div class="search-result" v-else>
      <v-row :class="isMobile? 'pa-0 justify-center ml-10' : 'justify-center'" d-block>
        <v-col cols="12" class="mt-5 mr-16" v-for="index in 4" :key="index"
        @click="onBeritaSelected(mostLikedBerita[((page * 5) - 5) + (index - 1)].id_berita)">
          <search-result-recent
            v-if="!isMobile"
            :berita="mostLikedBerita[((page * 5) - 5) + (index - 1)]"
          ></search-result-recent>
          <mobile-preview-berita v-else :berita="mostLikedBerita[((page * 5) - 5) + (index - 1)]"></mobile-preview-berita>
        </v-col>
        <v-col cols="12"
          :class="isMobile? 'justify-center ml-0' : 'd-flex justify-center mt-16'"
          v-if="!popularLoading"
        >
          <v-pagination
            v-model="page"
            :length="count"
            :per-page="pageSize"
            color="error"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
//const PRIVIEW_MAX_WORDS = 70
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import SearchResultRecent from "./SearchResultPreview";
export default {
  components: { SearchResultRecent },
  created() {
    this.retrieveMostLikedBerita();
  },
  data() {
    return {
      mostLikedBerita: [],
      isError: false,
      errorMessage: "",
      popularLoading: false,
      page: 1,
      count: 0,
      pageSize: 5,
    };
  },
  watch: {
    $route: function () {
      this.mostLikedBerita = [];
      this.retrieveMostLikedBerita();
    },
  },

  methods: {
    async retrieveMostLikedBerita() {
      this.popularLoading = true;
      //benerin perpage sama page nya, parameternya teh (perpage, key, page)
      const result = await beritaApi.popularBerita(
        this.pageSize,
        this.$route.query.q,
        this.page
      );
      //const result = await beritaApi.popularBerita();
      this.popularLoading = false;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage = "Gagal mendapatkan berita karena " + result.cause;
        return;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.mostLikedBerita.push(element);
        this.count = this.count + 1;
      });
      console.log("Search by Most Likes");
      this.count = Math.ceil(this.count / this.pageSize);
      console.log("MOST LIKED BERITA");
      console.log(this.mostLikedBerita);
    },

    flush() {
      this.mostLikedBerita.splice(0);
    },

    handlePageChange(page) {
      console.log("handlepagechange");
      this.page = page;
      this.flush();
      this.retrieveMostLikedBerita();
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