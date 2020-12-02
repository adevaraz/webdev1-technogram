<template>
  <div @click="onBeritaSelected(source.id_berita)">
    <preview-berita v-if="!isMobile" :berita="source"></preview-berita>
    <mobile-preview-berita v-else :berita="source"></mobile-preview-berita>
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
  },

  methods: {
    onBeritaSelected(id) {
      console.log("VIRTUAL SCROLL ITEM");
      console.log(id);
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
