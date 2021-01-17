<template>
    <v-container pa-10 pt-0>
        <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
            <v-col :cols="isMobile? '12' : '12'">
                <v-row>
                    <h1>
                        Kategori Berita
                    </h1>
                </v-row>
                <v-row>
                    <v-progress-circular
                        class="progressbar"
                        v-if="isLoading"
                        color="#E52B38"
                        height="10"
                        indeterminate
                    ></v-progress-circular>
                    <v-col class="text-center" v-for="category in kategori" :key="category.id_kategori" lg="4" md="6" sm="12" xs="12" >
                        <v-card v-on:click="onCategorySelected(category)">
                            <v-img
                                :src="category.url_gambar_kategori"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="300px"
                            >
                            <v-card-title v-text="category.nama_kategori"></v-card-title>
                            </v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import categoryApi from "../../../api/kategori/daftarKategori"
import { BASE_URL } from "../../../api/const";

export default {
    data() {
        return {
            kategori: [],
            isError: false,
            errorMessage: "",
            isLoading: false,
        };
    },
    methods: {
        retrieveCategory(){
            this.isLoading = true;
            categoryApi.retrieveAll()
                .then(response => {
                    response.data.forEach((element) => {
                        element.url_gambar_kategori = BASE_URL + "/" + element.url_gambar_kategori;
                        this.kategori.push(element);
                    });
                    this.isLoading = false;
                })
                .catch(e => {
                    console.log(e);
                    this.isLoading = false;
                });
        },
        onCategorySelected(cat) {
            this.$router
                .push({
                    name: "search-result",
                    query: {
                        q: cat.nama_kategori,
                    }
                })
                .catch((err) => {
                    err;
                });
        },
    },
    mounted(){
        this.retrieveCategory();
    },
    computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    },
  },
}
</script>

<style scoped>
.progressbar {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>