<template>
  <div @click="onBeritaSelected(source.id_berita)" class="pa-1">
    <preview-berita v-if="!isMobile" :berita="source"></preview-berita>
    <mobile-preview-berita v-else :berita="source" :previewMaxWord="maxWord"></mobile-preview-berita>
  </div>
</template>

<script>
import PreviewBerita from "../berita/PreviewBerita.vue";
import MobilePreviewBerita from "../berita/MobilePreviewBerita.vue";
export default {
  components: { PreviewBerita, MobilePreviewBerita },
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
