<template>
  <v-container :style="{background : currentTheme.backgroundVariant}">
    <v-row>
      <v-col cols="12">
        <h3 
          :style="{ color: currentTheme.onBackground}"
        >
          Notification
        </h3>
      </v-col>
      <div
        class="notification-border"
      >
      </div>
      <v-col cols="12" align-self="center" v-if="isLoading">
        <v-row class="justify-center">
          <v-progress-circular
            indeterminate
            color="#E52B38"
          ></v-progress-circular>
        </v-row>
      </v-col>
      <v-col cols="12" align-self="center" v-if="!isLoading && error.isError">
        <div class="text-center" style="color: #e52b38">
          {{ error.message }}
        </div>
      </v-col>
      <v-col
        class="pt-0"
        v-for="berita in beritas"
        :key="berita.id_berita"
        cols="12"
      >
        <small-berita
          :berita="berita"
          :onBeritaSelected="onBeritaSelected"
          timeMode="TIME_MODE_RECENT"
          class="item"
        ></small-berita>
      </v-col>
      <div
        class="notification-border"
      >
      </div>
      <v-col cols="12" class="pa-1 text-center more" v-if="!isLoading">
        <h3 
          @click="$router.push({ name: 'notification' })"
          v-if="isMoreExist"
          :style="{ color: currentTheme.onBackground }"
        >
          More
        </h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import beritaApi from "../../../repository/interactor/berita/berita";
const SmallBerita = () => import("../berita/SmallBerita.vue");
import { BASE_URL } from "../../../repository/interactor/const";
import { store } from "../../../store/index";
import { mapGetters } from "vuex";
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
      isLoading: false,
      isMoreExist: false,
      error: {
        message: "",
        isError: false,
      },
    };
  },
  methods: {
    async getNotificatedBerita() {
      this.isLoading = true;
      const result = await beritaApi.getUserNotificatedNews(
        store.getters["user/getToken"],
        5
      );
      this.isLoading = false;
      if (result instanceof Error) {
        console.log(result);
        this.error.message = result.cause;
        this.error.isError = true;
        return;
      }
      this.isMoreExist = result.data.nextPage;
      if (!result.data.notifications || result.data.notifications.length < 1) {
        this.error.message = "You have no notification yet";
        this.error.isError = true;
        return;
      }
      result.data.notifications.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.beritas.push(element);
      });
    },
    onBeritaSelected(id, judul) {
      const judul_berita = judul.toLowerCase().split(" ").join("-");
      window.open(`/berita/${id}/${judul_berita}`, "_blank");
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
.notification-border {
  background: #bab4b8b9;
  width: 100%;
  height: 2px;
}

.item {
  cursor: pointer;
}
.more {
  cursor: pointer;
}

.more:hover {
  background: #bab4b8b9;
}
</style>
