<template>
    <v-container pa-10 pt-0>
        <v-row>
            <v-col>
                <v-row>
                    <h1>
                        Category
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
                    <v-col class="text-center" v-for="category in kategori" :key="category.id_kategori" cols="2">
                        <!-- <v-card flat outlined tile> -->
                            <v-chip v-on:click="onCategorySelected(category)" color="#101010" text-color="white" style="text-transform: capitalize;">
                                {{ category.nama_kategori }}
                            </v-chip>
                        <!-- </v-card> -->
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import categoryApi from "../../../api/kategori/daftarKategori"
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
                    this.kategori = response.data;
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
    }
}
</script>

<style scoped>
.progressbar {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>