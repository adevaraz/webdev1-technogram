<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0" style="height: 70vh;width:100%;">
        <v-carousel
          hide-delimiters
          cycle
          height="100%"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(berita) in popularBeritas" :key="berita.id_berita">
              <cutted-berita :berita="berita"></cutted-berita>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" class="mt-10">
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
        v-for="(category) in categories"
        :key="category.id_kategori"
      >
        <v-row>
          <berita-category-section
            :onBeritaSelected="onBeritaSelected"
            :category="category.nama_kategori"
          ></berita-category-section>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import categoryApi from "../../../api/kategori/daftarKategori";

const BeritaCategorySection = () => import("./BeritaCategorySection.vue");
const DescriptiveBerita = () => import("../berita/DescriptiveBerita.vue");
const CuttedBerita = () => import("../berita/CuttedBerita.vue");
export default {
  components: { BeritaCategorySection, DescriptiveBerita, CuttedBerita },
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
    onBeritaSelected : {
      type : Function
    }
  },
  methods: {
    async retrieveBeritaByCategories() {
      try {
        const result = await categoryApi.retrieveAll();
        const categories = result.data;
        for (let i = 0; i < 3; i++) {
          const pickedCategoriesIndex = Math.floor(
            Math.random() * categories.length
          );
          const pickedCategories = categories.splice(pickedCategoriesIndex, 1);
          this.categories.push(pickedCategories[0]);
        }
      } catch (_) {
        _;
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

.card-effect{
  border: 0.1px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.199);
}
</style>