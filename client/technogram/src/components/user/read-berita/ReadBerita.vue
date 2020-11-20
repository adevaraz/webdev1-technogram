<template>
    <v-container class="d-flex flex-row mb-6">
        <v-sheet class="mx-16 px-16">
            <h1 class="playfair-font">{{ berita.judul || '' }}</h1>
            <p class="worksans-font">{{ date || '' }}</p>

            <!-- Information section -->
            <v-card
                class="d-flex flex-col mb-6"
                flat
                tile
            >
                <h4 class="mr-auto">by {{ berita.jurnalis }}</h4>

                <div class="d-flex flex-row">
                    <div id="likes" class="d-flex flex-row">
                        <img class="item img-btn mr-1" src="../../../assets/icons/heart-empty.png" />
                        <p class="text-caption text-left mr-3 worksans-font">{{ berita.jumlah_likes || 0 }} likes</p>
                    </div>

                    <div id="view" class="d-flex flex-row">
                        <img class="item mr-1" style="height: 13px;" src="../../../assets/icons/view.png" />
                        <p class="text-caption text-left mr-3 worksans-font">{{ berita.jumlah_reader || 0}} viewers</p>
                    </div>
                    
                    <div id="save" class="d-flex flex-row">
                        <img class="item img-btn" src="../../../assets/icons/unsaved-icon.png" />
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

                <p>
                    {{ berita.artikel || '' }}
                </p>

                <p>Written by</p>
                <h4>{{ berita.jurnalis || '' }}</h4>
                <p>{{ berita.deskripsi_jurnalis || '' }}</p>
            </div>
        </v-sheet>

        <v-card>
            <!-- Pake component yang ada di nopalpadil -->
        </v-card>
    </v-container>
</template>

<script>
// import { BASE_URL } from "../../../api/const";
// import berita from "../../../api/berita/berita";
// import { store } from "../../../store/index";

export default {
    name: "read-berita",
    props: () => ({
        berita: {
            type: Object,
            default() {
                return {}
            }
        },
        isLoading: {
            type: Boolean,
            default() {
                return true;
            }
        }
    }),
    data: () => ({
        urlTemp: null,
        urlGambar: null
    }),

    computed: {
        date: function() {
            // Format : Day, DD/MM/YYYY HH:MM
            const fullDate = new Date(this.berita.waktu_publikasi);
            const day = fullDate.toString().split(' ')[0];
            const date = fullDate.toLocaleDateString();
            const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;

            return `${day} ${date} ${time}`;
        }
    },

    method: {
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