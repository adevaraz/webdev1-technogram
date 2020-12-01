<template>
  <v-container fluid>
    <virtual-list
      class="list-infinite scroll-touch"
      :data-key="'id'"
      :data-sources="items"
      :data-component="itemComponent"
      v-on:tobottom="onScrollToBottom"
    >
      <div slot="footer">
        <div class="loader itemStillExist" v-if="isLoading">
          <v-progress-circular indeterminate color="#E52B38"></v-progress-circular>
        </div>
        <div class="no-item text-center" v-if="isEndOfList">
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
      console.log(this.items.length);
      if( this.items.length > 160){
        console.log(this.isEndOfList);
        if(this.isEndOfList){
          return
        }
        this.isEndOfList = true
        console.log(this.isEndOfList);
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        element.id = new Date().toString();
        this.items.push(element);
      });
      }
    }
};
</script>

<style scoped>
.loader {
  position: relative;
  left: 45%;
}

.no-item {
  border-top: 1px solid black;
}

.list-infinite::-webkit-scrollbar {
  display: none;
}

.list-infinite{
  width: 100%;
  height: 99vh;
  overflow-y: auto;
  position: relative;
}
</style>