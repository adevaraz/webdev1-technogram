<template>
  <v-container fluid>
    <virtual-list
      class="list-infinite scroll-touch"
      :data-key="'id'"
      :data-sources="items"
      :data-component="itemComponent"
    >
      <div slot="footer">
        <div class="loader itemStillExist" v-if="isLoading">
          <v-progress-circular indeterminate color="#E52B38"></v-progress-circular>
        </div>
        <div class="no-item text-center" v-if="isEndOfList" style="background:red;">
          <h3>No more item</h3>
        </div>
      </div>
    </virtual-list>
  </v-container>
</template>

<script>
import NotificationItem from "./NotificationItem.vue";
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
const NEWS_PERCALL = 10;
export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);
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
      if (!this.isLoading && !this.isEndOfList) {
        this.getNotificatedBerita();
      }
    },
    async getNotificatedBerita() {
      this.isLoading = true;
      const result = await beritaApi.recentBerita(
        NEWS_PERCALL,
        "",
        this.pageNum
      );
      // this.pageNum++;
      this.isLoading = false;
      if (result instanceof Error) {
        return;
      }
      console.log(result.data.length);
      // if( result.data.length < NEWS_PERCALL){
      //   if(this.isEndOfList){
      //     return
      //   }
      //   this.isEndOfList = true
      // }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        element.id = new Date().toString();
        this.items.push(element);
      });
    },
    handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.onScrollToBottom();
      }
    },
  },
  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.loader {
  position: relative;
  left: 45%;
}

.no-item {
  border-top: 2px solid black;
}

</style>