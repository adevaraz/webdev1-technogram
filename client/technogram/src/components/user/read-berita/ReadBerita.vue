<template>
    <v-container :class="isMobile? 'd-flex flex-wrap mb-6' : 'd-flex flex-col mb-6'">
        <v-sheet class="mx-16 px-2">
            <h1 class="text-capitalize playfair-font">{{ judul }}</h1>
            <p class="worksans-font">{{ date }}</p>

            <!-- Information section -->
            <v-card
                :class="isMobile? 'd-flex flex-wrap mb-3' : 'd-flex flex-row mb-3'"
                flat
                tile
            >
                <h4 class="mr-auto">by {{ jurnalis }}</h4>

                <div :class="isMobile? 'd-flex flex-row my-3' : 'd-flex flex-row'">
                    <div id="likes" class="d-flex flex-row">
                        <img v-if="!isLiked || !isLoggedIn" v-on:click="likeBerita()" class="item img-btn mr-1" src="../../../assets/icons/heart-empty.png" />
                        <img v-if="isLiked" v-on:click="likeBerita()" class="item img-btn mr-1" src="../../../assets/icons/heart-filled.png" />
                        <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_likes }} likes</p>
                    </div>

                    <div id="view" class="d-flex flex-row">
                        <img class="item mr-1" style="height: 13px;" src="../../../assets/icons/view.png" />
                        <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_reader }} viewers</p>
                    </div>
                    
                    <div id="save" class="d-flex flex-row">
                        <img v-if="!isSaved || !isLoggedIn" v-on:click="saveBerita()" class="item img-btn" src="../../../assets/icons/unsaved-icon.png" />
                        <img v-if="isSaved" v-on:click="saveBerita()" class="item img-btn" src="../../../assets/icons/saved-icon.png" />
                        <p> </p>
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

                <div v-html=artikel></div>

                <p class="grey--text text--darken-2">Written by</p>
                <h4>{{ jurnalis }}</h4>
                <p>{{ deskripsi_jurnalis }}</p>
            </div>
        </v-sheet>

        <div class="px-16 mx-12 my-16">
            <h3 class="worksans-font red-text">Recommendations</h3>
            <div
                v-for="berita in relatedBerita"
                :key="berita.id_berita"
                class="d-flex flex-col"
            >
                <small-berita :berita="berita"></small-berita>
            </div>
        </div>
    </v-container>
</template>

<script>
import { BASE_URL } from "../../../api/const";
import berita from "../../../api/berita/berita";
import kategori from "../../../api/kategori/daftarKategori";
import SmallBerita from "../berita/SmallBerita.vue";
// import { store } from "../../../store/index";

export default {
    created() {
        this.incrementViewer(this.$route.params.id);
        this.getBeritabyId(this.$route.params.id);
        this.getLikeState(this.$route.params.id);
        this.getSaveState(this.$route.params.id);
    },

    name: "read-berita",

    components: {
        SmallBerita
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
        isLiked: false,
        isSaved: false,
        isLoggedIn: false,
        relatedBeritaLoading: false,
    }),

    computed: {
        date() {
            // Format : DayName, DD/MM/YYYY HH:MM
            const fullDate = new Date(this.waktu_publikasi);
            const day = fullDate.toString().split(' ')[0];
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
        }
    },

    mounted() {
        this.incrementViewer(this.$route.params.id);
        this.getBeritabyId(this.$route.params.id);
        this.retrieveRelatedBerita(this.$route.params.id);
        this.getLikeState(this.$route.params.id);
        this.getSaveState(this.$route.params.id);
    },

    methods: {
        async refreshValue() {
            this.getBeritabyId(this.$route.params.id);
            this.getLikeState(this.$route.params.id);
            this.getSaveState(this.$route.params.id);
        },

        async getBeritabyId(id) {
            try {
                this.isLoading = true;
                const result = await berita.get(id);

                if (result instanceof Error) {
                    throw result;
                }

                this.isLoading = false;

                if (result.data.url_gambar) {
                    this.urlTemp = BASE_URL + `/` + result.data.url_gambar;
                    this.urlGambar = await this.getImageObj(this.urlTemp);
                }

                this.id = result.data.id;
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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
            }
        },

        async likeBerita() {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjA2NTcxMDg0LCJleHAiOjE2MDY1NzgyODR9.fzEzPT3_V4LlFA5cb5pSJXcpGSAiWXlVilm-s2gpqMc'

                this.old_likes = this.jumlah_likes;
                const kategoriBerita = await kategori.getByName(this.kategori_berita);
                const likeResult = await berita.like(this.$route.params.id, kategoriBerita.data.id_kategori, token);

                if(likeResult instanceof Error) {
                    this.errorMessage = "Gagal menyukai berita karena " + likeResult.cause;
                    return;
                }

                this.refreshValue();
            } catch (error) {
                console.log(error);
            }
        },

        async getLikeState(id) {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjA2NTcxMDg0LCJleHAiOjE2MDY1NzgyODR9.fzEzPT3_V4LlFA5cb5pSJXcpGSAiWXlVilm-s2gpqMc';

                const result = await berita.isLiked(token, id);
                this.isLiked = result.data;
            } catch (error) {
                console.log(error);
            }
        },

        async saveBerita() {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjA2NTcxMDg0LCJleHAiOjE2MDY1NzgyODR9.fzEzPT3_V4LlFA5cb5pSJXcpGSAiWXlVilm-s2gpqMc'

                const saveResult = await berita.saveBerita(this.$route.params.id, token);

                if(saveResult instanceof Error) {
                    this.errorMessage = "Gagal menyimpan berita karena " + saveResult.cause;
                    return;
                }

                this.refreshValue();
            } catch (error) {
                console.log(error);
            }
        },

        async getSaveState(id) {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjA2NTcxMDg0LCJleHAiOjE2MDY1NzgyODR9.fzEzPT3_V4LlFA5cb5pSJXcpGSAiWXlVilm-s2gpqMc';

                const result = await berita.isSaved(token, id);
                this.isSaved = result.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
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

.item {
  cursor: pointer;
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
</style>