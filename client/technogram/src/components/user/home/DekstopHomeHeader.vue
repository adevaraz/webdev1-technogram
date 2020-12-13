<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" style="height: 25vh" class="pa-0">
        <lazy-image></lazy-image>
      </v-col>
      <v-col cols="12">
        <h3 class="text-capitalize">Most popular news</h3>
      </v-col>
      <v-col
        cols="4"
        v-for="(berita, index) in popularBeritas"
        :key="berita.id_berita"
      >
        <v-row>
          <v-col cols="2">
            <h3 class="text-center number-text">0{{ index + 1 }}</h3>
          </v-col>
          <v-col cols="10" class="pt-4">
            <descriptive-berita :berita="berita"></descriptive-berita>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="px-16"
        v-for="(category, index) in categories"
        :key="category.id_kategori"
      >
        <v-row>
          <v-col cols="12" class="pa-0">
            <div class="outer-top-line"></div>
          </v-col>
          <berita-category-section
            :isHeadlineLeft="index % 2 == 0"
            :category="category.nama_kategori"
          ></berita-category-section>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BeritaCategorySection from "./BeritaCategorySection.vue";
import categoryApi from "../../../api/kategori/daftarKategori";
import DescriptiveBerita from "../berita/DescriptiveBerita.vue";
import LazyImage from "../ui/LazyImage.vue";
export default {
  components: { BeritaCategorySection, DescriptiveBerita, LazyImage },
  async created() {
    await this.retrieveBeritaByCategories();
  },
  data() {
    return {
      // Hold  4 categories that available example ['software' , 'general' ...]
      categories: [],
    };
  },
  props: {
    popularBeritas: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
.outer-top-line {
  width: 100%;
  height: 1px;
  background: rgb(204, 204, 204);
}

.number-text {
  color: rgb(229, 43, 56, 0.9);
}


</style>