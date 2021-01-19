<template>
  <v-container pa-10 pt-0>
    <v-row>
      <v-col>
        <v-row>
            <v-col>
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
                    <v-col class="justify-center" v-for="category in kategori" :key="category.id_kategori" lg="3" md="4" sm="6" xs="12" >
                        <v-container class="justify-center">
                            <v-card class="text-center" height="300px" min-width="250px" max-width="300px" v-on:click="onCategorySelected(category)">
                                <v-img
                                    :src="category.url_gambar_kategori"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="300px"
                                >
                                <v-card-title v-text="category.nama_kategori"></v-card-title>
                                </v-img>
                            </v-card>
                        </v-container>
                    </v-col>
                </v-row>
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
  metaInfo: {
    title: "Daftar Kategori",
    htmlAttrs: {
      lang: "id",
    },
  },

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
};
</script>

<style scoped>
.progressbar {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>