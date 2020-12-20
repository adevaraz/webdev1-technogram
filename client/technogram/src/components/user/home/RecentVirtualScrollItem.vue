<template>
  <div @click="onBeritaSelected(source.id_berita)" class="pa-1">
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
    },
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
    onBeritaSelected(id) {
      this.$router
        .push({
          name: "read-berita",
          params: { id: `${id}` },
        })
        .catch((err) => {
          err;
        });
    }
  }
};
</script>
