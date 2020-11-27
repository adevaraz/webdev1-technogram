<template>
  <v-container fluid>
    <v-row class="center-container mt-n5">
        <v-col class="pa-0" cols="4" align-self="center">
            <v-row class="justify-center" >
                <v-col cols="5" >
                    <div class="img-container" :style="backgroundImg"></div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="5" class="pa-0 ma-0 mr-4">
                    <v-row class="justify-center right-col" align="center">
                    <v-col cols="3" class="pa-0 ma-0">
                        <div class="like-container">
                        <v-col cols="1" class="pa-0 ma-0 mr-2">
                            <img src="../../../assets/icons/heart-filled.png" />
                        </v-col>
                        <v-col cols="2" class="pa-0 ma-0">
                            <h3 class="work-sans news-likes text-start">{{berita.jumlah_likes}}</h3>
                        </v-col>
                        </div>
                    </v-col>
                    <v-col  cols="6" class="pa-0 ma-0">
                        <h3 class="work-sans news-date text-end">{{date || ''}}</h3>
                    </v-col>
                    </v-row>
                </v-col>
            </v-row>
      </v-col>

      <v-col class="pa-0" cols="8" align-self="center">
        <v-row class="justify">
          <v-col cols="9" class="pa-0 ma-0">
            <h1 class="playfair-font news-title">
              {{berita.judul || ''}}
            </h1>
          </v-col>
          <v-col cols="9" class="pa-0 ma-0 mt-2">
            <h3 class="work-sans news-preview" >
              {{preview}}...
            </h3>
          </v-col>
          <v-col cols="9" class=" ma-0 mt-2">
            <v-row class="justify">
              <v-col cols="4" class="pa-0 ma-0">
                <h3 class="work-sans news-writer text-start">by {{berita.jurnalis || ''}}</h3>
              </v-col>
              <v-col cols="8" class="pa-0 mx-auto">
                <h3 class="work-sans news-category">| {{berita.kategori_berita || ''}}</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <div class="middle-border"></div>
    </v-row>
    
  </v-container>
</template>

<script>
const PRIVIEW_MAX_WORDS = 70
export default {
  props : {
    berita : {
      type : Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    backgroundImg() {
      return `background-image: url('${this.berita.url_gambar}')`;
    },
    date(){
      //Format : 'Friday, 09/10/2020 15:49'
      const fullDate = new Date(this.berita.waktu_publikasi);
      const month = fullDate.toString().split(' ')[1];
      const date = fullDate.getDate();
      const year = fullDate.getFullYear();
      return `${month} ${date} ${year}`;
    },
    preview(){
      console.log('woy ini nih');
      const firstSentences = this.berita.artikel.toString().split('>')[2];
      let preview = firstSentences;
      if(firstSentences.length > PRIVIEW_MAX_WORDS){
        preview = firstSentences.slice(0 , PRIVIEW_MAX_WORDS);
      }
      return preview.split('<')[0];
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
.middle-border {
  background: rgb(112, 112, 112, 0.3);
  width: 50%;
  height: 2px;
  margin-left: 350px;
}
.worksans-font {
  font-family: "Work Sans", sans-serif;
}
.center-container{
    margin-left: 130px;
}
.img-container {
  width: 200px;
  background: #EEEEEE;
  background-size: cover;
  background-position: center;
  padding-top: 100%;
  margin-left: 20px;
  
}

.news-title {
  font-size: 22px;
  font-weight: 600;
}

.news-preview {
  font-weight: 400;
  font-size: 14px;
  color: #898788;
}

.news-writer {
  font-weight: 400;
  font-size: 12px;
}

.news-time {
  font-weight: 400;
  font-size: 1rem;
}

.news-category {
  font-weight: 400;
  font-size: 12px;
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
    margin-left: 30px;
}

.news-likes{
   font-weight: 400;
  font-size: 0.8rem;
  color: #e52b38;
   
}

.news-date{
   font-weight: 400;
  font-size: 0.8rem;
  color: #898788;
     
}

.left-container{
    border-bottom: 0.5px solid #bab4b8b9;
}
</style>