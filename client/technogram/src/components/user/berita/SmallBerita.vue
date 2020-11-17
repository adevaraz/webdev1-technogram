<template>
  <v-container>
    <v-row>
      <v-col class="pa-0" cols="4" >
        <div class="img-container">
          <img
            src="https://akcdn.detik.net.id/visual/2019/10/01/f48a29f7-0148-4f67-9cd4-0de9431b66fe_169.jpeg?w=650"
            alt="header_img"
          />
        </div>
      </v-col>
      <v-col class="pa-0" cols="7" offset="1">
        <v-row>
          <v-col cols="11" class="pa-0 ma-0"><h2 class="text-subtitle-1 playfair-font new-tittle">Bill Gates dan Corona</h2></v-col>
          <v-col cols="11" class="pa-0 ma-0"><p class="text-caption playfair-font ma-0 pa-0">by Writer</p></v-col>
          <v-col cols="11" class="pa-0 ma-0" v-if="!isMobile"><p class="text-caption playfair-font ma-0 pa-0">Friday, 09/10/2020 15:49</p></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    computed : {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.img-container img {
  width: 100%;
  height: auto;
}
</style>