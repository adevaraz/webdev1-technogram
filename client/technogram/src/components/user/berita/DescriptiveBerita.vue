<template>
  <div
    @mouseover="onHover"
    @mouseleave="onLeave"
    @click="onBeritaSelected(berita.id_berita, berita.judul)"
    class="clickable-text"
  >
    <v-row>
      <v-col cols="1" class="pa-0">
        <div class="img-container">
          <lazy-image
            :shouldZoom="isOnHover"
            class="img-content"
            :src="berita.url_gambar"
            :zoomEffect="true"
            :title="berita.judul"
          ></lazy-image>
        </div>
      </v-col>
      <v-col cols="11" class="pa-0 pl-1" align-self="center">
        <h6 class="category-text text-capitalize" :class="onHoverClass">
          {{ berita.kategori_berita || "" }}
        </h6>
      </v-col>
      <v-col cols="12" class="pa-0 mt-1" :style="{color : currentTheme.onBackground}">
        <h5
          class="text-capitalize title-text" 
          :class="onHoverClass"
        >
          {{ berita.judul || "" }}
        </h5>
      </v-col>
      <v-col cols="12" class="pa-0 mt-3">
        <h6 class="date-text" :class="onHoverClass">
          {{ date }} | oleh {{ berita.jurnalis }}
        </h6>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const LazyImage = () => import("../ui/LazyImage.vue");
import {mapGetters} from "vuex"
export default {
  components: {
    LazyImage,
  },
  props: {
    berita: {
      type: Object,
      default: () => {
        return {
          waktu_publikasi: 0,
        };
      },
    },
    onBeritaSelected : {
            type : Function,
        },
  },
  computed: {
    ...mapGetters({
      currentTheme : "theme/getCurrentColor"
    }),
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
    },
  },
  data() {
    return {
      isOnHover: false,
    };
  },
  methods: {
    onHover() {
      this.isOnHover = true;
    },
    onLeave() {
      this.isOnHover = false;
    },
  },
};
</script>

<style scoped>
.date-text {
  color: #808080;
  font-weight: 400;
  font-size: 0.6rem;
}

.category-text {
  color: #808080;
  font-weight: 500;
  font-size: 0.65rem;
}

.title-text {
  font-weight: 700;
  font-size: 0.8rem;
}

.img-container {
  width: 80%;
  position: relative;
}

.img-container:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.img-content {
  position: absolute;
  border-radius: 5px;
}

.clickable-text {
  cursor: pointer;
}

.hover {
  color: rgb(229, 43, 56, 0.9);
}
</style>