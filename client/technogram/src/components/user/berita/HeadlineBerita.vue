<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12" class="cols-container img-container" :style="backgroundImg">
      </v-col>
      <v-col cols="12" class="cols-container">
        <h2 class="playfair-font news-tittle">Luluh lantahnya kenyataan the abraharm lincoln</h2>
      </v-col>
      <v-col cols="12">
        <v-row class="align-center"  align-self="end">
          <v-col cols="6" class="cols-container">
            <p class="worksans-font news-writer">by Adam Smith</p>
          </v-col>
          <v-col cols="6" class="cols-container pt-1">
            <p class="worksans-font news-time text-end">Friday, 09/10/2020 15:49</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      img:
        "https://6.viki.io/image/6927caca84014bc0a81315585a9a1ac0.jpeg?s=900x600&e=t",
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
  background: #eeeeee;
  background-size: cover;
  background-position: center;
  height: 18rem;
  width: 100%;
}


.cols-container {
  padding: 0;
}

.news-tittle {
  font-weight: 600;
}

.news-writer {
  font-weight: 500;
}

.news-time {
  font-size: 0.8rem;
  font-weight: 400;
}

@media screen and (max-width: 400px){
  .img-container{
    height: 12rem;
  }
}

@media screen and (min-width: 800px) and (max-width: 1264px){
  .img-container{
    height: 26rem;
  }
}
</style>