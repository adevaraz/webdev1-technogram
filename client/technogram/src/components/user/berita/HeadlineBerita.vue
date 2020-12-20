<template>
  <v-container @mouseover="onHover" @mouseleave="onLeave">
    <v-row align="start">
      <div v-if="berita !== null" style="width:100%">
        <v-col cols="12" class="pa-0 img-container" :style="'height:'+imageHeight"  >
          <lazy-image
            :shouldZoom="isOnHover"
            :src="berita.url_gambar"
            :isLoading="isLoading"
            :zoomEffect="true"
          ></lazy-image>
        </v-col>
        <v-col cols="12" class="cols-container mt-5">
          <h2 class="playfair-font news-tittle clickable-text text-uppercase" :class="onHoverClass + ' ' + titleOrientation">{{ berita.judul || "" }}</h2>
        </v-col>
        <v-col cols="12">
          <v-row class="align-center" align-self="end">
            <v-col cols="6" class="cols-container">
              <p class="worksans-font news-writer clickable-text" :class="onHoverClass">
                by {{ berita.jurnalis || "" }}
              </p>
            </v-col>
            <v-col cols="6" class="cols-container pt-1">
              <p class="worksans-font news-time text-end clickable-text" :class="onHoverClass">{{ date || "" }}</p>
            </v-col>
          </v-row>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
const LazyImage = () => import("../ui/LazyImage.vue");
export default {
  components: {
    LazyImage,
  },
  data(){
    return {
      isOnHover : false
    }
  },
  methods : {
    onHover(){
       this.isOnHover = true;
    },
    onLeave(){
        this.isOnHover = false;

    }
  },
  props: {
    isLeftOrientation : {
      type : Boolean,
      default : true
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
    imageHeight : {
      type : String,
      default() {
        return "18rem"
      }
    }
  },
  computed: {
    onHoverClass(){
      if(this.isOnHover){
        return 'hover';
      }
      return '';
    },
    onImageHoverClass(){
      if(this.isOnHover){
        return 'hover-image';
      }
      return '';
    },
    titleOrientation(){
      if(this.isLeftOrientation){
        return 'text-left';
      }
      return 'text-right';
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

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.img-container {
  width: 100%;
  position: relative;
}

.progressbar {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}

.cols-container {
  padding: 0;
}

.news-tittle {
  font-size: 1.2rem;
  font-weight: 900;
}

.news-writer {
  font-weight: 500;
}

.news-time {
  font-size: 0.8rem;
  font-weight: 400;
  
}

@media screen and (max-width: 400px) {
  .img-container {
    height: 12rem;
  }
}

@media screen and (min-width: 800px) and (max-width: 1264px) {
  .img-container {
    height: 26rem;
  }
}

.clickable-text{
  cursor: pointer;
}

.hover{
  color :  rgb(229, 43, 56 , 0.9);
}


.clickable-text:hover ,
.clickable-text:focus {
  color : rgb(229, 43, 56 , 0.9);
}

.clickable-toogle{
  color :rgb(229, 43, 56 , 0.9);
}
</style>
