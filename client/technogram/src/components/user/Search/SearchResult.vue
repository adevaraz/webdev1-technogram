<template>
    <v-container>
        <div class="d-flex justify-center mx-auto link" align-center>
            <a class="mx-4">Recent</a>
            <a class="mx-4">Most likes</a>
        </div>
        <div class="search-result">
            <v-row class="left-container mt-n5" v-for="berita in recentBerita"
                :key="berita.id_berita">
                <v-col class="pa-2" cols="4">
                    <v-row>
                        <v-col cols="5" class="mx-auto">
                            <div class="img-container" :style="backgroundImg"></div>
                        </v-col>
                        <v-col cols="12" class="pa-0 ma-0 mr-2">
                            <v-row class="justify-center right-col ml-16" align="center">
                                <v-col cols="3" class="pa-0 ma-0">
                                    <div class="like-container">
                                        <v-col cols="1" class="pa-0 ma-0 ml-9">
                                            <img src="../../../assets/icons/heart-filled.png" />
                                        </v-col>
                                        <v-col cols="2" class="pa-0 ma-0 ml-1">
                                            <h4 class="work-sans news-likes text-start">
                                                {{berita[0].jumlah_likes}}
                                            </h4>
                                        </v-col>
                                    </div>
                                </v-col>
                                <v-col  cols="6" class="pa-0 ma-0 ml-4">
                                    <h4 class="work-sans news-date text-end">
                                        {{date || ''}}
                                    </h4>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="pa-0 mt-5" cols="8">
                    <v-row class="justify-center">
                        <v-col cols="11" class="pa-0 ma-0">
                            <h2 class="playfair-font news-title">
                            {{berita.judul || ''}}
                            </h2>
                        </v-col>
                        <v-col cols="11" class="pa-0 ma-0 mt-4">
                            <h4 class="work-sans news-preview" >
                            {{preview}}...
                            </h4>
                        </v-col>
                        <v-col cols="11" class="pa-0 ma-0 mt-4">
                            <v-row class="justify-right ml-1">
                                <v-col cols="5" class="pa-0 ma-0">
                                    <h4 class="work-sans news-writer text-start">
                                        by {{berita.jurnalis || ''}}
                                    </h4>
                                </v-col>
                                <v-col cols="6" class="pa-0 ma-0 mr-2">
                                    <h4 class="work-sans news-category">
                                        | {{berita.kategori_berita || ''}}
                                    </h4>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
const PRIVIEW_MAX_WORDS = 70
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
export default {
    created() {
        this.retrieveRecentBerita();
        this.retrieveMostLikedBerita();
    },
    
    data() {
        return {
            recentBerita: [],
            mostLikedBerita: [],
            isError: false,
            errorMessage: "",
            recentLoading: false,
            mostLikedLoading: false,
        };
    },

    computed: {
        backgroundImg() {
            return `background-image: url('${this.recentBerita.url_gambar}')`;
        },
        date() {
            //Format : 'Friday, 09/10/2020 15:49'
            const fullDate = new Date(this.recentBerita.waktu_publikasi);
            const month = fullDate.toString().split(' ')[1];
            const date = fullDate.getDate();
            console.log(this.recentBerita.waktu_publikasi)
            return `${month} ${date}`;
        },
        preview() {
            console.log('woy ini nih');
            const firstSentences = this.recentBerita.artikel.toString().split('>')[2];
            let preview = firstSentences;
            if(firstSentences.length > PRIVIEW_MAX_WORDS){
                preview = firstSentences.slice(0 , PRIVIEW_MAX_WORDS);
            }
            return preview.split('<')[0];
        }
    }, 

    methods: {
        async retrieveRecentBerita() {
            this.recentLoading = true;
            const result = await beritaApi.recentBerita();
            this.recentLoading = false;
            if (result instanceof Error) {
                this.isError = true;
                this.errorMessage =
                "Gagal mendapatkan berita terkini karena " + result.cause;
                return;
            }
            result.data.forEach((element) => {
                element.url_gambar = BASE_URL + "/" + element.url_gambar;
                this.recentBerita.push(element);
            });
            console.log('RECENT BERITA');
            console.log(this.recentBerita[0]);
        },
        async retrieveMostLikedBerita() {
            this.popularLoading = true;
            const result = await beritaApi.popularBerita();
            this.popularLoading = false;
            if (result instanceof Error) {
                this.isError = true;
                this.errorMessage =
                "Gagal mendapatkan berita karena " + result.cause;
                return;
            }
            result.data.forEach((element) => {
                element.url_gambar = BASE_URL + "/" + element.url_gambar;
                this.mostLikedBerita.push(element);
            });
            console.log('MOST LIKED BERITA');
        console.log(this.mostLikedBerita);
        },
    },
};
</script>

<style scoped>
.link {
    margin: 20px;
    border: 3px solid #73AD21;
    text-align: center;
}

@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
.playfair-font {
  font-family: "Playfair Display", serif;
}
.worksans-font {
  font-family: "Work Sans", sans-serif;
}
.img-container {
  width: 200px;
  background: #EEEEEE;
  background-size: cover;
  background-position: center;
  padding-top: 100%;
  margin-left: 20px;
}

.news-title {
  font-size: 1rem;
  font-weight: 600;
}
.news-preview {
  font-weight: 400;
  font-size: 0.8rem;
  color: #898788;
}
.news-writer {
  font-weight: 400;
  font-size: 0.55rem;
}
.news-time {
  font-weight: 400;
  font-size: 0.7rem;
}
.news-category {
  font-weight: 400;
  font-size: 0.55rem;
  color: #e52b38;
}
.right-col img {
  width: 10px;
  height: 10px;
}
.like-container{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.news-likes{
   font-weight: 400;
  font-size: 0.6rem;
  color: #e52b38;   
}
.news-date{
   font-weight: 400;
  font-size: 0.6rem;
  color: #898788;   
}
.left-container{
    border-bottom: 0.5px solid #bab4b8b9;
}

.search-result {
    margin-left: 160px;
}
</style>