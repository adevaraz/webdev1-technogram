<template>
    <v-container>
        <div class="search-result">
            <v-row 
                class="mt-5 mr-16" 
                v-for="index in 4"
                :key="index">
                <search-result-recent :berita="mostLikedBerita[((page * 5) - 5) + (index - 1)]"></search-result-recent>
            </v-row>
            <v-row class="d-flex justify-center mt-16" align-center>
                <v-pagination 
                    v-model="page"
                    :length="count" 
                    :per-page="pageSize"
                    @input="handlePageChange" 
                ></v-pagination>
            </v-row>
        </div>
    </v-container>
</template>

<script>
//const PRIVIEW_MAX_WORDS = 70
import beritaApi from "../../../api/berita/berita";
import { BASE_URL } from "../../../api/const";
import SearchResultRecent from './SearchResultPreview';
export default {
    components: { SearchResultRecent },
    created() {
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
            page: 1,
            count: 0,
            pageSize: 5,
        };
    },

    methods: {
        async retrieveMostLikedBerita() {
            this.popularLoading = true;
            //benerin perpage sama page nya, parameternya teh (perpage, key, page)
            const result = await beritaApi.popularBerita(this.pageSize,this.$route.query.q, this.page);
            //const result = await beritaApi.popularBerita();
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
                this.count = this.count + 1;
            });
            this.count = (this.count/this.pageSize) + 1;
            console.log('MOST LIKED BERITA');
        console.log(this.mostLikedBerita);
        },

        flush() {
            this.recentBerita.splice(0)
        },

        handlePageChange(page) {
            console.log("handlepagechange")
            this.page = page;
            this.flush();
            this.retrieveRecentBerita();

        }
    }
};
</script>