<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Most popular news</h3>
      </v-col>
      <v-col cols="4" v-for="(berita , index) in popularBeritas" :key="berita.id_berita">
         <v-row>
           <v-col cols="2">
                <h3 class="text-center number-text">0{{index + 1}}</h3>
           </v-col>
           <v-col cols="10">
                <h5>{{ berita.judul || "" }}</h5>
                <h6 class="mt-5">Dec 13</h6>
           </v-col>
         </v-row>
      </v-col>
      <v-col cols="12">
         <div class="outer-top-line"></div>
      </v-col>
      <v-col cols="12" class="px-8 pt-10" v-for="category in categories" :key="category.id_kategori">
        <berita-category-section :category="category.nama_kategori" class="mt-5"></berita-category-section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BeritaCategorySection from "./BeritaCategorySection.vue";
import categoryApi from "../../../api/kategori/daftarKategori";
export default {
  components: { BeritaCategorySection },
  async created() {
    await this.retrieveBeritaByCategories();
  },
  data() {
    return {
      // Hold  4 categories that available example ['software' , 'general' ...]
      categories: [],
    };
  },
  props :{
    popularBeritas : {
      type : Array ,
      default : () => {
        return [];
      }
    }
  },
  methods: {
    async retrieveBeritaByCategories() {
      try {
        const result = await categoryApi.retrieveAll();
        const categories = result.data;
        console.log(categories);
        for (let i = 0; i < 3; i++) {
          const pickedCategoriesIndex = Math.floor(
            Math.random() * categories.length
          );
          const pickedCategories = categories.splice(pickedCategoriesIndex, 1);
          this.categories.push(pickedCategories[0]);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.outer-top-line{
  width: 100%;
  height: 1px;
  background : black;
}


.number-text{
  color :  rgb(229, 43, 56 , 0.9);
}
</style>