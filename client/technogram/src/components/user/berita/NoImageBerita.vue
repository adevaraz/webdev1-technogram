<template>
  <v-container fluid @mouseover="onHover" @mouseleave="onLeave">
    <v-row>
      <v-col class="pa-0" cols="4">
        <lazy-image
          :src="berita.url_gambar"
          :zoomEffect="true"
          :isLoading="true"
          :shouldZoom="isOnHover"
        ></lazy-image>
      </v-col>
      <v-col class="py-0" cols="7" offset="1">
        <v-row class="fill-height">
          <v-col cols="12" class="pa-0 ma-0">
            <v-col cols="12" class="pa-0 ma-0">
              <h2 class="playfair-font news-category text-capitalize">
                {{ berita.kategori_berita || "" }}
              </h2>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
              <h2 class="playfair-font news-title" :class="onHoverClass">
                {{ berita.judul || "" }}
              </h2>
            </v-col>
          </v-col>
          <v-col cols="12" class="pa-0 ma-0 mb-1 mt-8">
            <v-col cols="12" class="pa-0 ma-0">
              <h3 class="worksans-font news-writer" :class="onHoverClass">
                oleh {{ berita.jurnalis || "" }}
              </h3>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
              <h3 class="worksans-font news-time" :class="onHoverClass">{{ date }}</h3>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const LazyImage = () => import("../ui/LazyImage.vue");
export default {
  components: { LazyImage },
  props: {
    berita: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    onHover() {
      this.isOnHover = true;
    },
    onLeave() {
      this.isOnHover = false;
    },
  },
  data(){
    return{
      isOnHover : false
    }
  },
  computed: {
    backgroundImg() {
      return `background-image: url('${this.berita.url_gambar}')`;
    },
    date() {
      //Format : 'Friday, 09/10/2020 15:49'
      const fullDate = new Date(this.berita.waktu_publikasi);
      const month = fullDate.toString().split(" ")[1];
      const date = fullDate.getDate();
      return `${month} ${date}`;
    },
    onHoverClass() {
      if (this.isOnHover) {
        return "hover";
      }
      return "";
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");

/* .playfair-font {
  font-family: "Playfair Display", serif;
} */

.worksans-font {
  font-family: "Work Sans", sans-serif;
}
.img-container {
  width: 100%;
  cursor: pointer;
  background: #eeeeee;
  background-size: cover;
  background-position: center;
}

.news-category {
  color: #e52b38;
  font-weight: 600;
  font-size: 1.1rem;
}

.news-title {
  color: black;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
}

.news-writer {
  font-weight: 400;
  font-size: 0.9rem;
}

.news-time {
  font-weight: 400;
  font-size: 0.9rem;
}

.hover {
  color: rgb(229, 43, 56, 0.9);
}
</style>