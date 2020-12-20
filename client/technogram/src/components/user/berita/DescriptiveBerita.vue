<template>
  <div
    @mouseover="onHover"
    @mouseleave="onLeave"
    @click="onBeritaSelected(berita.id_berita)"
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
          ></lazy-image>
        </div>
      </v-col>
      <v-col cols="11" class="pa-0 pl-1" align-self="center">
        <h6 class="category-text text-capitalize" :class="onHoverClass">
          {{ berita.kategori_berita || "" }}
        </h6>
      </v-col>
      <v-col cols="12" class="pa-0 mt-1">
        <h5 class="text-capitalize title-text" :class="onHoverClass">
          {{ berita.judul || "" }}
        </h5>
      </v-col>
      <v-col cols="12" class="pa-0 mt-3">
        <h6 class="date-text" :class="onHoverClass">
          {{ date }} | by {{ berita.jurnalis }}
        </h6>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const LazyImage = () => import("../ui/LazyImage.vue");
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
  },
  computed: {
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
    onBeritaSelected(id) {
      this.$router
        .push({
          path: `/berita/${id}`,
        })
        .catch((err) => {
          console.error(err);
        });

      this.incrementViewer(id);
      this.refreshValue();
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