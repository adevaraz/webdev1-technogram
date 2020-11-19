<template>
  <v-container>
    <v-row>
      <v-col class="pa-0" cols="4">
        <div class="img-container" :style="backgroundImg"></div>
      </v-col>
      <v-col class="pa-0" cols="6" offset="1" align-self="center">
        <v-row class="justify-center">
          <v-col cols="11" class="pa-0 ma-0">
            <h2 class="playfair-font news-title">Bill Gates dan Corona</h2>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0">
            <h4 class="work-sans news-writer">by Adam Smith</h4>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0" v-if="!showTime">
            <h4 class="work-sans news-time">Friday, 09/10/2020 15:49</h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    showTime: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      img:
        "https://cdn.idntimes.com/content-images/community/2020/09/118663959-182348943336222-2440784317563878445-n-d7c2d0196898a32b168f34569c076fa6.jpg",
    };
  },
  computed: {
    backgroundImg() {
      return `background-image: url('${this.img}')`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
.playfair-font {
  font-family: "Playfair Display", serif;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.img-container {
  width: 100%;
  height: 0;
  background: #eeeeee;
  background-size: cover;
  background-position: center;
  padding-top: 100%;
}

.news-title {
  font-size: 1rem;
  font-weight: 600;
}

.news-writer {
  font-weight: 400;
  font-size: 0.8rem;
}

.news-time {
  font-weight: 400;
  font-size: 0.7rem;
}
</style>