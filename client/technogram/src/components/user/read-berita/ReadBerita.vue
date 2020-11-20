<template>
    <v-container class="d-flex flex-row mb-6">
        <v-sheet class="mx-16 px-16">
            <h1 class="text-capitalize playfair-font">{{ judul }}</h1>
            <p class="worksans-font">{{ date }}</p>

            <!-- Information section -->
            <v-card
                class="d-flex flex-col mb-6"
                flat
                tile
            >
                <h4 class="mr-auto">by {{ jurnalis }}</h4>

                <div class="d-flex flex-row">
                    <div id="likes" class="d-flex flex-row">
                        <img class="item img-btn mr-1" src="../../../assets/icons/heart-empty.png" />
                        <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_likes }} likes</p>
                    </div>

                    <div id="view" class="d-flex flex-row">
                        <img class="item mr-1" style="height: 13px;" src="../../../assets/icons/view.png" />
                        <p class="text-caption text-left mr-3 worksans-font">{{ jumlah_reader }} viewers</p>
                    </div>
                    
                    <div id="save" class="d-flex flex-row">
                        <img class="item img-btn" src="../../../assets/icons/unsaved-icon.png" />
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

        <v-card>
            <!-- Pake component yang ada di nopalpadil -->
        </v-card>
    </v-container>
</template>

<script>
import { BASE_URL } from "../../../api/const";
import berita from "../../../api/berita/berita";
// import { store } from "../../../store/index";

export default {
    name: "read-berita",

    data: () => ({
        judul: '',
        artikel: '',
        waktu_publikasi: '',
        url_gambar: '',
        jumlah_reader: 0,
        jumlah_likes: 0,
        jurnalis: '',
        deskripsi_jurnalis: '',
        urlTemp: null,
        urlGambar: null,
        isLoading: false
    }),

    computed: {
        date() {
            // Format : Day, DD/MM/YYYY HH:MM
            const fullDate = new Date(this.waktu_publikasi);
            const day = fullDate.toString().split(' ')[0];
            const date = fullDate.toLocaleDateString();
            const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;

            return `${day} ${date} ${time}`;
        }
    },

    mounted() {
        this.getBeritabyId(this.$route.params.id);
    },

    methods: {
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
                    // console.log(this.urlGambar);
                }

                this.judul = result.data.judul;
                this.artikel = result.data.artikel;
                this.waktu_publikasi = result.data.waktu_publikasi;
                this.url_gambar = result.data.url_gambar;
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
  margin-right: 1rem;
  cursor: pointer;
}

.img-btn:hover {
  background: rgba(80, 80, 80, 0.164);
}

.item {
    height: 16px;
    max-height: 16px;
}

#header {
    text-align: center;
}
</style>