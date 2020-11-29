<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 class="notification-header">Notification</h3>
      </v-col>
      <v-col cols="12" align-self="center" v-if="isLoading">
        <v-row class="justify-center">
          <v-progress-circular indeterminate color="#E52B38"></v-progress-circular>
        </v-row>
      </v-col>
      <v-col class="pt-0" v-for="berita in beritas" :key="berita.id_berita" cols="12">
        <small-berita :berita="berita" timeMode="TIME_MODE_RECENT" class="item"></small-berita>
      </v-col>
      <v-col cols="12" class="pa-1 text-center more" v-if="!isLoading">
        <h3 @click="$router.push({name : 'notification'})">More</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import SmallBerita from "../berita/SmallBerita.vue";
export default {
  components: {
    SmallBerita,
  },
  created() {
    this.getNotificatedBerita();
  },
  data() {
    return {
      beritas: [],
      isLoading : false
    };
  },
  methods: {
    async getNotificatedBerita() {
      this.isLoading = true;
      const result = await beritaApi.recentBerita();
      this.isLoading = false;
      if (result instanceof Error) {
        return;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.beritas.push(element);
      });
    },
  },
};
</script>

<style scoped>
.notification-header {
  border-bottom: 1px solid #d9d9d9;
}

.item {
  cursor: pointer;
}
.more {
  cursor: pointer;
  border-top: 1px solid #eeeeee;
}

.more:hover {
  background: rgb(214, 214, 214);
}


</style>