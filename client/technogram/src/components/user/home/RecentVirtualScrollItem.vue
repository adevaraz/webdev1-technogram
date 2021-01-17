<template>
  <div class="pa-1" @click="onBeritaSelected(source.id_berita, source.judul)">
    <no-image-berita v-if="!isMobile" :berita="source"></no-image-berita>
    <right-image-preview-berita v-else :berita="source" :previewMaxWord="maxWord"></right-image-preview-berita>
  </div>
</template>

<script>
const NoImageBerita = () => import("../berita/NoImageBerita.vue");
const RightImagePreviewBerita = () => import("../berita/RightImageBeritaPreview.vue");
export default {
  components: { NoImageBerita, RightImagePreviewBerita },
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
    }
  },
  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    },
    maxWord(){
      if(this.$vuetify.breakpoint.xs){
        return 70;
      }
      return 140;
    }
  },

  methods: {
    onBeritaSelected(id, judul) {
      const judul_berita = judul.toLowerCase().split(' ').join('-')
      this.$router
        .push({
          path: `berita/${id}/${judul_berita}`
        })
        .catch((err) => {
          err;
        });
    }
  }
};
</script>
