<template>
  <v-container
    @mouseover="onHover"
    @mouseleave="onLeave"
    @click="onBeritaSelected(berita.id_berita)"
    class="parent"
  >
    <v-row align="start" class="fill-height">
      <v-col
        cols="12"
        class="pa-0 img-container grow"
        :style="'height:' + imageHeight"
      >
        <lazy-image
          :shouldZoom="isOnHover"
          :src="berita.url_gambar"
          :isLoading="isLoading"
          :zoomEffect="true"
        ></lazy-image>

        <div class="content-inside-image">
          <slot name="content">
            <v-row class="pa-1 pl-5 pt-0 pb-3">
              <v-col cols="8" class="cols-container">
                <h2
                  class="playfair-font news-tittle clickable-text text-uppercase"
                >
                  {{ berita.judul || "" }}
                </h2>
              </v-col>
              <v-col cols="8" class="pb-0 pt-0">
                <h3 class="news-writer clickable-text">
                  oleh {{ berita.jurnalis || "" }}
                </h3>
              </v-col>
            </v-row>
          </slot>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const LazyImage = () => import("../ui/LazyImage.vue");
export default {
  components: {
    LazyImage,
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
  props: {
    isLeftOrientation: {
      type: Boolean,
      default: true,
    },
    berita: {
      type: Object,
      default() {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default() {
        return true;
      },
    },
    imageHeight: {
      type: String,
      default() {
        return "18rem";
      },
    },
  },
  computed: {
    onHoverClass() {
      if (this.isOnHover) {
        return "hover";
      }
      return "";
    },
    onImageHoverClass() {
      if (this.isOnHover) {
        return "hover-image";
      }
      return "";
    },
    titleOrientation() {
      if (this.isLeftOrientation) {
        return "text-left";
      }
      return "text-right";
    },
    date() {
      //Format : 'Friday, 09/10/2020 15:49'
      const fullDate = new Date(this.berita.waktu_publikasi);
      const day = fullDate.toString().split(" ")[0];
      const date = fullDate.toLocaleDateString();
      const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return `${day} ${date} ${time}`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
/* .playfair-font {
  font-family: "Playfair Display", serif;
} */

.parent {
  width: 100%;
  overflow: hidden;
  height: 100%;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.img-container {
  width: 100%;
  min-height: 100%;
  position: relative;
}

.progressbar {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}

.news-tittle {
  font-size: 1.1rem;
  font-weight: 900;
  color: white;
}

.news-writer {
  font-weight: 400;
  font-size: 0.8rem;
  color: white;
}

.content-inside-image {
  position: absolute;
  left: 0%;
  bottom: 0%;
  width: 100%;
  z-index: 30;
  min-height: 20%;
  background: rgba(0, 0, 0, 0.644);
}

.news-time {
  font-size: 0.8rem;
  font-weight: 400;
}

@media screen and (min-width: 800px) and (max-width: 1264px) {
  .img-container {
    height: 26rem;
  }
}

.clickable-text {
  cursor: pointer;
}

.hover {
  color: rgb(229, 43, 56, 0.9);
}
</style>
