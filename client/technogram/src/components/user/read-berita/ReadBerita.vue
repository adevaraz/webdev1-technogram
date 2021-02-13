<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      class="progressbar"
      color="#E52B38"
      :size="50"
      :width="7"
      indeterminate
    ></v-progress-circular>
    <v-container
      v-else-if="isExist"
      :class="isMobile ? 'd-flex flex-wrap mb-6' : 'd-flex flex-col mb-6'"
    >
      <v-sheet :style="{background : currentTheme.background}" :class="isMobile ? 'mx-2' : 'pr-16 max-width-read'">
        <h1 class="text-capitalize playfair-font"  :style="{color : currentTheme.onBackgroundVariant}">{{ judul }}</h1>
        <p class="worksans-font" :style="{color : currentTheme.primaryVariant}">{{ date }}</p>

        <!-- Information section -->
        <v-card
        :style="{background : currentTheme.background}"
          :class="
            isMobile
              ? 'd-flex flex-wrap mb-3 max-width-50'
              : 'd-flex flex-row mb-3'
          "
          flat
          tile
        >
          <h4 class="mr-auto" :style="{color : currentTheme.onBackgroundVariant}">oleh {{ jurnalis }}</h4>

          <div :class="isMobile ? 'd-flex flex-row my-3' : 'd-flex flex-row'">
            <div id="like">
              <div class="d-flex flex-row" v-if="isLoggedIn">
                <img
                  v-if="!isLiked"
                  v-on:click="likeBerita()"
                  class="act-item img-btn mr-1"
                  src="../../../assets/icons/heart-empty.svg"
                  alt="empty heart icon"
                />
                <img
                  v-else
                  v-on:click="likeBerita()"
                  class="act-item img-btn mr-1"
                  src="../../../assets/icons/heart-filled.svg"
                  alt="filled heart icon"
                />
                <p class="text-caption text-left mr-3 worksans-font"
                :style="{color : currentTheme.onBackgroundVariant}">
                  {{ jumlah_likes }} suka
                </p>
              </div>
              <div class="d-flex flex-row" v-else>
                <auth-user
                  v-if="isLoginDialogShown"
                  :onDialogClosed="
                    () => {
                      isLoginDialogShown = false;
                    }
                  "
                ></auth-user>
                <img
                  class="act-item img-btn mr-1"
                  src="../../../assets/icons/heart-empty.svg"
                  @click="isLoginDialogShown = !isLoginDialogShown"
                  alt="empty heart icon"
                />
                <p class="text-caption text-left mr-3 worksans-font"
                :style="{color : currentTheme.onBackgroundVariant}">
                  {{ jumlah_likes }} suka
                </p>
              </div>
            </div>

            <div id="view" class="d-flex flex-row">
              <img
                class="act-item mr-1"
                style="height: 13px"
                src="../../../assets/icons/view.svg"
                alt="eye icon"
              />
              <p class="text-caption text-left mr-3 worksans-font"
              :style="{color : currentTheme.onBackgroundVariant}">
                {{ jumlah_reader }} pembaca
              </p>
            </div>

            <div id="save">
              <div class="d-flex flex-row" v-if="isLoggedIn">
                <img
                  v-if="!isSaved"
                  v-on:click="saveBerita()"
                  class="act-item img-btn"
                  src="../../../assets/icons/unsaved-icon.svg"
                  alt="unbookmarked icon"
                />
                <img
                  v-else
                  v-on:click="saveBerita()"
                  class="act-item img-btn"
                  src="../../../assets/icons/saved-icon.svg"
                  alt="bookmarked icon"
                />
              </div>
              <div class="d-flex flex-row" v-else>
                <auth-user
                  v-if="isLoginDialogShown"
                  :onDialogClosed="
                    () => {
                      isLoginDialogShown = false;
                    }
                  "
                ></auth-user>
                <img
                  class="act-item img-btn"
                  src="../../../assets/icons/unsaved-icon.svg"
                  @click="isLoginDialogShown = !isLoginDialogShown"
                  alt="unbookmarked icon"
                />
              </div>
            </div>

            <div id="share">
              <div class="d-flex flex-row ml-3">
                <share
                  v-if="share"
                  :onDialogClosed="
                    () => {
                      share = false;
                    }
                  "
                  :judul_berita="judul"
                ></share>
                <img
                  class="act-item img-btn"
                  @click="share = !share"
                  src="../../../assets/icons/share.svg"
                  alt="share icon"
                />
              </div>
            </div>
          </div>
        </v-card>

        <div id="content" class="worksans-font">
          <div id="header">
            <img
              v-if="this.urlTemp != null"
              :src="urlTemp"
              :aspect-ratio="16 / 9"
              contain
              class="grey darken-4"
              :alt="this.judul"
            />
          </div>

          <div
            
          :class = "[
            
          isMobile && isDark? 'article responsive-img break-words dark':'',  
          !isMobile && isDark? 'article responsive-img dark': '', 
          isMobile && !isDark? 'article responsive-img break-words':'',  
          !isMobile && !isDark? 'article responsive-img':''
          
          ]"
          v-html = "artikel"
          ></div>

          <h3 :style="{color : currentTheme.onBackgroundVariant}"
          >Ditulis oleh</h3>
          <h4 :style="{color : currentTheme.primaryVariant}">{{ jurnalis }}</h4>
          <p :style="{color : currentTheme.onBackgroundVariant}">{{ deskripsi_jurnalis }}</p>
        </div>
      </v-sheet>

      <div :class="isMobile? 'my-4 max-width-rec' : 'my-16'">
        <h3 class="worksans-font red-text">Rekomendasi</h3>
        <v-progress-circular
          class="small-progressbar"
          v-if="relatedBeritaLoading"
          color="#E52B38"
          indeterminate
        ></v-progress-circular>
        <div
          v-for="berita in relatedBerita"
          :key="berita.id_berita"
          class="d-flex flex-col"
          @click="onBeritaSelected(berita.id_berita, berita.judul)"
        >
          <small-berita
            v-if="berita.id_berita != id"
            class="act-item"
            :style="{color : currentTheme.onBackgroundVariant}"
            :berita="berita"
          ></small-berita>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { BASE_URL } from "../../../repository/interactor/const";
import { store } from "../../../store/index";
import { mapActions,mapGetters } from "vuex";

import berita from "../../../repository/interactor/berita/berita";
import pembacaAct from "../../../repository/interactor/pembaca/actions";
import kategori from "../../../repository/interactor/kategori/daftarKategori";
const SmallBerita = () => import("../berita/SmallBerita.vue");
const AuthUser = () => import("../auth/AuthUser");
const Share = () => import("./Share");

export default {
  components: {
    SmallBerita,
    AuthUser,
    Share,
  },

  created() {
    this.resetData();
    this.incrementViewer(this.$route.params.id);
    this.getBeritabyId(this.$route.params.id);
    this.getLikeState(this.$route.params.id);
    this.getSaveState(this.$route.params.id);
    this.retrieveRelatedBerita(this.$route.params.id);
  },

  data() {
    return {
      id: 0,
      judul: "",
      artikel: "",
      waktu_publikasi: "",
      url_gambar: "",
      kategori_berita: "",
      jumlah_reader: 0,
      jumlah_likes: 0,
      jurnalis: "",
      deskripsi_jurnalis: "",
      relatedBerita: [],
      urlTemp: null,
      urlGambar: null,
      isLoading: false,
      isExist: false,
      isLiked: false,
      likeClick : 0,
      isSaved: false,
      relatedBeritaLoading: false,
      errorMessage: "",
      isLoginDialogShown: false,
      share: false,
      contentDesc: "",
    };
  },

  metaInfo() {
    return {
      title: this.judul,
      meta: [
        { charset: "utf-8" },
        {
          vmid: "description",
          name: "description",
          content: this.contentDesc,
        },
      ],
    };
  },

  watch: {
    $route: function () {
      this.resetData();
      this.incrementViewer(this.$route.params.id);
      this.getBeritabyId(this.$route.params.id);
      this.retrieveRelatedBerita(this.$route.params.id);
      this.getLikeState(this.$route.params.id);
      this.getSaveState(this.$route.params.id);
     
    },
  },

  computed: {
    computedJudul() {
      return this.judul;
    },
  
    date() {
      // Format : DayName, DD/MM/YYYY HH:MM
      const fullDate = new Date(this.waktu_publikasi);
      const day = fullDate.toString().split(" ")[0];
      const date = fullDate.toLocaleDateString();
      const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;

      return `${day} ${date} ${time}`;
    },

    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      } else {
        return false;
      }
    },

    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      currentTheme : "theme/getCurrentColor",
      isDark : "theme/getIsDark"
    }),
  },

  methods: {
    ...mapActions({
      toogleTheme : "theme/toogleDark"
    }),
      replaceSpan(){
      this.artikel = this.artikel.replaceAll('<span style="background-color: transparent; color: rgb(0, 0, 0);">',"");
      this.artikel = this.artikel.replaceAll('<span style="color: rgb(0, 0, 0);">',"");
      this.artikel = this.artikel.replaceAll('<span style="color: rgb(0, 0, 0); background-color: transparent;">',"");
      this.artikel = this.artikel.replaceAll('<em style="background-color: transparent; color: rgb(0, 0, 0);">',"");
      this.artikel = this.artikel.replaceAll('</span>',"");
      
    },
    resetData() {
      this.id = 0;
      this.judul = "";
      this.artikel = "";
      this.waktu_publikasi = "";
      (this.url_gambar = ""), (this.kategori_berita = "");
      this.jumlah_reader = 0;
      this.jumlah_likes = 0;
      this.jurnalis = "";
      this.deskripsi_jurnalis = "";
      this.relatedBerita = [];
      this.urlTemp = null;
      this.urlGambar = null;
      this.isLoading = false;
      this.isLiked = false;
      this.likeClick = 0;
      this.isSaved = false;
      this.relatedBeritaLoading = false;
      this.contentDesc = "";
    },
    async getBeritabyId(id) {
      try {
        this.isLoading = true;
        const result = await berita.get(id);

        if (result instanceof Error) {
          this.beritaNotExist();
          throw result;
        }

        this.isLoading = false;

        if (result.data.url_gambar) {
          this.urlTemp = BASE_URL + `/` + result.data.url_gambar;
          this.urlGambar = await this.getImageObj(this.urlTemp);
        }

        this.isExist = true;
        this.id = result.data.id_berita;
        this.judul = result.data.judul;
        this.artikel = result.data.artikel;
        this.contentDesc = this.clearTags(this.artikel);
        this.waktu_publikasi = result.data.waktu_publikasi;
        this.url_gambar = result.data.url_gambar;
        this.kategori_berita = result.data.kategori_berita;
        this.jumlah_reader = result.data.jumlah_reader;
        this.jumlah_likes = result.data.jumlah_likes;
        this.jurnalis = result.data.jurnalis;
        this.deskripsi_jurnalis = result.data.deskripsi_jurnalis;
        
        this.replaceSpan()
      
      
        console.log(this.artikel)
      } catch (error) {
        console.error(error);
      }
    },

    async getImageObj(ImageUrl) {
      try {
        const path = require("path");
        const result = await fetch(ImageUrl);

        if (result instanceof Error) throw result;
        const blobObj = await result.blob();

        if (blobObj instanceof Error) throw blobObj;
        return new File([blobObj], path.basename(ImageUrl), {
          type: blobObj.type,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async incrementViewer(id) {
      try {
        const result = await berita.incrementViewer(id);

        if (result instanceof Error) {
          this.errorMessage = "Gagal menambahkan viewer karena " + result.cause;
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async retrieveRelatedBerita(id) {
      try {
        this.relatedBeritaLoading = true;
        const result = await berita.get(id);
        this.kategori_berita = result.data.kategori_berita;
        const recommendResult = await berita.getByCat(
          4,
          this.kategori_berita,
          1
        );
        this.relatedBeritaLoading = false;

        if (recommendResult instanceof Error) {
          this.errorMessage =
            "Gagal mendapatkan berita dengan topik sama karena " +
            recommendResult.cause;
          return;
        }

        recommendResult.data.forEach((element) => {
          element.url_gambar = BASE_URL + "/" + element.url_gambar;
          this.relatedBerita.push(element);
        });
      } catch (error) {
        console.error(error);
      }
    },

    async likeBerita() {
      try {
        if (this.isLoggedIn) {
          this.likeClick += 1;

          if(this.likeClick%2 === 1) {
            this.jumlah_likes += 1;
          } else {
            this.jumlah_likes -= 1;
          }

          this.isLiked = !this.isLiked;

          const kategoriBerita = await kategori.getByName(this.kategori_berita);
          const likeResult = await pembacaAct.like(
            this.$route.params.id,
            kategoriBerita.data.id_kategori,
            store.getters["user/getToken"]
          );

          if (likeResult instanceof Error) {
            this.errorMessage =
              "Gagal menyukai berita karena " + likeResult.cause;
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getLikeState(id) {
      try {
        const token = store.getters["user/getToken"];

        if (token.localeCompare("") != 0) {
          const result = await pembacaAct.isLiked(
            store.getters["user/getToken"],
            id
          );

          if (result instanceof Error) {
            this.errorMessage = "Gagal menyukai berita karena " + result.cause;
            return;
          }

          this.isLiked = result.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async saveBerita() {
      try {
        if (this.isLoggedIn) {
          this.isSaved = !this.isSaved;

          const saveResult = await pembacaAct.saveBerita(
            this.$route.params.id,
            store.getters["user/getToken"]
          );

          if (saveResult instanceof Error) {
            this.errorMessage =
              "Gagal menyimpan berita karena " + saveResult.cause;
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getSaveState(id) {
      try {
        const token = store.getters["user/getToken"];

        if (token.localeCompare("") != 0) {
          const result = await pembacaAct.isSaved(token, id);

          if (result instanceof Error) {
            this.errorMessage = "Gagal menyukai berita karena " + result.cause;
            return;
          }

          this.isSaved = result.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    onBeritaSelected(id, judul) {
      const judul_berita = judul.toLowerCase().split(' ').join('-');
      if(this.isMobile) {
        this.$router
          .push({
            path: `/berita/${id}/${judul_berita}`
          })
          .catch((err) => {
          err;
        });
      } else {
        window.open(`/berita/${id}/${judul_berita}`, "_blank");
      }
    },

    beritaNotExist() {
      this.$router
        .push({
          path: `/`,
        })
        .catch((err) => {
          console.error(err);
        });
    },

    clearTags(str) {
      let html = str;
      let div = document.createElement("div");
      div.innerHTML = html;
      let text = div.textContent || div.innerText || "";
      return text;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");

.playfair-font {
  font-family: "Playfair Display", serif;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.max-width-read {
  max-width: 1080px;
}

.act-item {
  cursor: pointer;
}

.img-btn {
  height: 16px;
  max-height: 16px;
}

.img-btn:hover {
  background: rgba(80, 80, 80, 0.164);
}

.red-text {
  color: #e52b38;
}

#header {
  text-align: center;
}

#header img {
    width: 100%;
    height: auto;
}

.progressbar {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: translate(-50%, -50%);
}

.max-width-50 {
  max-width: 50px;
}

.break-words {
  word-wrap: break-word;
  width: 100%;
  height: auto;
}

.small-progressbar {
  left: 50%;
  top: 20%;
}

.responsive-img ::v-deep img {
  width: 100%;
  height: auto;
}

.article ::v-deep br {
  content: " ";
  display: block;
  margin: 120px 10;
  line-height: 10px;
}
.dark ::v-deep p {
  content: " ";
  color : white;
}

.dark ::v-deep li {
  content: " ";
  color : white;
}

@media screen and (max-width: 600px) {
    #header img {
      width: 100%;
      height: auto;
    }

    .max-width-read {
      max-width: 300px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    .max-width-read {
      max-width: 600px;
    }
}

@media screen and (min-width: 1025px) and (max-width: 1440px) {
    .max-width-read {
      max-width: 900px;
    }
}

@media screen and (width: 768px){
    .max-width-rec {
      max-width: 680px;
    }
}
</style>
