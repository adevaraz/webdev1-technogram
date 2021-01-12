<template>
  <div>
    <v-col cols="12">
      <h1
        class= "playfair-font text-start"
      >
        Berita Populer
      </h1>
    </v-col>
    <v-col
      @click="onBeritaSelected(headlineBerita.id_berita)"
      cols="12"
      lg="5"
      md="12"
      xl="5"
      sm="12"
      xs="12"
    >
      <headline-berita
        class="item"
        :berita="headlineBerita"
        :isLoading="popularLoading"
      ></headline-berita>
    </v-col>
    <v-col cols="12" class="mt-n6">
      <div class="middle-border"></div>
    </v-col>
    <v-col   cols="12" lg="6" offset-lg="1" md="12" xl="6" offset-xl="1" sm="12">
      <v-row class="popular-container ">
        <v-progress-circular
          class="progressbar"
          v-if="popularLoading"
          color="#E52B38"
          height="10"
          indeterminate
        ></v-progress-circular>
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="6"
          v-for="berita in beritas"
          :key="berita.id_berita"
          @click="onBeritaSelected(berita.id_berita)"
          class="pt-0"
        >
          <small-berita
            class="item"
            :showTime="true"
            :berita="berita"
          ></small-berita>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
const HeadlineBerita = () => import("../berita/HeadlineBerita.vue");
const SmallBerita = () => import("../berita/SmallBerita.vue");
export default {
    components :{
        HeadlineBerita,
        SmallBerita
    },
    props : {
        beritas : {
            type : Array[Object],
            required : true
        },
        headlineBerita : {
            type : Object,
            required : true
        },
        onBeritaSelected : {
            type : Function,
            required : false ,
            default : () => {}
        },
        recentLoading : {
            type : Boolean,
            default : false
        },
        popularLoading : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style scoped>
.popular-container{
  position: relative;
}
.progressbar{
  position: absolute;
  left: 50%;
  transform: translate(-50% , -50%);
}
</style>