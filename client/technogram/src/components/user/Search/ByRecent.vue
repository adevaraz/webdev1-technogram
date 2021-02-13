<template>
  <v-container>
    <virtual-list
      ref="virtual-scroller"
      class="list-infinite scroll-touch item"
      :page-mode="true"
      :data-key="'id_berita'"
      :data-sources="recentBerita"
      :data-component="itemComponent"
      v-on:tobottom="onScrollToBottom"
      :keeps="20"
    >
      <div slot="footer">
        <div class="loader itemStillExist" v-if="recentLoading">
          <v-progress-circular
            indeterminate
            color="#E52B38"
          ></v-progress-circular>
        </div>
        <div class="text-center" v-if="isEndOfList">
          <h3 :style="{color : currentTheme.onBackgroundVariant}">Tidak ada item lagi &#128512;</h3>
        </div>
      </div>
    </virtual-list>
  </v-container>
</template>

<script>
import beritaApi from "../../../repository/interactor/berita/berita";
const RecentItem = () => import("./SearchResultItem");
import { BASE_URL } from "../../../repository/interactor/const";
import {mapGetters} from "vuex";
const NEWS_PERCALL = 5;

export default {
  created() {
    this.retrieveRecentBerita();
  },
  
  data() {
    return {
      itemComponent: RecentItem,
      recentBerita: [],
      isError: false,
      errorMessage: "",
      recentLoading: false,
      pageNum: 1,
      isEndOfList: false,
      countLoading: 0,
    };
  },

  watch: {
    $route: function () {
      this.recentBerita = [];
      this.isEndOfList = false;
      this.pageNum = 1;
      this.retrieveRecentBerita();
    },
  },

  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },

  methods: {
    onScrollToBottom() {
      if (this.pageNum != 1) {
        this.countLoading++;
        if (!this.popularLoading && !this.isEndOfList) {
          if (this.countLoading < 2) {
            this.retrieveRecentBerita();
          } else {
            this.countLoading = 0;
          }
        }
      }
    },
    async retrieveRecentBerita() {
      this.recentLoading = true;
      const result = await beritaApi.recentBerita(
        NEWS_PERCALL,
        this.$route.query.q,
        this.pageNum
      );
      this.pageNum++;
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage =
          "Gagal mendapatkan berita terkini karena " + result.cause;
        return;
      }
      this.recentLoading = false;
      if (result.data.length <= 0) {
        if (this.isEndOfList) {
          return;
        }
        this.isEndOfList = true;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.recentBerita.push(element);
      });
    },
  },
};
</script>

<style scoped>
.loader {
  position: relative;
  left: 45%;
}

.list-infinite::-webkit-scrollbar {
  display: none;
}

.list-infinite {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 10rem;
  position: relative;
}

.item {
  cursor: pointer;
}

@media screen and (max-width: 960px) {
  .list-infinite {
    padding: 0 0;
  }
}
</style>