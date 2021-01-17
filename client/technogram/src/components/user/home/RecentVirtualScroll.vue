<template>
  <v-container fluid  class="pa-0"> 
    <virtual-list   
        ref="list" 
        class="list-infinite scroll-touch" 
        :page-mode="true" :data-key="'id'" 
        :data-sources="items" 
        :data-component="itemComponent"
        :estimate-size="70"
        v-on:tobottom="onScrollToBottom" :keeps="20"
      >
      <div slot="footer">
        <div class="loader itemStillExist" v-if="isLoading">
          <v-progress-circular indeterminate color="#E52B38"></v-progress-circular>
        </div>
        <div class="no-item text-center mt-5" v-if="isEndOfList">
          <h3>Tidak ada item lagi &#128512;</h3>
        </div>
      </div>
    </virtual-list>
  </v-container>
</template>

<script>
const RecentHomeItem = () => import("./RecentVirtualScrollItem");
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
  computed : {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    }
  },
  methods: {
    onScrollToBottom() {
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
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        element.id = element.id_berita;
        this.items.push(element);
        this.$refs.list.updatePageModeFront();
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
  font-size: 0.7rem;
}

.list-infinite::-webkit-scrollbar {
  display: none;
}

.list-infinite {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x:hidden;
  position: relative;
}

@media screen and (max-width: 960px) {
  .list-infinite {
    padding: 0 0;
  }
}
</style>
