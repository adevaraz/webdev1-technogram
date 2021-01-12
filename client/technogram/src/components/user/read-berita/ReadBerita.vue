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
        <v-container v-else-if="isExist" :class="isMobile? 'd-flex flex-wrap mb-6' : 'd-flex flex-col mb-6'">
            <v-sheet
                :class="isMobile? 'mx-3' : 'mx-10 px-12'"
            >
                <h1 class="text-capitalize playfair-font">{{ judul }}</h1>
                <p class="worksans-font">{{ date }}</p>

                <!-- Information section -->
                <v-card
                    :class="isMobile? 'd-flex flex-wrap mb-3 max-width-50' : 'd-flex flex-row mb-3'"
                    flat
                    tile
                >
                    <h4 class="mr-auto">by {{ jurnalis }}</h4>

                    <div :class="isMobile? 'd-flex flex-row my-3' : 'd-flex flex-row'">
                        <div id="like">
                            <div
                                class="d-flex flex-row"
                                v-if="isLoggedIn"
                            >
                                <img v-if="!isLiked" v-on:click="likeBerita()" class="act-item img-btn mr-1" src="../../../assets/icons/heart-empty.png" alt="empty heart icon" />
                                <img v-else v-on:click="likeBerita()" class="act-item img-btn mr-1" src="../../../assets/icons/heart-filled.png" alt="filled heart icon" />
                                <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_likes }} likes</p>
                            </div>
                            <div
                                class="d-flex flex-row"
                                v-else
                            >
                                <auth-user v-if="isLoginDialogShown" :onDialogClosed="()=>{ isLoginDialogShown = false }"></auth-user>
                                <img
                                    class="act-item img-btn mr-1"
                                    src="../../../assets/icons/heart-empty.png"
                                    @click="isLoginDialogShown = !isLoginDialogShown"
                                />
                                <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_likes }} likes</p>
                            </div>
                        </div>

                        <div id="view" class="d-flex flex-row">
                            <img class="act-item mr-1" style="height: 13px;" src="../../../assets/icons/view.png" alt="eye icon" />
                            <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_reader }} viewers</p>
                        </div>
                        
                        <div id="save">
                            <div
                                class="d-flex flex-row"
                                v-if="isLoggedIn"
                            >
                                <img v-if="!isSaved" v-on:click="saveBerita()" class="act-item img-btn" src="../../../assets/icons/unsaved-icon.png" alt="unbookmarked icon" />
                                <img v-else v-on:click="saveBerita()" class="act-item img-btn" src="../../../assets/icons/saved-icon.png" alt="bookmarked icon" />
                            </div>
                            <div
                                class="d-flex flex-row"
                                v-else
                            >
                                <auth-user v-if="isLoginDialogShown" :onDialogClosed="()=>{ isLoginDialogShown = false }"></auth-user>
                                <img
                                    class="act-item img-btn"
                                    src="../../../assets/icons/unsaved-icon.png"
                                    @click="isLoginDialogShown = !isLoginDialogShown"
                                
                                />
                            </div>
                        </div>

                        <div id="share">
                            <div
                                class="d-flex flex-row ml-3"
                            >
                                <share v-if="share" :onDialogClosed=" () => { share = false }" :judul_berita="judul"></share>
                                <img class="act-item img-btn" @click="share = !share" src="../../../assets/icons/share.png" alt="share icon" />
                            </div>
                        </div>
                    </div>
                </v-card>

                <div id="content" class="worksans-font">
                    <div id="header">
                        <v-img
                            v-if="this.urlTemp != null"
                            :src="urlTemp"
                            :aspect-ratio="16 / 9"
                            contain
                            class="grey darken-4"
                        />
                    </div>

                    <div :class="isMobile? 'article responsive-img break-words' : 'article responsive-img'" v-html=artikel></div>

                    <p class="grey--text text--darken-2">Written by</p>
                    <h4>{{ jurnalis }}</h4>
                    <p>{{ deskripsi_jurnalis }}</p>
                </div>
            </v-sheet>

            <div class="px-2 mx-2 my-16">
                <h3 class="worksans-font red-text">Recommendations</h3>
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
                    @click="onBeritaSelected(berita.id_berita)"
                >
                    <small-berita v-if="berita.id_berita != id" class="act-item" :berita="berita"></small-berita>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import { BASE_URL } from "../../../api/const";
import { store } from "../../../store/index";
import { mapGetters } from 'vuex';

import berita from "../../../api/berita/berita"
import pembacaAct from "../../../api/pembaca/actions"
import kategori from "../../../api/kategori/daftarKategori";

const SmallBerita = () => import("../berita/SmallBerita.vue");
const AuthUser = () => import("../auth/AuthUser");
const Share = () => import("./Share");

export default {
    name: "read-berita",

    components: {
        SmallBerita,
        AuthUser,
        Share
    },

    created() {
        this.incrementViewer(this.$route.params.id);
        this.getBeritabyId(this.$route.params.id);
        this.getLikeState(this.$route.params.id);
        this.getSaveState(this.$route.params.id);
        this.retrieveRelatedBerita(this.$route.params.id);
    },

    data: () => ({
        id: 0,
        judul: '',
        artikel: '',
        waktu_publikasi: '',
        url_gambar: '',
        kategori_berita: '',
        jumlah_reader: 0,
        jumlah_likes: 0,
        jurnalis: '',
        deskripsi_jurnalis: '',
        relatedBerita: [],
        urlTemp: null,
        urlGambar: null,
        isLoading: false,
        isExist: false,
        isLiked: false,
        isSaved: false,
        relatedBeritaLoading: false,
        errorMessage: '',
        isLoginDialogShown : false,
        share: false
    }),
  
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
        
        ...mapGetters(
            {
                isLoggedIn : 'user/isLoggedIn'
            }
        )
    },


    methods: {
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
            this.isSaved = false;
            this.relatedBeritaLoading = false;
        },
    
    async refreshValue() {
        this.getLikeState(this.$route.params.id);
        this.getSaveState(this.$route.params.id);
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
            this.waktu_publikasi = result.data.waktu_publikasi;
            this.url_gambar = result.data.url_gambar;
            this.kategori_berita = result.data.kategori_berita;
            this.jumlah_reader = result.data.jumlah_reader;
            this.jumlah_likes = result.data.jumlah_likes;
            this.jurnalis = result.data.jurnalis;
            this.deskripsi_jurnalis = result.data.deskripsi_jurnalis;

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

            if(result instanceof Error) {
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
            const recommendResult = await berita.getByCat(4, this.kategori_berita, 1);
            this.relatedBeritaLoading = false;

            if(recommendResult instanceof Error) {
                this.errorMessage = "Gagal mendapatkan berita dengan topik sama karena " + recommendResult.cause;
                return;
            }

            recommendResult.data.forEach(element => {
                element.url_gambar = BASE_URL + "/" + element.url_gambar;
                this.relatedBerita.push(element);
            });
        } catch (error) {
            console.error(error);
        }
   },

    async likeBerita() {
        try {
            if(this.isLoggedIn) {
                this.old_likes = this.jumlah_likes;
                const kategoriBerita = await kategori.getByName(this.kategori_berita);
                const likeResult = await pembacaAct.like(this.$route.params.id, kategoriBerita.data.id_kategori, store.getters['user/getToken']);

                if(likeResult instanceof Error) {
                    this.errorMessage = "Gagal menyukai berita karena " + likeResult.cause;
                    return;
                }

                this.refreshValue();
            }
        } catch (error) {
            console.error(error);
        }
    },

    async getLikeState(id) {
        try {
            const token = store.getters['user/getToken'];

            if(token.localeCompare("") != 0) {
                const result = await pembacaAct.isLiked(store.getters['user/getToken'], id);

                if(result instanceof Error) {
                    this.errorMessage = "Gagal menyukai berita karena " + result.cause;
                    return;
                }
                
                const valResult = await berita.get(id);

                if (valResult instanceof Error) {
                    this.beritaNotExist();
                    return;
                }

                this.isLiked = result.data;
                this.jumlah_likes = valResult.data.jumlah_likes;
            }
        } catch (error) {
            console.error(error);
        }
    },

    async saveBerita() {
        try {
            if(this.isLoggedIn) {
                const saveResult = await pembacaAct.saveBerita(this.$route.params.id, store.getters['user/getToken']);

                if(saveResult instanceof Error) {
                    this.errorMessage = "Gagal menyimpan berita karena " + saveResult.cause;
                    return;
                }

                this.refreshValue();
            }
        } catch (error) {
            console.error(error);
        }
    },

    async getSaveState(id) {
        try {
            const token = store.getters['user/getToken'];

            if(token.localeCompare("") != 0) {
                const result = await pembacaAct.isSaved(token, id);
            
                if(result instanceof Error) {
                    this.errorMessage = "Gagal menyukai berita karena " + result.cause;
                    return;
                }

                this.isSaved = result.data;
            }
        } catch (error) {
            console.error(error);
        }
    },

    onBeritaSelected(id) {
        this.$router
            .push({
                path: `/berita/${id}`
            })
            .catch((err) => {
                console.error(err);
            });

        this.incrementViewer(id);
        this.refreshValue();
    },

    beritaNotExist() {
        this.$router
            .push({
                path: `/`
            })
            .catch((err) => {
                console.error(err);
            });
    }
  }
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
    max-width: 300px;
}

.small-progressbar {
    left: 50%;
    top: 20%;
}

.responsive-img ::v-deep img {
    width: 100%;
}

.article ::v-deep br {
    content: " ";
    display: block;
    margin: 10px 10;
    line-height: 20px;
}
</style>
