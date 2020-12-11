<template>
  <v-container fluid  class="pa-0"> 
    <virtual-list   ref="virtual-scroller" class="list-infinite scroll-touch" :page-mode="true" :data-key="'id'" :data-sources="items" :data-component="itemComponent" v-on:tobottom="onScrollToBottom" :keeps="20">
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
import RecentHomeItem from "./RecentVirtualScrollItem";
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
const NEWS_PERCALL = 10;
export default {
  created() {
    this.getNotificatedBerita();
  },
  data() {
    return {
      itemComponent: RecentHomeItem,
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
      const result = await beritaApi.recentBerita(NEWS_PERCALL, "", this.pageNum);
      this.pageNum++;
      this.isLoading = false;
      if (result instanceof Error) {
        return;
      }
      if (result.data.length <= 0) {
        if (this.isEndOfList) {
          return;
        }
        this.isEndOfList = true;
        console.log(this.isEndOfList);
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        element.id = new Date().toString();
        this.items.push(element);
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

.no-item {
  border-top: 1px solid black;
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
