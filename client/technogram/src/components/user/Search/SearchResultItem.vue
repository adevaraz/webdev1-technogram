<template>
  <div @click="onBeritaSelected(source.id_berita, source.judul)">
    <left-image-preview-berita v-if="!isMobile" :berita="source"></left-image-preview-berita>
    <right-image-preview-berita class="pa-5 pt-7" v-else :berita="source"></right-image-preview-berita>
  </div>
</template>

<script>
const LeftImagePreviewBerita = () => import("../berita/LeftImageBeritaPreview.vue");
const RightImagePreviewBerita = () => import("../berita/RightImageBeritaPreview.vue");
export default {
  components: { LeftImagePreviewBerita, RightImagePreviewBerita },
  name: "item-component",
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    },
  },

  methods: {
    onBeritaSelected(id, judul) {
      const judul_berita = judul.toLowerCase().split(' ').join('-');
      if(this.isMobile) {
        this.$router
          .push({
            path: `/berita/${id}/${judul_berita}`
          })
          .catch((err) => {
          err;
        });
      } else {
        window.open(`/berita/${id}/${judul_berita}`, "_blank");
      }
    },
  }
};
</script>
