<template>
  <v-container>
    <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
      <v-col cols="12" :class="isMobile ? 'mt-n3 mb-n5' : ''">
        <h1
          :class="isMobile ? 'title-font ml-n2' : 'title-font save-page-title'"
        >
          Saved Articles
        </h1>
      </v-col>
      <div :class="isMobile ? 'middle-border-mobile' : 'middle-border'"></div>
      <v-col cols="12" class="text-center progressbar">
        <v-progress-circular
          v-if="beritaLoading"
          indeterminate
          color="red"
        ></v-progress-circular>
      </v-col>
      <v-col cols="12">
        <v-row :class="isMobile ? 'pa-0' : 'justify-center'">
          <v-col
            :cols="isMobile ? '12' : '10'"
            class="mt-n2"
            v-for="berita in savedBerita"
            :key="berita.id_berita"
            @click="onBeritaSelected(berita.id_berita)"
          >
            <preview-berita
              class="item"
              v-if="!isMobile"
              :berita="berita"
            ></preview-berita>
            <mobile-preview-berita
              class="item"
              v-else
              :berita="berita"
            ></mobile-preview-berita>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PreviewBerita from "../berita/BeritaPreview.vue";
import MobilePreviewBerita from "../berita/MobilePreviewBerita.vue";
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import { store } from "../../../store/index";

export default {
  created() {
    if (!store.getters["user/isTokenExist"]) {
      this.$router.push("/");
    } else {
      this.retrieveSavedBerita();
    }
  },
  components: {
    PreviewBerita,
    MobilePreviewBerita,
  },
  data() {
    return {
      savedBerita: [],
      listBerita: [],
      isError: false,
      errorMessage: "",
      beritaLoading: false,
    };
  },

  methods: {
    async retrieveSavedBerita() {
      this.beritaLoading = true;
      const result = await beritaApi.savedBeritaList(
        "",
        "",
        "",
        store.getters["user/getToken"]
      );
      this.beritaLoading = false;
      console.log("loooggg " + store.getters["user/isLoggedIn"]);
      if (result instanceof Error) {
        this.isError = true;
        this.errorMessage =
          "Gagal mendapatkan berita terkini karena " + result.cause;
        return;
      }
      result.data.forEach((element) => {
        element.url_gambar = BASE_URL + "/" + element.url_gambar;
        this.savedBerita.push(element);
        console.log("ini id " + element.id_pembaca);
      });
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
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
.title-font {
  font-family: "Work sans", serif;
}
.save-page-title {
  margin-left: 18%;
}
.middle-border {
  background: rgb(0, 0, 0, 0.6);
  width: 63%;
  height: 2px;
  margin-left: 18%;
}
.middle-border-mobile {
  background: rgb(0, 0, 0, 0.6);
  width: 100%;
  height: 2px;
}

.item {
  cursor: pointer;
}

.top-right-container {
  position: relative;
}

.progressbar {
  position: absolute;
  top: 45%;
}
</style>