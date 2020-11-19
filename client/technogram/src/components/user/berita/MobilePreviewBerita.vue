<template>
  <v-container fluid>
    <v-row class="left-container mt-n5">
      <v-col class="pa-0" cols="8" align-self="center">
        <v-row class="justify-center">
          <v-col cols="11" class="pa-0 ma-0">
            <h2 class="playfair-font news-title">
              Daily Crunch: Waymo opens up
              driverless ride-hailing
            </h2>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0 mt-4">
            <h4 class="work-sans news-preview">
              Alphabet's self-driving technology company hits a
              major milestone, Apple TV+ extends its free...
            </h4>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0 mt-4">
            <v-row class="justify-center">
              <v-col cols="5" class="pa-0 ma-0">
                <h4 class="work-sans news-writer text-start">by Adam Smith</h4>
              </v-col>
              <v-col cols="6" class="pa-0 ma-0">
                <h4 class="work-sans news-category">| by Adam Smith</h4>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pa-2" cols="4">
        <v-row>
          <v-col cols="12" >
            <div class="img-container" :style="backgroundImg"></div>
          </v-col>
          <v-col cols="12" class="pa-0 ma-0 mr-2">
            <v-row class="justify-center right-col" align="center">
              <v-col cols="3" class="pa-0 ma-0">
                <div class="like-container">
                  <v-col cols="1" class="pa-0 ma-0">
                    <img src="../../../assets/icons/heart-filled.png" />
                  </v-col>
                  <v-col cols="2" class="pa-0 ma-0">
                    <h4 class="work-sans news-likes text-start">21</h4>
                  </v-col>
                </div>
              </v-col>
              <v-col  cols="6" class="pa-0 ma-0">
                <h4 class="work-sans news-date text-end">September 30</h4>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            img : 'https://cdn.idntimes.com/content-images/community/2020/09/118663959-182348943336222-2440784317563878445-n-d7c2d0196898a32b168f34569c076fa6.jpg'
        }
    },
    computed:{
        backgroundImg(){
            return `background-image: url('${this.img}')`
        }
    } 
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
  background: #EEEEEE;
  background-size: cover;
  background-position: center;
  padding-top: 100%;
}

.news-title {
  font-size: 1rem;
  font-weight: 600;
}

.news-preview {
  font-weight: 400;
  font-size: 0.8rem;
  color: #898788;
}

.news-writer {
  font-weight: 400;
  font-size: 0.8rem;
}

.news-time {
  font-weight: 400;
  font-size: 0.7rem;
}

.news-category {
  font-weight: 400;
  font-size: 0.7rem;
  color: #e52b38;
}

.right-col img {
  width: 10px;
  height: 10px;
}

.like-container{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.news-likes{
   font-weight: 400;
  font-size: 0.6rem;
  color: #e52b38;   
}

.news-date{
   font-weight: 400;
  font-size: 0.6rem;
  color: #898788;   
}

.left-container{
    border-bottom: 0.5px solid #bab4b8b9;
}
</style>