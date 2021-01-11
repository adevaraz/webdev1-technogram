<template>
 <v-container>
        <div @click="onBeritaSelected(source.id_berita)" class="pa-1">

            <left-image-preview-berita
              class="item"
              v-if="!isMobile"
              :berita="source"
            ></left-image-preview-berita>
            <right-image-preview-berita
              class="item"
              v-else
              :berita="source"
            ></right-image-preview-berita>
        </div>
          
        <!-- </v-row> -->
     
 </v-container>  
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
    },
  }

}
</script>

<style>

</style>