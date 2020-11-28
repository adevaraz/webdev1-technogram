<template>
  <v-container>
    <v-row>
      <v-col class="pa-0" cols="4">
        <div class="img-container" :style="backgroundImg"></div>
      </v-col>
      <v-col class="pa-0" cols="6" offset="1" align-self="center">
        <v-row class="justify-center">
          <v-col cols="11" class="pa-0 ma-0">
            <h2 class="playfair-font news-title">{{berita.judul || ''}}</h2>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0">
            <h4 class="work-sans news-writer">by {{berita.jurnalis || ''}}</h4>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0" v-if="!showTime">
            <h4 class="work-sans news-time">{{date}}</h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const TIME_MODE_RECENT = 'TIME_MODE_RECENT';
const TIME_MODE_DETAIL = 'TIME_MODE_DETAIL';

const processDate = (fulldate , timeMode) => { 
      if(timeMode === TIME_MODE_RECENT){
        return  getTimeDifference(fulldate);
      }
      return getDateDetail(fulldate);
}


// Return 10 minutes ago , 59 minutes ago , 1 hours ago
const getTimeDifference = fullDate => {
  const oldDate = fullDate;
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate - oldDate);
  const secondDifference = Math.floor((timeDifference/1000));
  let timeType = '';
  let timeNumber = '';
  switch(true){
      // If time difference under one minutes
      case secondDifference < 60 :
        timeType  = 'seconds';
        timeNumber = secondDifference;
      break;
      // If time difference under 1 hours 
      case secondDifference < (60 * 60) :
        timeType = 'minutes';
        timeNumber = Math.floor(secondDifference / 60);
      break;
      // if time difference under 1 day
      case secondDifference < (60 * 60 * 24) : 
        timeType = 'hours';
        timeNumber = Math.floor(secondDifference / (60 * 60)) ;      
      break;
      
      case secondDifference < (60 * 60 * 24 * 7) :
        timeType = 'days';
        timeNumber = Math.floor(secondDifference / (60 * 60 * 24));
      break; 
      case secondDifference < (60 * 60 * 24 * 7 * 30) :
        timeType = 'weeks';
        timeNumber = Math.floor(secondDifference / (60 * 60 * 24 * 7));
      break; 
      default :
        timeType = 'months';
        timeNumber = Math.floor(secondDifference / (60 * 60 * 24 * 7 * 30));
      break;
  }
  console.log(timeNumber);
  const finalString = `${timeNumber} ${timeType} ago`
  return finalString;
}

//return detail time with Format : 'Friday, 09/10/2020 15:49'
const getDateDetail = fullDate => {
      const day = fullDate.toString().split(" ")[0];
      const date = fullDate.toLocaleDateString();
      const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return `${day} ${date} ${time}`;
}

export default {
  props: {
    showTime: {
      type: Boolean,
      default: false,
    },
    berita: {
      type: Object,
      default(){
        return TIME_MODE_DETAIL
      }
    },
    timeMode : {
      type : String , 
      default : ''
    }
  },

  computed: {
    backgroundImg() {
      return `background-image: url('${this.berita.url_gambar}')`;
    },
    date() {
      return processDate(new Date(this.berita.waktu_publikasi), this.timeMode)
    },
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