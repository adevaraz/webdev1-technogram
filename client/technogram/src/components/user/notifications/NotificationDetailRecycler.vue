<template>
  <v-container fluid :style="{background : currentTheme.backgroundVariant}">
    <virtual-list ref="virtual-scroller" class="list-infinite scroll-touch" :page-mode="true" :data-key="'id'" :data-sources="items" :data-component="itemComponent" v-on:tobottom="onScrollToBottom" :keeps="20">
      <div slot="footer">
        <div class="loader itemStillExist" v-if="isLoading">
          <v-progress-circular indeterminate color="#E52B38"></v-progress-circular>
        </div>
        <div class="no-item text-center" v-if="isEndOfList" :style="{ color: currentTheme.onBackground }">
          <h3>Tidak ada item lagi &#128512;</h3>
        </div>
      </div>
    </virtual-list>
  </v-container>
</template>

<script>
const NotificationItem = () => import("./NotificationItem.vue");
import beritaApi from "../../../repository/interactor/berita/berita";
import { BASE_URL } from "../../../repository/interactor/const";
import { store } from "../../../store/index";
import { mapGetters } from "vuex";
const NEWS_PERCALL = 10;
export default {
  created() {
    this.getNotificatedBerita();
  },
  data() {
    return {
      itemComponent: NotificationItem,
      pageNum: 1,
      isLoading: false,
      items: [],
      isEndOfList: false,
    };
  },
  methods: {
    onScrollToBottom() {
      console.log(this.isEndOfList);
      if (!this.isLoading && !this.isEndOfList) {
        this.getNotificatedBerita();
      }
    },
    async getNotificatedBerita() {
      this.isLoading = true;
      const result = await beritaApi.getUserNotificatedNews(store.getters["user/getToken"], NEWS_PERCALL, "", this.pageNum);
      this.pageNum++;
      this.isLoading = false;
      if (result instanceof Error) {
        return;
      }
      if (result.data.notifications.length <= 0 || !result.data.nextPage) {
        if (this.isEndOfList) {
          return;
        }
        this.isEndOfList = true;
        console.log(this.isEndOfList);
      }
      result.data.notifications.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        element.id = new Date().toString();
        this.items.push(element);
      });
    },
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
    }),
  }
};
</script>

<style scoped>
.loader {
  position: relative;
  left: 45%;
}

.no-item {
  border-top: 1px solid #bab4b8b9;
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

@media screen and (max-width: 960px) {
  .list-infinite {
    padding: 0 0;
  }
}
</style>
