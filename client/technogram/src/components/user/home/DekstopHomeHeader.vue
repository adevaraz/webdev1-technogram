<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="px-8 pt-10" v-for="category in categories" :key="category.id_kategori">
        <div class="outer-top-line"></div>
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
</style>